import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { verifyToken } from '~/lib/auth'
import { sendEmail } from '~/lib/email'

const messageSchema = z.object({
  userId: z.string(),
  subject: z.string().min(1),
  content: z.string().min(1)
})

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'auth-token')
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authenticated'
      })
    }
    
    const payload = verifyToken(token)
    if (!payload || payload.type !== 'admin') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }
    
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid form data' })
    }

    const fields: Record<string, string> = {}
    const files: Array<{ filename: string; data: Buffer; type?: string }> = []

    for (const part of formData) {
      if (part.type === 'file' && part.filename && part.data) {
        files.push({ filename: part.filename, data: part.data as Buffer, type: part.type })
      } else if (part.name && typeof part.data === 'string') {
        fields[part.name] = part.data
      }
    }

    const { userId, subject, content } = messageSchema.parse({
      userId: fields.userId,
      subject: fields.subject,
      content: fields.content
    })
    
    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }
    
    // Create message record
    const message = await prisma.message.create({
      data: {
        userId,
        adminId: payload.id,
        subject,
        content
      }
    })
    
    // Persist attachments to public storage for user download
    let savedAttachments: Array<{ filename: string; path: string; size?: number; mimeType?: string }> = []
    if (files.length) {
      const { join } = await import('path')
      const fs = await import('fs/promises')
      const baseDir = join(process.cwd(), 'public', 'uploads', 'messages', message.id)
      await fs.mkdir(baseDir, { recursive: true })
      const toDb: Array<{ filename: string; mimeType?: string; size?: number; path: string; messageId: string }> = []
      for (const f of files) {
        const safeName = `${Date.now()}-${(f.filename || 'file').replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const absPath = join(baseDir, safeName)
        await fs.writeFile(absPath, f.data)
        const relPath = `/uploads/messages/${message.id}/${safeName}`
        toDb.push({ filename: safeName, mimeType: f.type, size: (f.data as Buffer).length, path: relPath, messageId: message.id })
        savedAttachments.push({ filename: safeName, path: relPath, size: (f.data as Buffer).length, mimeType: f.type })
      }
      if (toDb.length) {
        await prisma.messageAttachment.createMany({ data: toDb })
      }
    }

    // Send email to user
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Message from Partnergize</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${user.name},</h2>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
              ${content.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div class="footer">
            <p>Partnergize - Connecting motivated professionals with real remote work opportunities.</p>
          </div>
        </div>
      </body>
      </html>
    `
    
    await sendEmail(
      user.email,
      subject,
      emailHtml,
      files.length
        ? files.map(f => ({ filename: f.filename, content: f.data, contentType: f.type }))
        : undefined
    )
    
    return {
      success: true,
      message: 'Message sent successfully',
      attachments: savedAttachments
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid input data'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message'
    })
  }
})

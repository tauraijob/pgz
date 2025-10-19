import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { verifyToken } from '~/lib/auth'
import { sendEmail, generateVerificationNotificationEmail } from '~/lib/email'

// Using multipart form data; keep a light schema for non-file fields
const verifySchema = z.object({
  markApproval: z.union([z.string(), z.boolean()]).optional()
})

export default defineEventHandler(async (event) => {
  try {
    let token = getCookie(event, 'auth-token')
    if (!token) {
      const auth = getHeader(event, 'authorization') || ''
      if (auth.toLowerCase().startsWith('bearer ')) {
        token = auth.slice(7)
      }
    }
    if (!token) {
      throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
    }
    
    const payload = verifyToken(token)
    if (!payload || payload.type !== 'user') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }
    
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid form data' })
    }

    let screenshot: { filename: string; data: Buffer; type?: string } | null = null
    const files: Array<{ name?: string; filename: string; data: Buffer; type?: string }> = []
    const fields: Record<string, string> = {}
    for (const part of formData) {
      if (part.filename && part.data) {
        const filePart = { name: part.name, filename: part.filename, data: part.data as Buffer, type: part.type }
        files.push(filePart)
        if (part.name === 'screenshot') screenshot = { filename: part.filename, data: part.data as Buffer, type: part.type }
      } else if (part.name && typeof part.data === 'string') {
        fields[part.name] = part.data
      }
    }
    if (!screenshot && files.length) {
      const first = files[0]
      screenshot = { filename: first.filename, data: first.data, type: first.type }
    }

    const parsed = verifySchema.parse({ markApproval: fields.markApproval })
    const markApproval = typeof parsed.markApproval === 'string' ? parsed.markApproval === 'true' : !!parsed.markApproval

    if (!screenshot) {
      throw createError({ statusCode: 400, statusMessage: 'Screenshot is required' })
    }
    
    // Persist screenshot to public storage and update user
    const { join } = await import('path')
    const fs = await import('fs/promises')
    const dir = join(process.cwd(), 'public', 'uploads', 'verification', payload.id)
    await fs.mkdir(dir, { recursive: true })
    const safeName = `${Date.now()}-${screenshot.filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const absPath = join(dir, safeName)
    await fs.writeFile(absPath, screenshot.data)
    const relPath = `/uploads/verification/${payload.id}/${safeName}`

    // Update user verification status
    const user = await prisma.user.update({
      where: { id: payload.id },
      data: {
        ariseVerified: true,
        verificationImage: relPath,
        verifiedAt: new Date()
      }
    })
    
    const config = useRuntimeConfig()
    
    // Always notify admin of verification (prefer admin record; fallback to config)
    const adminNotify = await prisma.admin.findFirst()
    const adminEmailNotify = adminNotify?.email && adminNotify.email.includes('@')
      ? adminNotify.email
      : (config.emailUser && String(config.emailUser).includes('@') ? String(config.emailUser) : '')
    if (adminEmailNotify) {
      await sendEmail(
        adminEmailNotify,
        'New User Verification - Partnergize',
        generateVerificationNotificationEmail(user.name, adminEmailNotify)
      )
    }

    // Send Next Steps to user and record message (always)
      const baseDir = join(process.cwd(), 'public', 'docs', 'next-steps')
      let fileEntries: Array<{ filename: string; absPath: string; relPath: string; size?: number; mimeType?: string; buf?: Buffer }> = []
      try {
        const files = await fs.readdir(baseDir)
        for (const name of files) {
          const abs = join(baseDir, name)
          try {
            const stat = await fs.stat(abs)
            if (!stat.isFile()) continue
            const rel = `/docs/next-steps/${name}`
            const buf = await fs.readFile(abs)
            fileEntries.push({ filename: name, absPath: abs, relPath: rel, size: stat.size, buf })
          } catch {}
        }
      } catch {}

      // Build user email content with links
      const linksHtml = fileEntries.length
        ? `<ul>${fileEntries.map(f => `<li><a href="${f.relPath}">${f.filename}</a></li>`).join('')}</ul>`
        : '<p>No documents attached.</p>'
      const userHtml = `
        <!DOCTYPE html>
        <html><head><meta charset="utf-8"><title>Next Steps</title></head>
        <body style="font-family:Arial, sans-serif; color:#0f172a;">
          <h2>Next Steps - Partnergize</h2>
          <p>Hello ${user.name},</p>
          <p>Congratulations! Your Arise.com verification has been received and marked for approval.</p>
          <p>Please review the attached documents and the links below for your next steps:</p>
          ${linksHtml}
          <p>If you have any questions, reply to this email.</p>
        </body></html>
      `

      // Email user with attachments (buffer-based)
      // Also BCC admin so you can verify deliveries in Mailtrap
      await sendEmail(
        user.email,
        'Partnergize - Your Next Steps',
        userHtml,
        fileEntries.length ? fileEntries.map(f => ({ filename: f.filename, content: f.buf! })) : undefined,
        adminEmailNotify
      )

      // Create message + attachments records for user inbox
      const admin = adminNotify ?? null
      if (admin) {
        const msg = await prisma.message.create({
          data: {
            userId: user.id,
            adminId: admin.id,
            subject: 'Your Next Steps',
            content: `Your verification has been approved. Access documents here:\n${fileEntries.map(f => f.relPath).join('\n')}`
          }
        })
        if (fileEntries.length) {
          await prisma.messageAttachment.createMany({
            data: fileEntries.map(f => ({
              messageId: msg.id,
              filename: f.filename,
              path: f.relPath,
              size: f.size,
              mimeType: f.mimeType
            }))
          })
        }
      }
    
    return {
      success: true,
      message: 'Verification submitted successfully'
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid input data' })
    }
    if (error?.statusCode) {
      throw error
    }
    throw createError({ statusCode: 500, statusMessage: 'Verification failed' })
  }
})

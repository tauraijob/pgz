import nodemailer from 'nodemailer'

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  attachments?: Array<{ filename: string; content: Buffer; contentType?: string }>,
  bcc?: string
) {
  const config = useRuntimeConfig()
  
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: false,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  })

  const mailOptions = {
    from: `Partnergize <no-reply@partnergize.test>`,
    to,
    subject,
    html,
    attachments,
    bcc,
  }

  const maxRetries = 3
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await transporter.sendMail(mailOptions)
      return true
    } catch (error: any) {
      const message = String(error?.message || '')
      // Mailtrap sandbox rate limit
      if (/Too many emails per second/i.test(message) && attempt < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, 1250))
        continue
      }
      console.error('Email sending failed:', error)
      return false
    }
  }
  return false
}

export function generateRegistrationEmail(name: string, ariseLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Partnergize</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .steps { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #3b82f6; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Partnergize!</h1>
          <p>You are one step closer to earning extra money!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name},</h2>
          
          <p><strong>TO BE CONSIDERED FOR THE WORK FROM HOME JOBS AVAILABLE YOU MUST REGISTER AND ACTIVATE YOUR JOB PORTAL.</strong></p>
          
          <p>IT TAKES ABOUT 15 MINUTES AND IT MUST BE COMPLETED. ONCE COMPLETED PLEASE RESPOND TO THIS EMAIL TO GET APPROVED</p>
          
          <div class="steps">
            <h3>Registration Steps:</h3>
            <ol>
              <li>Go to <a href="${ariseLink}">ariseworkfromhome.com</a></li>
              <li>Click Register Now</li>
              <li>Enter Your Email - Create Username and Password</li>
              <li>Input Your State - Input Name / Birthday and Languages</li>
              <li>Enter Referral Code: <strong>6525094</strong></li>
              <li>Input Your Address and Phone Number</li>
              <li>Input validation code - Code May Take up to 10min</li>
              <li>Click Finish Registering</li>
              <li>Click I want to WORK FOR SOMEONE ELSE</li>
              <li>CLICK JOIN A SERVICE PARTNER</li>
              <li>ENTER SOCIAL SECURITY NUMBER</li>
              <li>ENTER SERVICE PARTNER ID <strong>1220816</strong> - PRESS SEARCH</li>
              <li>YOU WILL SEE Partnergize Group dba PGZ Virtual</li>
              <li>Connect PRESS CONTINUE</li>
            </ol>
          </div>
          
          <p><strong>READY TO BE APPROVED? RESPOND TO THIS EMAIL.</strong></p>
          
          <p>THIS MUST BE COMPLETED IN ORDER TO BE ELIGIBLE FOR JOBS. IF YOU HAVE QUESTIONS YOU CAN RESPOND TO THIS EMAIL</p>
          
          <a href="${ariseLink}" class="button">Start Registration Now</a>
        </div>
        
        <div class="footer">
          <p>Partnergize - Connecting motivated professionals with real remote work opportunities.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateVerificationNotificationEmail(userName: string, adminEmail: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>User Verification Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New User Verification</h1>
        </div>
        
        <div class="content">
          <h2>Hello Admin,</h2>
          
          <p>A user has completed their Arise.com verification and is ready for the next steps.</p>
          
          <p><strong>User Details:</strong></p>
          <ul>
            <li>Name: ${userName}</li>
            <li>Verification Status: Completed</li>
            <li>Timestamp: ${new Date().toLocaleString()}</li>
          </ul>
          
          <p>Please log into your admin dashboard to review their verification and send them the next steps.</p>
          
          <a href="/admin/dashboard" class="button">Go to Admin Dashboard</a>
        </div>
        
        <div class="footer">
          <p>Partnergize Admin System</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Generic wrapper templates
export function wrapEmail(title: string, contentHtml: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f8fafc; color: #0f172a; }
          .container { max-width: 640px; margin: 24px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
          .header { background: #0f172a; color: #ffffff; padding: 16px 24px; font-weight: bold; }
          .content { padding: 24px; }
          .footer { padding: 16px 24px; color: #64748b; font-size: 12px; }
          a { color: #1d4ed8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Partnergize</div>
          <div class="content">
            ${contentHtml}
          </div>
          <div class="footer">This email was sent by Partnergize. If you have questions, reply to this email.</div>
        </div>
      </body>
    </html>
  `
}

export function buildNextStepsEmail(name: string, links: string[]): string {
  const list = links.length ? `<ul>${links.map(l => `<li><a href="${l}">${l}</a></li>`).join('')}</ul>` : '<p>No attachments found.</p>'
  return wrapEmail('Your Next Steps', `
    <h2 style="margin:0 0 12px 0;">Hello ${name},</h2>
    <p>Congratulations! Your verification has been received and approved. Please review the documents below for your next steps:</p>
    ${list}
    <p>If you need assistance, simply reply to this email.</p>
  `)
}

export function buildAdminVerificationNotice(name: string): string {
  return wrapEmail('New User Verification', `
    <p>User <strong>${name}</strong> has completed verification and marked approval.</p>
    <p>Next Steps documents have been sent automatically.</p>
  `)
}

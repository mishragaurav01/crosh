import nodemailer from 'nodemailer';
import { logger } from '../logger/index.js';

export class EmailService {
  private static transporter: nodemailer.Transporter | null = null;
  private static isEthereal = false;

  /**
   * Initializes the Nodemailer transporter.
   * If SMTP credentials are provided in environment variables, it uses them (e.g., SendGrid, AWS SES, Gmail).
   * Otherwise, it dynamically generates an Ethereal Mock Inbox for seamless local testing.
   */
  private static async getTransporter(): Promise<nodemailer.Transporter> {
    if (this.transporter) {
      return this.transporter;
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      // Production / Custom SMTP configuration
      this.transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });
      this.isEthereal = false;
      logger.info(
        '📧 [EMAIL_SERVICE] Configured with Production SMTP Provider.',
      );
    } else {
      // Dynamic Development Ethereal Account
      logger.info(
        '📧 [EMAIL_SERVICE] No SMTP credentials found. Generating Ethereal Test Account...',
      );
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      this.isEthereal = true;
      logger.info(
        '📧 [EMAIL_SERVICE] Generated Ethereal Test Email Account successfully.',
      );
    }

    return this.transporter;
  }

  /**
   * Dispatches a real password reset email.
   * Prints the Preview URL if using the local Ethereal mock inbox.
   */
  static async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    try {
      const transporter = await this.getTransporter();

      const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

      const mailOptions = {
        from: '"Crosh Admin" <noreply@crosh.in>',
        to: email,
        subject: 'Crosh - Reset Your Password',
        text: `Hello!\n\nYou requested a password reset.\nPlease click the secure link below to reset it:\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #000;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>You requested a password reset for your Crosh account. Click the button below to securely set a new password:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 15px 0; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If you did not request this, you can safely ignore this email.</p>
            <hr style="border: none; border-bottom: 1px solid #eaeaea; margin-top: 30px;" />
            <p style="font-size: 12px; color: #888;">&copy; ${new Date().getFullYear()} Crosh. All rights reserved.</p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);

      logger.info(`✅ [EMAIL_SERVICE] Reset email dispatched to ${email}`);

      if (this.isEthereal) {
        logger.info('===================================================');
        logger.info(`✨ ETHEREAL EMAIL DISPATCHER ✨`);
        logger.info(`📬 VIEW YOUR SENT EMAIL HERE:`);
        logger.info(`👉 ${nodemailer.getTestMessageUrl(info)}`);
        logger.info('===================================================');
      }
    } catch (error) {
      logger.error('❌ [EMAIL_SERVICE] Failed to send email.', error);
      throw error;
    }
  }
}

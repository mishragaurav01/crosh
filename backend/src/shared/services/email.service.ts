import { logger } from '../logger/index.js';

/**
 * A mock production-grade Email Sender Service.
 * In a real production deployment, this would be wired to Amazon SES, SendGrid, Resend, or Nodemailer.
 */
export class EmailService {
  /**
   * Simulates sending a password reset email securely.
   */
  static async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    // In production, we'd fire off an email templating engine here.
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    logger.info('===================================================');
    logger.info(`📧 [MOCK EMAIL DISPATCHER]`);
    logger.info(`To: ${email}`);
    logger.info(`Subject: Password Reset Request`);
    logger.info(`Body: Hello! You requested a password reset.`);
    logger.info(`      Please click the secure link below to reset it:`);
    logger.info(`      ${resetUrl}`);
    logger.info('===================================================');
  }
}

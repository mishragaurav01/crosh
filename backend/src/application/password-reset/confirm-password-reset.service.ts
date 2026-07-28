import { UserRepository } from '../../app/repositories/user.repository.js';
import { PasswordResetRepository } from '../../app/repositories/password-reset.repository.js';
import { SessionRepository } from '../../app/repositories/session.repository.js';
import { PasswordUtility, JwtUtility } from '../../domain/auth/index.js';
import { ValidationError } from '../../shared/errors/index.js';

export interface ConfirmPasswordResetCommand {
  rawToken: string;
  newPassword: string;
}

export class ConfirmPasswordResetService {
  private userRepository = new UserRepository();
  private passwordResetRepository = new PasswordResetRepository();
  private sessionRepository = new SessionRepository();

  async confirmPasswordReset(
    command: ConfirmPasswordResetCommand,
  ): Promise<void> {
    const tokenHash = JwtUtility.hashToken(command.rawToken);
    const resetRecord =
      await this.passwordResetRepository.findByTokenHash(tokenHash);

    if (
      !resetRecord ||
      resetRecord.consumedAt ||
      resetRecord.expiresAt < new Date()
    ) {
      throw new ValidationError('Invalid or expired reset token');
    }

    const hashedNewPassword = await PasswordUtility.hash(command.newPassword);

    await this.userRepository.update(resetRecord.user.toString(), {
      password: hashedNewPassword,
    });

    await this.passwordResetRepository.markConsumed(resetRecord._id.toString());

    await this.sessionRepository.revokeAll(resetRecord.user.toString());
  }
}

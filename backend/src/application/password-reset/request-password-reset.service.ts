import { UserRepository } from '../../app/repositories/user.repository.js';
import { PasswordResetRepository } from '../../app/repositories/password-reset.repository.js';
import { JwtUtility } from '../../domain/auth/index.js';
import type { PasswordReset } from '../../domain/password-reset/index.js';
import { Types } from 'mongoose';

export class RequestPasswordResetService {
  private userRepository = new UserRepository();
  private passwordResetRepository = new PasswordResetRepository();

  async requestPasswordReset(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email.toLowerCase());

    const rawToken = JwtUtility.generatePasswordResetToken();

    if (!user) {
      return rawToken;
    }

    await this.passwordResetRepository.deleteUserRequests(user._id.toString());

    const tokenHash = JwtUtility.hashToken(rawToken);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await this.passwordResetRepository.create({
      user: new Types.ObjectId(user._id.toString()),
      tokenHash,
      expiresAt: expiresAt,
      consumedAt: null,
    } as unknown as PasswordReset);

    return rawToken;
  }
}

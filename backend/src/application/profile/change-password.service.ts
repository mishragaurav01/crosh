import { UserRepository } from '../../app/repositories/user.repository.js';
import { SessionRepository } from '../../app/repositories/session.repository.js';
import { PasswordUtility } from '../../domain/auth/index.js';
import type { ChangePasswordRequest } from './profile.types.js';
import {
  NotFoundError,
  ValidationError,
  AuthenticationError,
} from '../../shared/errors/index.js';

export class ChangePasswordService {
  private userRepository = new UserRepository();
  private sessionRepository = new SessionRepository();

  async changePassword(
    userId: string,
    request: ChangePasswordRequest,
  ): Promise<void> {
    if (!request.currentPassword || !request.newPassword) {
      throw new ValidationError(
        'Current password and new password are required',
      );
    }

    if (request.currentPassword === request.newPassword) {
      throw new ValidationError(
        'New password must differ from current password',
      );
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordValid = await PasswordUtility.compare(
      request.currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid current password');
    }

    const hashedNewPassword = await PasswordUtility.hash(request.newPassword);

    await this.userRepository.changePassword(userId, hashedNewPassword);
    await this.sessionRepository.revokeAll(userId);
  }
}

import { UserRepository } from '../../app/repositories/user.repository.js';
import { ProfileMapper } from './profile.mapper.js';
import type { UpdateProfileRequest } from './profile.types.js';
import type { UserProfileResponse } from '../../domain/profile/index.js';
import { NotFoundError, ValidationError } from '../../shared/errors/index.js';

export class UpdateProfileService {
  private userRepository = new UserRepository();

  async updateProfile(
    userId: string,
    request: UpdateProfileRequest,
  ): Promise<UserProfileResponse> {
    const allowedKeys = ['firstName', 'lastName'];
    const requestKeys = Object.keys(request);

    for (const key of requestKeys) {
      if (!allowedKeys.includes(key)) {
        throw new ValidationError(
          `Field '${key}' is not allowed for profile updates.`,
        );
      }
    }

    if (requestKeys.length === 0) {
      throw new ValidationError('No valid fields provided for update.');
    }

    const updatedUser = await this.userRepository.updateProfile(userId, {
      firstName: request.firstName,
      lastName: request.lastName,
    });

    if (!updatedUser) {
      throw new NotFoundError('User profile not found');
    }

    return ProfileMapper.toResponse(updatedUser);
  }
}

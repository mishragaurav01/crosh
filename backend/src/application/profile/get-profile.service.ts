import { UserRepository } from '../../app/repositories/user.repository.js';
import { ProfileMapper } from './profile.mapper.js';
import type { UserProfileResponse } from '../../domain/profile/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export class GetProfileService {
  private userRepository = new UserRepository();

  async getProfile(userId: string): Promise<UserProfileResponse> {
    const user = await this.userRepository.findProfile(userId);

    if (!user) {
      throw new NotFoundError('User profile not found');
    }

    return ProfileMapper.toResponse(user);
  }
}

import type { UserDocument } from '../../domain/user/index.js';
import type { RoleDocument } from '../../domain/role/index.js';
import type { UserProfileResponse } from '../../domain/profile/index.js';

export class ProfileMapper {
  static toResponse(user: UserDocument): UserProfileResponse {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
      roles: (user.roles as unknown as RoleDocument[]).map(
        (r: RoleDocument) => ({
          id: r._id.toString(),
          name: r.name,
        }),
      ),
      createdAt: user.createdAt as Date,
    };
  }
}

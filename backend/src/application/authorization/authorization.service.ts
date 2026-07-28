import { UserRepository } from '../../app/repositories/user.repository.js';
import type { AuthenticatedUser } from '../../app/middlewares/auth/auth.types.js';

export class AuthorizationService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  hasRole(user: AuthenticatedUser, roleName: string): boolean {
    return user.roles.some((r) => r.name === roleName);
  }

  async hasPermission(
    userId: string,
    permissionName: string,
  ): Promise<boolean> {
    const userDoc =
      await this.userRepository.findUserAuthorizationContext(userId);
    if (!userDoc || userDoc.isActive === false) return false;

    const roles = userDoc.roles as unknown as {
      permissions?: { name: string }[];
    }[];

    for (const role of roles) {
      if (role.permissions) {
        for (const permission of role.permissions) {
          if (permission.name === permissionName) {
            return true;
          }
        }
      }
    }

    return false;
  }
}

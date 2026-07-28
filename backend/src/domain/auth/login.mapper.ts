import type { UserDocument } from '../user/index.js';
import type { RoleDocument } from '../role/index.js';
import type { LoginResponse } from './login.types.js';

export class LoginMapper {
  static toResponse(user: UserDocument, accessToken: string): LoginResponse {
    return {
      accessToken,
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: (user.roles as unknown as RoleDocument[]).map(
          (r: RoleDocument) => ({
            id: r._id.toString(),
            name: r.name,
          }),
        ),
      },
    };
  }
}

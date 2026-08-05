import type { UserDocument } from '../user/index.js';
import type { RegisterResponse } from './register.types.js';
import type { RoleDocument } from '../role/index.js';
import type { Types } from 'mongoose';

export class RegisterMapper {
  static toResponse(user: UserDocument): RegisterResponse {
    return {
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
      createdAt: user.createdAt as Date,
    };
  }
}

import type { UserDocument } from '../user/index.js';
import type { RegisterResponse } from './register.types.js';
import type { Types } from 'mongoose';

export class RegisterMapper {
  static toResponse(user: UserDocument): RegisterResponse {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles.map((r: Types.ObjectId) => r.toString()),
      createdAt: user.createdAt as Date,
    };
  }
}

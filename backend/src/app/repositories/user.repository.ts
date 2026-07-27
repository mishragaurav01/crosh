import { UserModel } from '../../domain/user/index.js';
import type { User, UserDocument } from '../../domain/user/index.js';

export class UserRepository {
  async create(userData: User): Promise<UserDocument> {
    const user = new UserModel(userData);
    return user.save();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email }).exec();
  }

  async update(
    id: string,
    updateData: Partial<User>,
  ): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<UserDocument | null> {
    return UserModel.findByIdAndDelete(id).exec();
  }
}

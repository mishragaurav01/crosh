import { PasswordResetModel } from '../../domain/password-reset/index.js';
import type {
  PasswordReset,
  PasswordResetDocument,
} from '../../domain/password-reset/index.js';

export class PasswordResetRepository {
  async create(data: PasswordReset): Promise<PasswordResetDocument> {
    const document = new PasswordResetModel(data);
    return document.save();
  }

  async findByTokenHash(
    tokenHash: string,
  ): Promise<PasswordResetDocument | null> {
    return PasswordResetModel.findOne({ tokenHash }).exec();
  }

  async markConsumed(id: string): Promise<PasswordResetDocument | null> {
    return PasswordResetModel.findByIdAndUpdate(
      id,
      { consumedAt: new Date() },
      { new: true },
    ).exec();
  }

  async deleteExpired(): Promise<void> {
    await PasswordResetModel.deleteMany({
      expiresAt: { $lte: new Date() },
    }).exec();
  }

  async deleteUserRequests(userId: string): Promise<void> {
    await PasswordResetModel.deleteMany({ user: userId }).exec();
  }
}

import type { PasswordResetDocument } from './password-reset.types.js';

export interface PasswordResetResponse {
  id: string;
  userId: string;
  expiresAt: Date;
  consumedAt: Date | null;
  createdAt: Date;
}

export class PasswordResetMapper {
  static toResponse(doc: PasswordResetDocument): PasswordResetResponse {
    return {
      id: doc._id.toString(),
      userId: doc.user.toString(),
      expiresAt: doc.expiresAt as Date,
      consumedAt: doc.consumedAt ? (doc.consumedAt as Date) : null,
      createdAt: doc.createdAt as Date,
    };
  }
}

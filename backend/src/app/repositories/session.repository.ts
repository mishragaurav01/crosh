import { SessionModel } from '../../domain/session/index.js';
import type { Session, SessionDocument } from '../../domain/session/index.js';

export class SessionRepository {
  async create(sessionData: Session): Promise<SessionDocument> {
    const session = new SessionModel(sessionData);
    return session.save();
  }

  async findByRefreshToken(
    refreshTokenHash: string,
  ): Promise<SessionDocument | null> {
    return SessionModel.findOne({ refreshToken: refreshTokenHash }).exec();
  }

  async findActiveSession(
    refreshTokenHash: string,
  ): Promise<SessionDocument | null> {
    return SessionModel.findOne({
      refreshToken: refreshTokenHash,
      revoked: false,
      expiresAt: { $gt: new Date() },
    }).exec();
  }

  async revoke(sessionId: string): Promise<SessionDocument | null> {
    return SessionModel.findByIdAndUpdate(
      sessionId,
      { revoked: true },
      { new: true },
    ).exec();
  }

  async revokeAll(userId: string): Promise<void> {
    await SessionModel.updateMany(
      { user: userId, revoked: false },
      { $set: { revoked: true } },
    ).exec();
  }

  async deleteExpired(): Promise<void> {
    await SessionModel.deleteMany({ expiresAt: { $lte: new Date() } }).exec();
  }
}

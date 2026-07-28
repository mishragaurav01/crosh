import { SessionRepository } from '../../app/repositories/session.repository.js';
import { JwtUtility } from '../../domain/auth/index.js';
import type { Session } from '../../domain/session/index.js';
import { Types } from 'mongoose';

export interface CreateSessionCommand {
  userId: string;
  device?: string;
  ipAddress?: string;
  userAgent?: string;
}

export class CreateSessionService {
  private sessionRepository = new SessionRepository();

  async createSession(command: CreateSessionCommand): Promise<string> {
    const rawRefreshToken = JwtUtility.generateRefreshToken({
      userId: command.userId,
    });
    const hashedRefreshToken = JwtUtility.hashToken(rawRefreshToken);

    const decoded = JwtUtility.verifyRefreshToken(rawRefreshToken);
    const expiresAt = new Date((decoded.exp as number) * 1000);

    const sessionData = {
      user: new Types.ObjectId(command.userId),
      refreshToken: hashedRefreshToken,
      device: command.device,
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
      expiresAt: expiresAt,
      revoked: false,
    };

    await this.sessionRepository.create(sessionData as unknown as Session);

    return rawRefreshToken;
  }
}

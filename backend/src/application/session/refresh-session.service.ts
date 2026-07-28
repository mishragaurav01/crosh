import { SessionRepository } from '../../app/repositories/session.repository.js';
import { UserRepository } from '../../app/repositories/user.repository.js';
import { JwtUtility } from '../../domain/auth/index.js';
import { AuthenticationError } from '../../shared/errors/index.js';
import type { Session } from '../../domain/session/index.js';
import { Types } from 'mongoose';

export class RefreshSessionService {
  private sessionRepository = new SessionRepository();
  private userRepository = new UserRepository();

  async refreshSession(
    rawRefreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      JwtUtility.verifyRefreshToken(rawRefreshToken);
    } catch {
      throw new AuthenticationError('Invalid or expired refresh token');
    }

    const hashedToken = JwtUtility.hashToken(rawRefreshToken);
    const session =
      await this.sessionRepository.findByRefreshToken(hashedToken);

    if (
      !session ||
      session.revoked ||
      (session.expiresAt && session.expiresAt < new Date())
    ) {
      throw new AuthenticationError('Invalid session state');
    }

    const user = await this.userRepository.findById(session.user.toString());
    if (!user || user.isActive === false) {
      throw new AuthenticationError('User inactive');
    }

    await this.sessionRepository.revoke(session._id.toString());

    const accessToken = JwtUtility.generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const newRawRefreshToken = JwtUtility.generateRefreshToken({
      userId: user._id.toString(),
    });
    const newHashedToken = JwtUtility.hashToken(newRawRefreshToken);
    const decoded = JwtUtility.verifyRefreshToken(newRawRefreshToken);

    await this.sessionRepository.create({
      user: new Types.ObjectId(user._id.toString()),
      refreshToken: newHashedToken,
      device: session.device,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      expiresAt: new Date((decoded.exp as number) * 1000),
      revoked: false,
    } as unknown as Session);

    return { accessToken, refreshToken: newRawRefreshToken };
  }
}

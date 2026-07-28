import { SessionRepository } from '../../app/repositories/session.repository.js';
import { JwtUtility } from '../../domain/auth/index.js';

export class RevokeSessionService {
  private sessionRepository = new SessionRepository();

  async revokeSession(rawRefreshToken: string): Promise<void> {
    try {
      const hashedToken = JwtUtility.hashToken(rawRefreshToken);
      const session =
        await this.sessionRepository.findByRefreshToken(hashedToken);
      if (session && !session.revoked) {
        await this.sessionRepository.revoke(session._id.toString());
      }
    } catch {
      // Fails silently if token is malformed to avoid revealing facts.
    }
  }
}

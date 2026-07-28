import type { JwtPayload } from 'jsonwebtoken';

/**
 * Payload encoded into the JWT for an authenticated user.
 */
export interface AuthJwtPayload extends JwtPayload {
  userId: string;
}

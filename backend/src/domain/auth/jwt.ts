import jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';
import type { AuthJwtPayload } from './auth.types.js';

export class JwtUtility {
  /**
   * Generates a new access token for a given user ID.
   */
  static generateToken(payload: Omit<AuthJwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Verifies an access token and returns its decoded payload.
   * Throws an error if the token is invalid or expired.
   */
  static verifyToken(token: string): AuthJwtPayload {
    return jwt.verify(token, config.jwtSecret) as AuthJwtPayload;
  }
}

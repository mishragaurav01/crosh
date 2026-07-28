import jwt from 'jsonwebtoken';
import crypto from 'crypto';
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

  /**
   * Generates a new refresh token for a given user ID.
   */
  static generateRefreshToken(payload: { userId: string }): string {
    return jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshExpiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Verifies a refresh token and returns its decoded payload.
   * Throws an error if the token is invalid or expired.
   */
  static verifyRefreshToken(
    token: string,
  ): jwt.JwtPayload & { userId: string } {
    return jwt.verify(token, config.jwtRefreshSecret) as jwt.JwtPayload & {
      userId: string;
    };
  }

  /**
   * Hashes a token using SHA-256 for deterministic database lookups.
   */
  static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Generates a cryptographically secure random token for password resets.
   * This is NOT a JWT.
   */
  static generatePasswordResetToken(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }
}

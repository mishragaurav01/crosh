import { describe, it, expect } from 'vitest';
import { JwtUtility } from '../../domain/auth/index.js';

describe('JwtUtility', () => {
  it('should generate an access token', () => {
    const token = JwtUtility.generateToken({
      userId: '123',
      email: 'test@example.com',
    });
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should verify a valid access token', () => {
    const token = JwtUtility.generateToken({
      userId: '456',
      email: 'user@example.com',
    });
    const decoded = JwtUtility.verifyToken(token);

    expect(decoded.userId).toBe('456');
    expect(decoded.email).toBe('user@example.com');
  });

  it('should generate a refresh token', () => {
    const token = JwtUtility.generateRefreshToken({ userId: '789' });
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should verify a valid refresh token', () => {
    const token = JwtUtility.generateRefreshToken({ userId: '789' });
    const decoded = JwtUtility.verifyRefreshToken(token);

    expect(decoded.userId).toBe('789');
  });

  it('should throw error for invalid token verification', () => {
    expect(() => JwtUtility.verifyToken('invalid.token.here')).toThrow();
  });

  it('should generate a password reset token (not JWT)', () => {
    const token = JwtUtility.generatePasswordResetToken();
    expect(token).toBeDefined();
    expect(token.length).toBe(64); // 32 bytes hex = 64 chars
  });
});

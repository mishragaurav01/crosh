import type { CookieOptions } from 'express';
import { config } from '../../config/index.js';

const isProduction = config.nodeEnv === 'production';

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction, // HTTPS only in production
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000, // 15 minutes (matches standard JWT expiry)
  path: '/',
};

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches refresh token expiry)
  path: '/api/v1/auth', // Only send refresh token to auth routes
};

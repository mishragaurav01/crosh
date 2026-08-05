import type { Request, Response, NextFunction } from 'express';
import { RegisterService } from '../../../../application/auth/register.service.js';
import { LoginService } from '../../../../application/auth/login.service.js';
import { CreateSessionService } from '../../../../application/session/create-session.service.js';
import { RefreshSessionService } from '../../../../application/session/refresh-session.service.js';
import { RevokeSessionService } from '../../../../application/session/revoke-session.service.js';
import { RequestPasswordResetService } from '../../../../application/password-reset/request-password-reset.service.js';
import { JwtUtility } from '../../../../domain/auth/index.js';
import { ConfirmPasswordResetService } from '../../../../application/password-reset/confirm-password-reset.service.js';
import { ChangePasswordService } from '../../../../application/profile/change-password.service.js';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '../../../../shared/config/cookies.js';

export class AuthController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const registerService = new RegisterService();
      const createSessionService = new CreateSessionService();

      const userResponse = await registerService.register(req.body);

      // Create session upon successful registration
      const refreshToken = await createSessionService.createSession({
        userId: userResponse.id,
        device: req.headers['user-agent'],
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      // Generate access token immediately for seamless login following registration
      const accessToken = JwtUtility.generateToken({
        userId: userResponse.id,
        email: userResponse.email,
      });

      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

      res.status(201).json({
        success: true,
        data: {
          user: userResponse,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const loginService = new LoginService();
      const createSessionService = new CreateSessionService();

      const loginResponse = await loginService.login(req.body);

      const refreshToken = await createSessionService.createSession({
        userId: loginResponse.user.id,
        device: req.headers['user-agent'],
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.cookie(
        'accessToken',
        loginResponse.accessToken,
        accessTokenCookieOptions,
      );
      res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

      res.status(200).json({
        success: true,
        data: {
          user: loginResponse.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const revokeSessionService = new RevokeSessionService();
      const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

      if (refreshToken) {
        await revokeSessionService.revokeSession(refreshToken);
      }

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshSessionService = new RefreshSessionService();
      const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

      const tokens = await refreshSessionService.refreshSession(refreshToken);

      res.cookie('accessToken', tokens.accessToken, accessTokenCookieOptions);
      res.cookie(
        'refreshToken',
        tokens.refreshToken,
        refreshTokenCookieOptions,
      );

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const requestPasswordResetService = new RequestPasswordResetService();
      const { email } = req.body;

      const token =
        await requestPasswordResetService.requestPasswordReset(email);

      // Secure out-of-band delivery: Dispatch simulated email instead of returning it in the HTTP response
      // Do not wait for email dispatch to complete to prevent timing-based email enumeration attacks.
      import('../../../../shared/services/email.service.js').then(
        ({ EmailService }) => {
          EmailService.sendPasswordResetEmail(email, token).catch((e) =>
            console.error(e),
          );
        },
      );

      res.status(200).json({
        success: true,
        message:
          'If the email exists, a password reset link has been dispatched securely.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const confirmPasswordResetService = new ConfirmPasswordResetService();
      const { token, newPassword } = req.body;

      await confirmPasswordResetService.confirmPasswordReset({
        rawToken: token,
        newPassword,
      });

      res.status(200).json({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const changePasswordService = new ChangePasswordService();
      const { currentPassword, newPassword } = req.body;
      const userId = req.user!.id; // Ensure authenticate middleware runs first!

      await changePasswordService.changePassword(userId, {
        currentPassword,
        newPassword,
      });

      res.status(200).json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

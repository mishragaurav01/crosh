import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import {
  registerSchema,
  loginSchema,
  logoutSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '../validation/auth.validation.js';

const authRoutes = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new underlying user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
authRoutes.post(
  '/register',
  validateRequest(registerSchema),
  AuthController.register,
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and issue tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authenticated successfully, cookies injected
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
authRoutes.post('/login', validateRequest(loginSchema), AuthController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout and revoke active session
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
authRoutes.post('/logout', authenticate, AuthController.logout);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access session via refresh token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Tokens refreshed and cookies updated
 *       401:
 *         description: Invalid refresh token
 */
authRoutes.post(
  '/refresh',
  validateRequest(refreshSchema),
  AuthController.refresh,
);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset logic
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset mechanism fired
 */
authRoutes.post(
  '/forgot-password',
  validateRequest(forgotPasswordSchema),
  AuthController.forgotPassword,
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Confirm password via reset token hash
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated appropriately
 *       400:
 *         description: Invalid token signature
 */
authRoutes.post(
  '/reset-password',
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword,
);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change user password while authenticated
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully transformed password
 *       400:
 *         description: Incorrect original password format
 */
authRoutes.post(
  '/change-password',
  authenticate,
  validateRequest(changePasswordSchema),
  AuthController.changePassword,
);

export { authRoutes };

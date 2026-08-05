import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { updateProfileSchema } from '../validation/user.validation.js';

import { requireRole } from '../../../../app/middlewares/auth/require-role.js';

const userRoutes = Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retrieve your profile metadata
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Displayed personal profile logic
 */
userRoutes.get('/me', authenticate, UserController.getProfile);

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Update basic user configuration payload
 *     tags: [User]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patched properly
 */
userRoutes.patch(
  '/me',
  authenticate,
  validateRequest(updateProfileSchema),
  UserController.updateProfile,
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Demo endpoint to demonstrate authorize middleware
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Only reachable by Admins
 */
userRoutes.get('/', authenticate, requireRole('Admin'), (req, res) => {
  res.json({ success: true, message: 'You are an admin!' });
});

export { userRoutes };

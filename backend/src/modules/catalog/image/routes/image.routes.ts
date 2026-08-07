import { Router } from 'express';
import { ImageController } from '../controllers/image.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { requireRole } from '../../../../app/middlewares/auth/require-role.js';
import { uploadMiddleware } from '../../../../shared/upload/upload.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ProductMedia
 *   description: Product Image Management Endpoints
 */

/**
 * @swagger
 * /products/{id}/images:
 *   get:
 *     summary: Retrieve Product Images
 *     tags: [ProductMedia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of images
 */
router.get('/products/:id/images', ImageController.getProductImages);

/**
 * @swagger
 * /products/{id}/images:
 *   post:
 *     summary: Upload a new Product Image
 *     tags: [ProductMedia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               altText:
 *                 type: string
 *               sortOrder:
 *                 type: number
 *               isThumbnail:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Image Created
 */
router.post(
  '/products/:id/images',
  authenticate,
  requireRole('Admin'),
  uploadMiddleware.single('image'),
  ImageController.uploadProductImage,
);

/**
 * @swagger
 * /images/{id}:
 *   patch:
 *     summary: Update image metadata (ordering, alt text, status)
 *     tags: [ProductMedia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated Image
 */
router.patch(
  '/images/:id',
  authenticate,
  requireRole('Admin'),
  ImageController.updateImage,
);

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     summary: Delete Product Image
 *     tags: [ProductMedia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Image deleted
 */
router.delete(
  '/images/:id',
  authenticate,
  requireRole('Admin'),
  ImageController.deleteImage,
);

export { router as imageRoutes };

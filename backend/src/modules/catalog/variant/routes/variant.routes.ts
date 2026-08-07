/**
 * @swagger
 * tags:
 *   name: Variants
 *   description: Product variant management
 *
 * /products/{productId}/variants:
 *   get:
 *     summary: Get all variants for a product
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of variants
 *   post:
 *     summary: Create a product variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku: { type: string, example: "VAR-RED-M" }
 *               status: { type: string, example: "Active" }
 *     responses:
 *       201:
 *         description: Created variant
 *
 * /variants/{id}:
 *   patch:
 *     summary: Update a variant
 *     tags: [Variants]
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
 *             properties:
 *               status: { type: string, example: "Draft" }
 *     responses:
 *       200:
 *         description: Updated variant
 *   delete:
 *     summary: Soft delete a variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Variant deleted
 */

import { Router } from 'express';
import { VariantController } from '../controllers/variant.controller.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import {
  createVariantSchema,
  updateVariantSchema,
} from '../validation/variant.validation.js';
import {
  authenticate,
  requireRole,
} from '../../../../app/middlewares/auth/index.js';

const router = Router();

// Routes for `/api/v1/products/:productId/variants`
router.get('/products/:productId/variants', VariantController.getVariants);
router.post(
  '/products/:productId/variants',
  authenticate,
  requireRole('Admin'),
  validateRequest(createVariantSchema),
  VariantController.createVariant,
);

// Routes for `/api/v1/variants/:id`
router.patch(
  '/variants/:id',
  authenticate,
  requireRole('Admin'),
  validateRequest(updateVariantSchema),
  VariantController.updateVariant,
);
router.delete(
  '/variants/:id',
  authenticate,
  requireRole('Admin'),
  VariantController.archiveVariant,
);

export { router as variantRoutes };

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: Pricing management
 *
 * /pricing/{variantId}:
 *   get:
 *     summary: Get prices for a variant
 *     tags: [Pricing]
 *     parameters:
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prices list
 *
 * /pricing:
 *   post:
 *     summary: Set price for a variant
 *     tags: [Pricing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               variantId: { type: string }
 *               currency: { type: string, example: "INR" }
 *               basePrice: { type: number, example: 1500 }
 *               salePrice: { type: number, example: 1200 }
 *     responses:
 *       201:
 *         description: Price set
 *
 * /pricing/{id}:
 *   patch:
 *     summary: Update a price record
 *     tags: [Pricing]
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
 *               salePrice: { type: number, example: 1000 }
 *     responses:
 *       200:
 *         description: Price updated
 *   delete:
 *     summary: Remove a price
 *     tags: [Pricing]
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
 *         description: Price removed
 */

import { Router } from 'express';
import { PricingController } from '../controllers/pricing.controller.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import {
  createPriceSchema,
  updatePriceSchema,
} from '../validation/pricing.validation.js';
import {
  authenticate,
  requireRole,
} from '../../../../app/middlewares/auth/index.js';

const router = Router();

// Routes for `/api/v1/pricing`

router.get('/:variantId', PricingController.getPrices);

router.post(
  '/',
  authenticate,
  requireRole('Admin'),
  validateRequest(createPriceSchema),
  PricingController.setPrice,
);

router.patch(
  '/:id',
  authenticate,
  requireRole('Admin'),
  validateRequest(updatePriceSchema),
  PricingController.updatePrice,
);

router.delete(
  '/:id',
  authenticate,
  requireRole('Admin'),
  PricingController.deletePrice,
);

export { router as pricingRoutes };

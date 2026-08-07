/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management
 *
 * /inventory/{variantId}:
 *   get:
 *     summary: Get inventory for a variant
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory details
 *
 * /inventory/add:
 *   post:
 *     summary: Add stock to inventory
 *     tags: [Inventory]
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
 *               amount: { type: number, example: 50 }
 *     responses:
 *       200:
 *         description: Stock added
 *
 * /inventory/reserve:
 *   post:
 *     summary: Reserve stock
 *     tags: [Inventory]
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
 *               amount: { type: number, example: 2 }
 *     responses:
 *       200:
 *         description: Stock reserved
 *
 * /inventory/release:
 *   post:
 *     summary: Release reserved stock
 *     tags: [Inventory]
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
 *               amount: { type: number, example: 2 }
 *     responses:
 *       200:
 *         description: Stock released
 *
 * /inventory/adjust:
 *   post:
 *     summary: Set exact stock amount
 *     tags: [Inventory]
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
 *               quantity: { type: number, example: 100 }
 *     responses:
 *       200:
 *         description: Stock adjusted
 */

import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import {
  stockChangeSchema,
  stockAdjustSchema,
} from '../validation/inventory.validation.js';
import {
  authenticate,
  requireRole,
} from '../../../../app/middlewares/auth/index.js';

const router = Router();

// Routes for `/api/v1/inventory`

router.get('/:variantId', InventoryController.getInventory);

router.post(
  '/add',
  authenticate,
  requireRole('Admin'),
  validateRequest(stockChangeSchema),
  InventoryController.addStock,
);

router.post(
  '/reserve',
  authenticate, // Maybe internal service role needed later, for now protect
  validateRequest(stockChangeSchema),
  InventoryController.reserveStock,
);

router.post(
  '/release',
  authenticate,
  validateRequest(stockChangeSchema),
  InventoryController.releaseStock,
);

router.post(
  '/adjust',
  authenticate,
  requireRole('Admin'),
  validateRequest(stockAdjustSchema),
  InventoryController.adjustStock,
);

export { router as inventoryRoutes };


/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 * /api/v1/orders/{id}/cancel:
 *   patch:
 *     summary: Cancel order
 *     tags: [Orders]
 * /api/v1/orders/{id}/status:
 *   patch:
 *     summary: Update order status (Admin)
 *     tags: [Orders]
 */
import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { requireRole } from '../../../../app/middlewares/auth/require-role.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { orderParamsSchema, updateOrderStatusSchema } from '../validation/order.validation.js';

const router = Router();

router.use(authenticate);

router.get('/', OrderController.getOrders);
router.get('/:id', validateRequest(orderParamsSchema), OrderController.getOrder);
router.patch('/:id/cancel', validateRequest(orderParamsSchema), OrderController.cancelOrder);

// Admin only
router.patch('/:id/status', requireRole('Admin'), validateRequest(updateOrderStatusSchema), OrderController.updateStatus);

export { router as orderRoutes };

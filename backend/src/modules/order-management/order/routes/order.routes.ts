import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { requireRole } from '../../../../app/middlewares/auth/require-role.js';

const router = Router();

router.use(authenticate);

router.get('/', OrderController.getOrders);
router.get('/:id', OrderController.getOrder);
router.patch('/:id/cancel', OrderController.cancelOrder);

// Admin only
router.patch('/:id/status', requireRole('Admin'), OrderController.updateStatus);

export { router as orderRoutes };

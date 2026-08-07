import { Router } from 'express';
import { CouponController } from '../controllers/coupon.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { requireRole } from '../../../../app/middlewares/auth/require-role.js';

const router = Router();
router.use(authenticate, requireRole('Admin'));

// Only Admins manage coupons directly (Customers interact via Cart routes)
router.post('/', CouponController.create);
router.patch('/:id', CouponController.update);
router.delete('/:id', CouponController.delete);

export { router as couponRoutes };

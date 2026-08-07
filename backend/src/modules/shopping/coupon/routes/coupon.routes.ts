
/**
 * @swagger
 * /api/v1/coupons:
 *   post:
 *     summary: Create coupon
 *     tags: [Coupons]
 * /api/v1/coupons/{id}:
 *   patch:
 *     summary: Update coupon
 *     tags: [Coupons]
 *   delete:
 *     summary: Delete coupon
 *     tags: [Coupons]
 */
import { Router } from 'express';
import { CouponController } from '../controllers/coupon.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { requireRole } from '../../../../app/middlewares/auth/require-role.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { createCouponSchema, updateCouponSchema } from '../validation/coupon.validation.js';

const router = Router();
router.use(authenticate, requireRole('Admin'));

// Only Admins manage coupons directly (Customers interact via Cart routes)
router.post('/', validateRequest(createCouponSchema), CouponController.create);
router.patch('/:id', validateRequest(updateCouponSchema), CouponController.update);
router.delete('/:id', CouponController.delete);

export { router as couponRoutes };

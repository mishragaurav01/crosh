
/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get cart
 *     tags: [Cart]
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *   delete:
 *     summary: Clear cart
 *     tags: [Cart]
 * /api/v1/cart/items/{itemId}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *   delete:
 *     summary: Remove cart item
 *     tags: [Cart]
 * /api/v1/cart/apply-coupon:
 *   post:
 *     summary: Apply coupon
 *     tags: [Cart]
 * /api/v1/cart/remove-coupon:
 *   post:
 *     summary: Remove coupon
 *     tags: [Cart]
 * /api/v1/cart/merge:
 *   post:
 *     summary: Merge guest cart
 *     tags: [Cart]
 */
import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { optionalAuth } from '../../../../app/middlewares/auth/optional-auth.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { addItemSchema, updateItemSchema, removeItemSchema, applyCouponSchema } from '../validation/cart.validation.js';

const router = Router();

router.get('/', optionalAuth, CartController.getCart);
router.post('/', optionalAuth, validateRequest(addItemSchema), CartController.addItem);
router.patch('/items/:itemId', optionalAuth, validateRequest(updateItemSchema), CartController.updateItem);
router.delete('/items/:itemId', optionalAuth, validateRequest(removeItemSchema), CartController.removeItem);
router.delete('/', optionalAuth, CartController.clearCart);

router.post('/apply-coupon', optionalAuth, validateRequest(applyCouponSchema), CartController.applyCoupon);
router.post('/remove-coupon', optionalAuth, CartController.removeCoupon);

// Merge requires Auth
router.post('/merge', authenticate, CartController.mergeCart);

export { router as cartRoutes };

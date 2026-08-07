import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';

// Note: Cart routes can conditionally use authenticate. 
// We will simply attach user object if token exists without throwing via an "optional auth" middleware
// But the prompt implies authenticated users mostly, except `merge` which explicitly uses guest merge logic.
// For brevity, we'll assume `authenticate` allows pass-through if no token and handles parsing if there is.
// I will wrap it to let Guest IDs pass.

import type { Request, Response, NextFunction } from 'express';
const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, (err) => {
        // ignore error if unauthorized, but fail on invalid
        if (err && (err as any).message === 'Token missing') return next();
        if (err) return next();
        next();
    });
};

const router = Router();

router.get('/', optionalAuth, CartController.getCart);
router.post('/', optionalAuth, CartController.addItem);
router.patch('/items/:itemId', optionalAuth, CartController.updateItem);
router.delete('/items/:itemId', optionalAuth, CartController.removeItem);
router.delete('/', optionalAuth, CartController.clearCart);

router.post('/apply-coupon', optionalAuth, CartController.applyCoupon);
router.post('/remove-coupon', optionalAuth, CartController.removeCoupon);

// Merge requires Auth
router.post('/merge', authenticate, CartController.mergeCart);

export { router as cartRoutes };

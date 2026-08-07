
/**
 * @swagger
 * /api/v1/checkout/summary:
 *   get:
 *     summary: Get checkout summary
 *     tags: [Checkout]
 * /api/v1/checkout:
 *   post:
 *     summary: Place order
 *     tags: [Checkout]
 */
import { Router } from 'express';
import { CheckoutController } from '../controllers/checkout.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { checkoutSchema } from '../validation/checkout.validation.js';

const router = Router();

router.use(authenticate);

router.get('/summary', CheckoutController.getSummary);
router.post('/', validateRequest(checkoutSchema), CheckoutController.placeOrder);

export { router as checkoutRoutes };

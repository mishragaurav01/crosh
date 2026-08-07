import { Router } from 'express';
import { CheckoutController } from '../controllers/checkout.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/summary', CheckoutController.getSummary);
router.post('/', CheckoutController.placeOrder);

export { router as checkoutRoutes };

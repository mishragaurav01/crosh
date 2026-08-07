import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', WishlistController.get);
router.post('/', WishlistController.add);
router.delete('/:productId', WishlistController.remove);
router.delete('/', WishlistController.clear);

export { router as wishlistRoutes };

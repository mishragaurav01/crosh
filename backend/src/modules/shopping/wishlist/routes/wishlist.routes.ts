
/**
 * @swagger
 * /api/v1/wishlist:
 *   get:
 *     summary: Get wishlist
 *     tags: [Wishlist]
 *   post:
 *     summary: Add to wishlist
 *     tags: [Wishlist]
 *   delete:
 *     summary: Clear wishlist
 *     tags: [Wishlist]
 * /api/v1/wishlist/{id}:
 *   delete:
 *     summary: Remove item from wishlist
 *     tags: [Wishlist]
 */
import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { addWishlistSchema, removeWishlistSchema } from '../validation/wishlist.validation.js';

const router = Router();
router.use(authenticate);

router.get('/', WishlistController.get);
router.post('/', validateRequest(addWishlistSchema), WishlistController.add);
router.delete('/:productId', validateRequest(removeWishlistSchema), WishlistController.remove);
router.delete('/', WishlistController.clear);

export { router as wishlistRoutes };

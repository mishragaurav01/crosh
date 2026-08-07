import type { Request, Response, NextFunction } from 'express';
import { WishlistService } from '../../../../application/wishlist/wishlist.service.js';

export class WishlistController {
    static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new WishlistService();
            const userId = req.user!.id;
            const result = await service.getWishlist(userId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async add(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new WishlistService();
            const userId = req.user!.id;
            const { productId } = req.body;
            const result = await service.addProduct(userId, productId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new WishlistService();
            const userId = req.user!.id;
            const result = await service.removeProduct(userId, req.params.productId as string);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async clear(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new WishlistService();
            const userId = req.user!.id;
            const result = await service.clearWishlist(userId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }
}

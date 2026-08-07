import type { Request, Response, NextFunction } from 'express';
import { CartService } from '../../../../application/cart/cart.service.js';

export class CartController {
    static async getCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CartService();
            const userId = req.user?.id;
            const guestId = req.headers['x-guest-id'] as string;
            const result = await service.getCart(userId, guestId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async addItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CartService();
            const userId = req.user?.id;
            const guestId = req.headers['x-guest-id'] as string;
            const { productId, variantId, quantity } = req.body;
            const result = await service.addItem(productId, variantId, quantity, userId, guestId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async updateItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CartService();
            const userId = req.user?.id;
            const guestId = req.headers['x-guest-id'] as string;
            const { quantity } = req.body;
            const variantId = req.params.itemId as string;
            const result = await service.updateItemQuantity(variantId, quantity, userId, guestId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async removeItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CartService();
            const userId = req.user?.id;
            const guestId = req.headers['x-guest-id'] as string;
            const variantId = req.params.itemId as string;
            const result = await service.removeItem(variantId, userId, guestId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async clearCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CartService();
            const userId = req.user?.id;
            const guestId = req.headers['x-guest-id'] as string;
            const result = await service.clearCart(userId, guestId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async applyCoupon(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CartService();
            const userId = req.user?.id;
            const guestId = req.headers['x-guest-id'] as string;
            const { code } = req.body;
            const result = await service.applyCoupon(code, userId, guestId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async removeCoupon(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CartService();
            const userId = req.user?.id;
            const guestId = req.headers['x-guest-id'] as string;
            const result = await service.removeCoupon(userId, guestId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async mergeCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CartService();
            const userId = req.user!.id; // auth required to merge
            const guestId = req.body.guestId;
            const result = await service.mergeGuestCart(guestId, userId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }
}

import type { Request, Response, NextFunction } from 'express';
import { CheckoutService } from '../../../../application/checkout/checkout.service.js';
import { OrderService } from '../../../../application/order/order.service.js';

export class CheckoutController {
    static async getSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CheckoutService();
            const userId = req.user!.id;
            const result = await service.getSummary(userId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async placeOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new OrderService();
            const userId = req.user!.id;
            const { addressId } = req.body;
            const result = await service.placeOrder(userId, addressId);
            res.status(201).json({ success: true, data: result });
        } catch (e) { next(e); }
    }
}

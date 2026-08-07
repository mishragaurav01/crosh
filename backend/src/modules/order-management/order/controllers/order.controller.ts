import type { Request, Response, NextFunction } from 'express';
import { OrderService } from '../../../../application/order/order.service.js';

export class OrderController {
    static async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new OrderService();
            const userId = req.user!.id;
            const isAdmin = req.user!.roles.some((r: any) => r.name === 'Admin');

            let result;
            if (isAdmin && req.query.all === 'true') {
                result = await service.getAllOrders();
            } else {
                result = await service.getUserOrders(userId);
            }
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new OrderService();
            const userId = req.user!.id;
            const isAdmin = req.user!.roles.some((r: any) => r.name === 'Admin');
            const orderId = req.params.id as string;
            const result = await service.getOrder(userId, orderId, isAdmin);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new OrderService();
            const userId = req.user!.id;
            const isAdmin = req.user!.roles.some((r: any) => r.name === 'Admin');
            const orderId = req.params.id as string;
            const result = await service.cancelOrder(userId, orderId, isAdmin);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new OrderService();
            const orderId = req.params.id as string;
            const { status } = req.body;
            const result = await service.updateOrderStatus(orderId, status);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }
}

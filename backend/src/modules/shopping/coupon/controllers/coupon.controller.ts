import type { Request, Response, NextFunction } from 'express';
import { CouponService } from '../../../../application/coupon/coupon.service.js';

export class CouponController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CouponService();
            const result = await service.createCoupon(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CouponService();
            const result = await service.updateCoupon(req.params.id as string, req.body);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new CouponService();
            await service.deleteCoupon(req.params.id as string);
            res.status(200).json({ success: true, message: 'Deleted' });
        } catch (e) { next(e); }
    }
}

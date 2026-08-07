import type { Request, Response, NextFunction } from 'express';
import { AddressService } from '../../../../application/address/address.service.js';

export class AddressController {
    static async addAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new AddressService();
            const userId = req.user!.id; // auth middleware guarantees this
            const result = await service.createAddress(userId, req.body);
            res.status(201).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async getAddresses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new AddressService();
            const userId = req.user!.id;
            const result = await service.getAddresses(userId);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async updateAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new AddressService();
            const userId = req.user!.id;
            const addressId = req.params.id as string;
            const result = await service.updateAddress(userId, addressId, req.body);
            res.status(200).json({ success: true, data: result });
        } catch (e) { next(e); }
    }

    static async deleteAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new AddressService();
            const userId = req.user!.id;
            const addressId = req.params.id as string;
            await service.deleteAddress(userId, addressId);
            res.status(200).json({ success: true, message: 'Address deleted' });
        } catch (e) { next(e); }
    }
}

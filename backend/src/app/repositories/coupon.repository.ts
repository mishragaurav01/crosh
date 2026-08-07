import { CouponModel } from '../../domain/coupon/index.js';
import type { CouponDocument } from '../../domain/coupon/index.js';

export class CouponRepository {
    async getByCode(code: string): Promise<CouponDocument | null> {
        return CouponModel.findOne({ code: code.toUpperCase() }).exec();
    }

    async findById(id: string): Promise<CouponDocument | null> {
        return CouponModel.findById(id).exec();
    }

    async create(data: any): Promise<CouponDocument> {
        return CouponModel.create(data);
    }

    async update(id: string, updates: any): Promise<CouponDocument | null> {
        return CouponModel.findByIdAndUpdate(id, { $set: updates }, { new: true }).exec();
    }

    async incrementUsage(id: string, options?: any): Promise<void> {
        await CouponModel.findByIdAndUpdate(id, { $inc: { usedCount: 1 } }, options).exec();
    }

    async delete(id: string): Promise<void> {
        await CouponModel.findByIdAndDelete(id).exec();
    }
}

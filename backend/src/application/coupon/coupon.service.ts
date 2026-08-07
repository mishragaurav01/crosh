import { CouponRepository } from '../../app/repositories/coupon.repository.js';
import { CouponMapper, type CouponResponse } from '../../domain/coupon/index.js';
import { NotFoundError, ValidationError, ConflictError } from '../../shared/errors/index.js';

export class CouponService {
    constructor(private couponRepo = new CouponRepository()) { }

    async createCoupon(data: any): Promise<CouponResponse> {
        const existing = await this.couponRepo.getByCode(data.code);
        if (existing) throw new ConflictError('Coupon code already exists');

        // Ensure data validation happens in controller logic
        const created = await this.couponRepo.create(data);
        return CouponMapper.toResponse(created);
    }

    async updateCoupon(id: string, updates: any): Promise<CouponResponse> {
        const updated = await this.couponRepo.update(id, updates);
        if (!updated) throw new NotFoundError('Coupon not found');
        return CouponMapper.toResponse(updated);
    }

    async deleteCoupon(id: string): Promise<void> {
        await this.couponRepo.delete(id);
    }

    async validateCoupon(code: string, cartTotal: number): Promise<CouponResponse> {
        const coupon = await this.couponRepo.getByCode(code);
        if (!coupon) throw new NotFoundError('Invalid coupon code');
        if (!coupon.isActive) throw new ValidationError('Coupon is no longer active');

        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
            throw new ValidationError('Coupon has expired');
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            throw new ValidationError('Coupon usage limit reached');
        }

        if (coupon.minOrderAmount && cartTotal < coupon.minOrderAmount) {
            throw new ValidationError(`Minimum order amount of ${coupon.minOrderAmount} not reached`);
        }

        return CouponMapper.toResponse(coupon);
    }
}

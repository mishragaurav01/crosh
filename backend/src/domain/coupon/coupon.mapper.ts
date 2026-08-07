import type { CouponDocument, CouponResponse } from './coupon.types.js';

export class CouponMapper {
    static toResponse(doc: CouponDocument): CouponResponse {
        return {
            id: String(doc._id),
            code: doc.code,
            type: doc.type,
            value: doc.value,
            minOrderAmount: doc.minOrderAmount,
            usageLimit: doc.usageLimit,
            expiresAt: doc.expiresAt,
            isActive: doc.isActive,
        };
    }
}

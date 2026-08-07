import { Types, Document } from 'mongoose';

export type CouponType = 'Percentage' | 'FixedAmount';

export interface Coupon {
    code: string;
    type: CouponType;
    value: number; // percentage or fixed amount currency
    minOrderAmount?: number;
    usageLimit?: number;
    usedCount: number;
    expiresAt?: Date;
    isActive: boolean;
}

export interface CouponDocument extends Coupon, Document {
    _id: Types.ObjectId;
}

export type CouponResponse = Omit<Coupon, 'usedCount'> & {
    id: string;
};

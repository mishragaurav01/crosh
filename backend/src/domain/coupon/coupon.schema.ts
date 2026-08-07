import { Schema, model } from 'mongoose';
import type { CouponDocument } from './coupon.types.js';

export const couponSchema = new Schema<CouponDocument>(
    {
        code: { type: String, required: true, unique: true, uppercase: true, trim: true },
        type: { type: String, enum: ['Percentage', 'FixedAmount'], required: true },
        value: { type: Number, required: true, min: 0 },
        minOrderAmount: { type: Number, default: 0 },
        usageLimit: { type: Number },
        usedCount: { type: Number, default: 0 },
        expiresAt: { type: Date },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Indexes for fast verification
couponSchema.index({ code: 1, isActive: 1 });

export const CouponModel = model<CouponDocument>('Coupon', couponSchema);

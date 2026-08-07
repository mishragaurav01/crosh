import { Schema, model } from 'mongoose';
import type { CartDocument } from './cart.types.js';

export const cartItemSchema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: true },
        quantity: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

export const cartSchema = new Schema<CartDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        guestId: { type: String },
        items: [cartItemSchema],
        couponId: { type: Schema.Types.ObjectId, ref: 'Coupon' },
    },
    { timestamps: true }
);

// Either userId or guestId must exist, but we enforce uniqueness if logged in
cartSchema.index({ userId: 1 }, { unique: true, partialFilterExpression: { userId: { $exists: true } } });
cartSchema.index({ guestId: 1 }, { unique: true, partialFilterExpression: { guestId: { $exists: true } } });

export const CartModel = model<CartDocument>('Cart', cartSchema);

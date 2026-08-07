import { Schema, model } from 'mongoose';
import type { OrderDocument } from './order.types.js';

export const orderItemSchema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: true },
        sku: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        total: { type: Number, required: true, min: 0 },
    },
    { _id: false }
);

export const orderSchema = new Schema<OrderDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        addressId: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
        items: [orderItemSchema],
        couponId: { type: Schema.Types.ObjectId, ref: 'Coupon' },
        subTotal: { type: Number, required: true },
        discountAmount: { type: Number, default: 0 },
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Refunded'],
            default: 'Pending'
        },
        statusHistory: [
            {
                status: { type: String },
                timestamp: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

export const OrderModel = model<OrderDocument>('Order', orderSchema);

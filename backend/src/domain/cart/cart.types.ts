import { Types, Document } from 'mongoose';
import type { CouponResponse } from '../coupon/coupon.types.js';

export interface CartItem {
    productId: Types.ObjectId | string;
    variantId: Types.ObjectId | string;
    quantity: number;
}

export interface Cart {
    userId?: Types.ObjectId | string;
    guestId?: string; // For Guest cart merging
    items: CartItem[];
    couponId?: Types.ObjectId | string;
}

export interface CartDocument extends Cart, Document {
    _id: Types.ObjectId;
}

export interface CartItemResponse {
    productId: string;
    variantId: string;
    quantity: number;
    product?: any; // populated product details
    variant?: any; // populated variant details
    price: number;
    total: number;
}

export interface CartResponse {
    id: string;
    userId?: string;
    guestId?: string;
    items: CartItemResponse[];
    coupon?: CouponResponse;
    subTotal: number;
    discountAmount: number;
    total: number;
}

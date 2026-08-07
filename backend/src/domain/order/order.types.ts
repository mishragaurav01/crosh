import { Types, Document } from 'mongoose';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned' | 'Refunded';

export interface OrderItem {
    productId: Types.ObjectId | string;
    variantId: Types.ObjectId | string;
    sku: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface Order {
    userId: Types.ObjectId | string;
    addressId: Types.ObjectId | string;
    items: OrderItem[];
    couponId?: Types.ObjectId | string;
    subTotal: number;
    discountAmount: number;
    total: number;
    status: OrderStatus;
    statusHistory: { status: OrderStatus; timestamp: Date }[];
}

export interface OrderDocument extends Order, Document {
    _id: Types.ObjectId;
}

export type OrderItemResponse = OrderItem & { productId: string; variantId: string };
export type OrderResponse = Omit<Order, 'userId' | 'addressId' | 'items' | 'couponId' | 'statusHistory'> & {
    id: string;
    userId: string;
    addressId: string;
    couponId?: string;
    items: OrderItemResponse[];
    statusHistory: { status: OrderStatus; timestamp: string }[];
    createdAt: string;
    updatedAt: string;
};

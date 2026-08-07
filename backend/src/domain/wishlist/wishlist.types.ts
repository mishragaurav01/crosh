import { Types, Document } from 'mongoose';

export interface Wishlist {
    userId: Types.ObjectId | string;
    items: (Types.ObjectId | string)[]; // array of product IDs
}

export interface WishlistDocument extends Wishlist, Document {
    _id: Types.ObjectId;
}

export type WishlistResponse = Omit<Wishlist, 'userId' | 'items'> & {
    id: string;
    userId: string;
    items: any[];
};

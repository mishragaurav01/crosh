import { Schema, model } from 'mongoose';
import type { WishlistDocument } from './wishlist.types.js';

export const wishlistSchema = new Schema<WishlistDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true }
);

export const WishlistModel = model<WishlistDocument>('Wishlist', wishlistSchema);

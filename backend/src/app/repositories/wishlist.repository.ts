import { WishlistModel } from '../../domain/wishlist/index.js';
import type { WishlistDocument } from '../../domain/wishlist/index.js';

export class WishlistRepository {
    async getByUserId(userId: string): Promise<WishlistDocument | null> {
        return WishlistModel.findOne({ userId }).populate('items').exec();
    }

    async getOrCreate(userId: string): Promise<WishlistDocument> {
        let wishlist = await this.getByUserId(userId);
        if (!wishlist) {
            wishlist = await WishlistModel.create({ userId, items: [] });
        }
        return wishlist;
    }

    async addProduct(userId: string, productId: string): Promise<WishlistDocument> {
        const wishlist = await this.getOrCreate(userId);
        if (!wishlist.items.some(item => item.toString() === productId)) {
            wishlist.items.push(productId);
            await wishlist.save();
        }
        return wishlist;
    }

    async removeProduct(userId: string, productId: string): Promise<WishlistDocument | null> {
        const wishlist = await this.getByUserId(userId);
        if (wishlist) {
            wishlist.items = wishlist.items.filter(item => item.toString() !== productId) as any;
            await wishlist.save();
        }
        return wishlist;
    }

    async clear(userId: string): Promise<WishlistDocument | null> {
        const wishlist = await this.getByUserId(userId);
        if (wishlist) {
            wishlist.items = [];
            await wishlist.save();
        }
        return wishlist;
    }
}

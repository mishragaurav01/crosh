import { CartModel } from '../../domain/cart/index.js';
import type { CartDocument } from '../../domain/cart/index.js';

export class CartRepository {
    async getByUserId(userId: string): Promise<CartDocument | null> {
        return CartModel.findOne({ userId }).populate('couponId').exec();
    }

    async getByGuestId(guestId: string): Promise<CartDocument | null> {
        return CartModel.findOne({ guestId }).populate('couponId').exec();
    }

    async create(data: Partial<CartDocument>): Promise<CartDocument> {
        return CartModel.create(data);
    }

    async save(cart: CartDocument): Promise<CartDocument> {
        return cart.save();
    }

    async delete(cartId: string): Promise<void> {
        await CartModel.findByIdAndDelete(cartId).exec();
    }
}

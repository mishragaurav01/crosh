import type { CartDocument, CartResponse, CartItemResponse } from './cart.types.js';
import type { CouponResponse } from '../coupon/coupon.types.js';

export class CartMapper {
    static toResponse(
        doc: CartDocument,
        items: CartItemResponse[],
        subTotal: number,
        discountAmount: number,
        total: number,
        coupon?: CouponResponse
    ): CartResponse {
        return {
            id: String(doc._id),
            userId: doc.userId ? String(doc.userId) : undefined,
            guestId: doc.guestId,
            items,
            coupon,
            subTotal,
            discountAmount,
            total,
        };
    }
}

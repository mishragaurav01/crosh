import { CartService } from '../cart/cart.service.js';
import type { CartResponse } from '../../domain/cart/index.js';

export class CheckoutService {
    constructor(private cartService = new CartService()) { }

    async getSummary(userId: string): Promise<CartResponse> {
        return this.cartService.getCart(userId);
    }
}

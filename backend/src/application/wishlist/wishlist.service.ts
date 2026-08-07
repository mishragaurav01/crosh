import { WishlistRepository } from '../../app/repositories/wishlist.repository.js';
import { ProductRepository } from '../../app/repositories/product.repository.js';
import { WishlistMapper, type WishlistResponse } from '../../domain/wishlist/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export class WishlistService {
    constructor(
        private wishlistRepo = new WishlistRepository(),
        private productRepo = new ProductRepository()
    ) { }

    async getWishlist(userId: string): Promise<WishlistResponse> {
        const list = await this.wishlistRepo.getOrCreate(userId);
        return WishlistMapper.toResponse(list);
    }

    async addProduct(userId: string, productId: string): Promise<WishlistResponse> {
        const product = await this.productRepo.findById(productId);
        if (!product) throw new NotFoundError('Product not found');

        const updated = await this.wishlistRepo.addProduct(userId, productId);
        return WishlistMapper.toResponse(updated);
    }

    async removeProduct(userId: string, productId: string): Promise<WishlistResponse> {
        let list = await this.wishlistRepo.removeProduct(userId, productId);
        if (!list) list = await this.wishlistRepo.getOrCreate(userId);
        return WishlistMapper.toResponse(list);
    }

    async clearWishlist(userId: string): Promise<WishlistResponse> {
        let list = await this.wishlistRepo.clear(userId);
        if (!list) list = await this.wishlistRepo.getOrCreate(userId);
        return WishlistMapper.toResponse(list);
    }
}

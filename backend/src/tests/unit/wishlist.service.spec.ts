import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WishlistService } from '../../../src/application/wishlist/wishlist.service.js';

describe('WishlistService', () => {
    let mockWishlistRepo: any, mockProductRepo: any, service: any;

    beforeEach(() => {
        mockWishlistRepo = { getOrCreate: vi.fn(), addProduct: vi.fn(), removeProduct: vi.fn(), clear: vi.fn() };
        mockProductRepo = { findById: vi.fn() };
        service = new WishlistService(mockWishlistRepo, mockProductRepo);
    });

    it('should get wishlist', async () => {
        mockWishlistRepo.getOrCreate.mockResolvedValue({ _id: '1', userId: 'u1', items: [] });
        const res = await service.getWishlist('u1');
        expect(res).toBeDefined();
        expect(res.items.length).toBe(0);
    });

    it('should add product to wishlist', async () => {
        mockProductRepo.findById.mockResolvedValue({ _id: 'p1' });
        mockWishlistRepo.addProduct.mockResolvedValue({ _id: '1', userId: 'u1', items: ['p1'] });
        const res = await service.addProduct('u1', 'p1');
        expect(res).toBeDefined();
    });
});

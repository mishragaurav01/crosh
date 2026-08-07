import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartService } from '../../../src/application/cart/cart.service.js';

describe('CartService', () => {
    let mockCartRepo: any, mockProductRepo: any, mockVariantRepo: any, mockPriceRepo: any, mockInventoryRepo: any, mockCouponService: any, service: any;

    beforeEach(() => {
        mockCartRepo = { getByUserId: vi.fn(), getByGuestId: vi.fn(), create: vi.fn(), save: vi.fn(), removeItem: vi.fn() };
        mockProductRepo = { findById: vi.fn() };
        mockVariantRepo = { findById: vi.fn() };
        mockPriceRepo = { findByVariantIdAndCurrency: vi.fn() };
        mockInventoryRepo = { findByVariantId: vi.fn() };
        mockCouponService = { validateCoupon: vi.fn() };
        service = new CartService(
            mockCartRepo, mockProductRepo, mockVariantRepo,
            mockPriceRepo, mockInventoryRepo, mockCouponService
        );
    });

    it('should get cart for user', async () => {
        mockCartRepo.getByUserId.mockResolvedValue({ _id: '507f1f77bcf86cd799439016', items: [] });
        const res = await service.getCart('507f1f77bcf86cd799439013');
        expect(res).toBeDefined();
        expect(res.subTotal).toBe(0);
    });

    it('should add item to cart', async () => {
        mockProductRepo.findById.mockResolvedValue({ _id: '507f1f77bcf86cd799439011', status: 'Active' });
        mockVariantRepo.findById.mockResolvedValue({ _id: '507f1f77bcf86cd799439012', productId: '507f1f77bcf86cd799439011' });
        mockInventoryRepo.findByVariantId.mockResolvedValue({ availableQuantity: 10 });
        mockPriceRepo.findByVariantIdAndCurrency.mockResolvedValue({ basePrice: 100 });

        mockCartRepo.getByUserId.mockResolvedValue({ _id: '507f1f77bcf86cd799439016', items: [], save: vi.fn().mockResolvedValue({ _id: '507f1f77bcf86cd799439016', items: [{ productId: '507f1f77bcf86cd799439011', variantId: '507f1f77bcf86cd799439012', quantity: 1 }] }) });
        const res = await service.addItem('507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012', 1, '507f1f77bcf86cd799439013');
        expect(res).toBeDefined();
    });
});

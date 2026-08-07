import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderService } from '../../../src/application/order/order.service.js';
import mongoose from 'mongoose';
import { ValidationError } from '../../../src/shared/errors/index.js';

describe('OrderService', () => {
    let mockOrderRepo: any;
    let mockInventoryRepo: any;
    let mockAddressRepo: any;
    let mockCartService: any;
    let mockCouponRepo: any;
    let orderService: any;

    beforeEach(() => {
        mockOrderRepo = { create: vi.fn(), findById: vi.fn() };
        mockInventoryRepo = { findByVariantId: vi.fn(), save: vi.fn() };
        mockAddressRepo = { findById: vi.fn() };
        mockCartService = { getCart: vi.fn(), clearCart: vi.fn() };
        mockCouponRepo = { incrementUsage: vi.fn() };

        orderService = new OrderService(
            mockOrderRepo,
            mockInventoryRepo,
            mockAddressRepo,
            mockCartService,
            mockCouponRepo
        );

        vi.spyOn(mongoose, 'startSession').mockResolvedValue({
            withTransaction: vi.fn(async (cb: any) => await cb()),
            endSession: vi.fn()
        } as any);

        vi.spyOn(mongoose, 'model').mockReturnValue({
            findById: vi.fn().mockResolvedValue({ save: vi.fn() })
        } as any);
    });

    it('throws err if address invalid', async () => {
        mockAddressRepo.findById.mockResolvedValue(null);
        await expect(orderService.placeOrder('507f1f77bcf86cd799439011', '507f1f77bcf86cd799439014')).rejects.toThrow(ValidationError);
    });

    it('places order successfully locking inventory', async () => {
        mockAddressRepo.findById.mockResolvedValue({ userId: '507f1f77bcf86cd799439011' });
        mockCartService.getCart.mockResolvedValue({ items: [{ productId: '507f1f77bcf86cd799439016', variantId: '507f1f77bcf86cd799439016', quantity: 2, total: 100 }], total: 100 });
        const fakeInv = { availableQuantity: 5, save: vi.fn() };
        mockInventoryRepo.findByVariantId.mockResolvedValue(fakeInv);
        mockOrderRepo.create.mockResolvedValue({ _id: '507f1f77bcf86cd799439011', total: 100, items: [], statusHistory: [], createdAt: new Date(), updatedAt: new Date() });

        const result = await orderService.placeOrder('507f1f77bcf86cd799439011', '507f1f77bcf86cd799439014');
        expect(fakeInv.availableQuantity).toBe(3); // Deducted 2
        expect(mockOrderRepo.create).toHaveBeenCalled();
    });
});

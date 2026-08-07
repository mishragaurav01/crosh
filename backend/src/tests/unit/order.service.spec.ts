import { OrderService } from '../../../src/application/order/order.service.js';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';
import { ValidationError } from '../../../src/shared/errors/index.js';

describe('OrderService', () => {
    let mockOrderRepo: any;
    let mockInventoryRepo: any;
    let mockAddressRepo: any;
    let mockCartService: any;
    let mockCouponRepo: any;
    let orderService: any;

    beforeEach(() => {
        mockOrderRepo = { create: jest.fn(), findById: jest.fn() };
        mockInventoryRepo = { findByVariantId: jest.fn(), save: jest.fn() };
        mockAddressRepo = { findById: jest.fn() };
        mockCartService = { getCart: jest.fn(), clearCart: jest.fn() };
        mockCouponRepo = { incrementUsage: jest.fn() };

        orderService = new OrderService(
            mockOrderRepo,
            mockInventoryRepo,
            mockAddressRepo,
            mockCartService,
            mockCouponRepo
        );

        jest.spyOn(mongoose, 'startSession').mockResolvedValue({
            withTransaction: jest.fn(async (cb: any) => await cb()),
            endSession: jest.fn()
        } as any);
    });

    it('throws err if address invalid', async () => {
        mockAddressRepo.findById.mockResolvedValue(null);
        await expect(orderService.placeOrder('u1', 'a1')).rejects.toThrow(ValidationError);
    });

    it('places order successfully locking inventory', async () => {
        mockAddressRepo.findById.mockResolvedValue({ userId: 'u1' });
        mockCartService.getCart.mockResolvedValue({ items: [{ variantId: 'v1', quantity: 2, total: 100 }], total: 100 });
        const fakeInv = { availableQuantity: 5, save: jest.fn() };
        mockInventoryRepo.findByVariantId.mockResolvedValue(fakeInv);
        mockOrderRepo.create.mockResolvedValue({ _id: 'o1', total: 100, items: [], statusHistory: [], createdAt: new Date(), updatedAt: new Date() });

        const result = await orderService.placeOrder('u1', 'a1');
        expect(fakeInv.availableQuantity).toBe(3); // Deducted 2
        expect(mockOrderRepo.create).toHaveBeenCalled();
    });
});

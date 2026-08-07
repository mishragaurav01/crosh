import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CheckoutService } from '../../../src/application/checkout/checkout.service.js';

describe('CheckoutService', () => {
    let mockCartService: any, service: any;

    beforeEach(() => {
        mockCartService = { getCart: vi.fn() };
        service = new CheckoutService(mockCartService);
    });

    it('should get checkout summary', async () => {
        mockCartService.getCart.mockResolvedValue({ items: [], subTotal: 0, total: 0 });
        const res = await service.getSummary('u1');
        expect(res.total).toBe(0);
    });
});

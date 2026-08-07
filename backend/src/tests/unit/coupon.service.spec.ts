import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CouponService } from '../../../src/application/coupon/coupon.service.js';

describe('CouponService', () => {
    let mockCouponRepo: any, service: any;

    beforeEach(() => {
        mockCouponRepo = { create: vi.fn(), getByCode: vi.fn(), update: vi.fn(), delete: vi.fn() };
        service = new CouponService(mockCouponRepo);
    });

    it('should create coupon', async () => {
        mockCouponRepo.getByCode.mockResolvedValue(null);
        mockCouponRepo.create.mockResolvedValue({ _id: '1', code: 'TEST10', type: 'Percentage', value: 10 });
        const res = await service.createCoupon({ code: 'TEST10', type: 'Percentage', value: 10 } as any);
        expect(res.code).toBe('TEST10');
    });

    it('should validate coupon', async () => {
        mockCouponRepo.getByCode.mockResolvedValue({ _id: '1', code: 'TEST10', isActive: true, type: 'Percentage', value: 10, usedCount: 0 });
        const res = await service.validateCoupon('TEST10', 100);
        expect(res.code).toBe('TEST10');
        expect(res.value).toBe(10);
    });
});

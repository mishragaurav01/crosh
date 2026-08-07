import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddressService } from '../../../src/application/address/address.service.js';

describe('AddressService', () => {
    let mockRepo: any, service: any;

    beforeEach(() => {
        mockRepo = { create: vi.fn(), findByUserId: vi.fn(), findById: vi.fn(), update: vi.fn(), clearDefault: vi.fn(), delete: vi.fn() };
        service = new AddressService(mockRepo);
    });

    it('should create address', async () => {
        mockRepo.create.mockResolvedValue({ _id: '1', userId: 'u1', city: 'Test' });
        const res = await service.createAddress('u1', { city: 'Test' });
        expect(res.city).toBe('Test');
    });

    it('should get addresses', async () => {
        mockRepo.findByUserId.mockResolvedValue([{ _id: '1', userId: 'u1', city: 'Test' }]);
        const res = await service.getAddresses('u1');
        expect(res.length).toBe(1);
    });
});

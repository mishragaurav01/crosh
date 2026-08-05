/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mocked } from 'vitest';
import { CategoryService } from '../../application/category/category.service.js';
import { CategoryRepository } from '../../app/repositories/category.repository.js';
import { ConflictError, NotFoundError } from '../../shared/errors/index.js';

vi.mock('../../app/repositories/category.repository.js');

describe('CategoryService', () => {
    let service: CategoryService;
    let mockRepo: Mocked<CategoryRepository>;

    beforeEach(() => {
        vi.clearAllMocks();
        mockRepo = new CategoryRepository() as Mocked<CategoryRepository>;
        service = new CategoryService();
        (service as any).repository = mockRepo;
    });

    it('should create category successfully', async () => {
        const mockData = { name: 'Test', slug: 'test', isActive: true, sortOrder: 0 };
        mockRepo.findBySlug.mockResolvedValue(null);
        mockRepo.create.mockResolvedValue({ _id: '123', ...mockData, createdAt: new Date(), updatedAt: new Date() } as any);

        const result = await service.createCategory(mockData as any);
        expect(result.id).toBe('123');
        expect(result.slug).toBe('test');
    });

    it('should throw conflict if slug exists', async () => {
        mockRepo.findBySlug.mockResolvedValue({ _id: '123' } as any);
        await expect(service.createCategory({ name: 'T', slug: 't', isActive: true, sortOrder: 0 } as any))
            .rejects.toThrow(ConflictError);
    });
});

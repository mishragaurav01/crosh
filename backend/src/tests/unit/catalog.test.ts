/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mocked } from 'vitest';
import { CategoryService } from '../../application/category/category.service.js';
import { CategoryRepository } from '../../app/repositories/category.repository.js';
import { ConflictError, NotFoundError } from '../../shared/errors/index.js';

vi.mock('../../app/repositories/category.repository.js');

describe('CategoryService', () => {
  let service: CategoryService;
  let mockRepo: vi.Mocked<CategoryRepository>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo = new CategoryRepository() as vi.Mocked<CategoryRepository>;
    service = new CategoryService();
    (service as never).repository = mockRepo;
  });

  it('should create category successfully', async () => {
    const mockData = {
      name: 'Test',
      slug: 'test',
      isActive: true,
      sortOrder: 0,
    };
    mockRepo.findBySlug.mockResolvedValue(null);
    mockRepo.create.mockResolvedValue({
      _id: '123',
      ...mockData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);

    const result = await service.createCategory(mockData as never);
    expect(result.id).toBe('123');
    expect(result.slug).toBe('test');
  });

  it('should throw conflict if slug exists', async () => {
    mockRepo.findBySlug.mockResolvedValue({ _id: '123' } as never);
    await expect(
      service.createCategory({
        name: 'T',
        slug: 't',
        isActive: true,
        sortOrder: 0,
      } as never),
    ).rejects.toThrow(ConflictError);
  });
});

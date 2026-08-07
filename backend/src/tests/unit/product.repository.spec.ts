import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductRepository } from '../../app/repositories/product.repository.js';
import { ProductModel } from '../../domain/product/product.schema.js';

vi.mock('../../domain/product/product.schema.js');

describe('ProductRepository - Search & Discovery', () => {
  let repository: ProductRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new ProductRepository();
  });

  it('should search products with regex query and handle active status', async () => {
    const mockFind = {
      populate: vi.fn().mockReturnThis(),
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      exec: vi.fn().mockResolvedValue([{ name: 'Test Product' }]),
    };

    vi.mocked(ProductModel.countDocuments).mockResolvedValue(1);
    vi.mocked(ProductModel.find).mockReturnValue(mockFind as any);

    const result = await repository.search('test', { category: 'cat123' }, {
      page: 1,
      limit: 10,
    } as any);

    expect(ProductModel.find).toHaveBeenCalledWith({
      category: 'cat123',
      status: 'Active',
      $or: [
        { name: { $regex: 'test', $options: 'i' } },
        { slug: { $regex: 'test', $options: 'i' } },
      ],
    });

    expect(result.total).toBe(1);
    expect(result.data).toHaveLength(1);
  });
});

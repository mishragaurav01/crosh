import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImageService } from '../../application/image/image.service.js';
import { ImageRepository } from '../../app/repositories/image.repository.js';
import { LocalStorageProvider } from '../../shared/upload/local-storage.provider.js';

vi.mock('../../app/repositories/image.repository.js');
vi.mock('../../shared/upload/local-storage.provider.js');

describe('ImageService', () => {
  let service: ImageService;
  let mockRepo: Record<string, any>;
  let mockStorage: Record<string, any>;

  beforeEach(() => {
    mockRepo = {
      create: vi.fn(),
      findById: vi.fn(),
      findByProductId: vi.fn(),
      clearThumbnailStatus: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    mockStorage = {
      uploadFile: vi.fn(),
      deleteFile: vi.fn(),
    };

    service = new ImageService(mockRepo as any, mockStorage as any);
  });

  it('should upload an image and save to database', async () => {
    const file = {
      originalname: 'test.jpg',
      buffer: 'test',
    } as any;
    mockStorage.uploadFile.mockResolvedValue('/uploads/products/123-test.jpg');
    mockRepo.create.mockResolvedValue({
      _id: 'image123',
      productId: 'prod123',
      url: '/uploads/products/123-test.jpg',
    });

    const result = await service.uploadProductImage('prod123', file, {
      altText: 'Test',
    });

    expect(mockStorage.uploadFile).toHaveBeenCalledWith(file, 'products');
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/uploads/products/123-test.jpg',
        altText: 'Test',
        isThumbnail: false,
      }),
    );
    expect(result.id).toBe('image123');
  });
});

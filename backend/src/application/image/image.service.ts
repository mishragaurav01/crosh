import { ImageRepository } from '../../app/repositories/image.repository.js';
import { LocalStorageProvider } from '../../shared/upload/local-storage.provider.js';
import type { IStorageProvider } from '../../shared/upload/storage.provider.interface.js';
import { ImageMapper, type ImageResponse } from '../../domain/image/index.js';
import { NotFoundError, ValidationError } from '../../shared/errors/index.js';

export class ImageService {
  constructor(
    private imageRepository: ImageRepository = new ImageRepository(),
    private storageProvider: IStorageProvider = new LocalStorageProvider(),
  ) {}

  async uploadProductImage(
    productId: string,
    file: Express.Multer.File,
    data: { altText?: string; sortOrder?: number; isThumbnail?: boolean },
  ): Promise<ImageResponse> {
    if (!file) throw new ValidationError('No image file provided');

    // Process upload
    const url = await this.storageProvider.uploadFile(file, 'products');

    if (data.isThumbnail) {
      await this.imageRepository.clearThumbnailStatus(productId);
    }

    const imageDoc = await this.imageRepository.create({
      productId,
      url,
      altText: data.altText,
      sortOrder: data.sortOrder || 0,
      isThumbnail: data.isThumbnail || false,
      status: 'Active',
    });

    return ImageMapper.toResponse(imageDoc);
  }

  async getProductImages(productId: string): Promise<ImageResponse[]> {
    const images = await this.imageRepository.findByProductId(productId);
    return images.map(ImageMapper.toResponse);
  }

  async updateImage(
    id: string,
    updates: {
      altText?: string;
      sortOrder?: number;
      isThumbnail?: boolean;
      status?: 'Active' | 'Archived';
    },
  ): Promise<ImageResponse> {
    const image = await this.imageRepository.findById(id);
    if (!image) throw new NotFoundError('Image not found');

    if (updates.isThumbnail) {
      await this.imageRepository.clearThumbnailStatus(String(image.productId));
    }

    const updated = await this.imageRepository.update(id, updates);
    if (!updated) throw new NotFoundError('Image not found');
    return ImageMapper.toResponse(updated);
  }

  async removeImage(id: string): Promise<void> {
    const image = await this.imageRepository.findById(id);
    if (!image) throw new NotFoundError('Image not found');

    await this.storageProvider.deleteFile(image.url);
    await this.imageRepository.delete(id);
  }
}

import { ImageModel } from '../../domain/image/index.js';
import type { ImageDocument } from '../../domain/image/index.js';

export class ImageRepository {
  async create(data: Partial<ImageDocument>): Promise<ImageDocument> {
    const doc = new ImageModel(data);
    return doc.save();
  }

  async findById(id: string): Promise<ImageDocument | null> {
    return ImageModel.findById(id).exec();
  }

  async findByProductId(productId: string): Promise<ImageDocument[]> {
    return ImageModel.find({ productId, status: 'Active' })
      .sort({ sortOrder: 1 })
      .exec();
  }

  async clearThumbnailStatus(productId: string): Promise<void> {
    await ImageModel.updateMany(
      { productId },
      { $set: { isThumbnail: false } },
    ).exec();
  }

  async update(
    id: string,
    updates: Partial<ImageDocument>,
  ): Promise<ImageDocument | null> {
    return ImageModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true },
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await ImageModel.findByIdAndDelete(id).exec();
  }
}

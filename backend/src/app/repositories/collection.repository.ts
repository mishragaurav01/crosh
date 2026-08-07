import { CollectionModel } from '../../domain/collection/index.js';
import type {
  Collection,
  CollectionDocument,
} from '../../domain/collection/index.js';

export class CollectionRepository {
  async create(data: Collection): Promise<CollectionDocument> {
    const doc = new CollectionModel(data);
    return doc.save();
  }

  async findById(id: string): Promise<CollectionDocument | null> {
    return CollectionModel.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<CollectionDocument | null> {
    return CollectionModel.findOne({ slug }).exec();
  }

  async findAll(
    query: Record<string, unknown> = {},
  ): Promise<CollectionDocument[]> {
    return CollectionModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async update(
    id: string,
    updateData: Partial<Collection>,
  ): Promise<CollectionDocument | null> {
    return CollectionModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).exec();
  }

  async delete(id: string): Promise<CollectionDocument | null> {
    return CollectionModel.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true },
    ).exec();
  }
}

import { CollectionRepository } from '../../app/repositories/collection.repository.js';
import { CollectionMapper } from '../../domain/collection/index.js';
import type {
  Collection,
  CollectionResponse,
} from '../../domain/collection/index.js';
import { ConflictError, NotFoundError } from '../../shared/errors/index.js';

export class CollectionService {
  private repository = new CollectionRepository();

  async createCollection(data: Collection): Promise<CollectionResponse> {
    const existing = await this.repository.findBySlug(data.slug);
    if (existing) {
      throw new ConflictError('Collection slug must be unique');
    }

    const created = await this.repository.create(data);
    return CollectionMapper.toResponse(created);
  }

  async getCollection(id: string): Promise<CollectionResponse> {
    const collection = await this.repository.findById(id);
    if (!collection) throw new NotFoundError('Collection not found');
    return CollectionMapper.toResponse(collection);
  }

  async getCollections(activeOnly = false): Promise<CollectionResponse[]> {
    const query = activeOnly ? { isActive: true } : {};
    const collections = await this.repository.findAll(query);
    return collections.map(CollectionMapper.toResponse);
  }

  async updateCollection(
    id: string,
    data: Partial<Collection>,
  ): Promise<CollectionResponse> {
    if (data.slug) {
      const existing = await this.repository.findBySlug(data.slug);
      if (existing && existing._id.toString() !== id) {
        throw new ConflictError('Collection slug must be unique');
      }
    }

    const updated = await this.repository.update(id, data);
    if (!updated) throw new NotFoundError('Collection not found');
    return CollectionMapper.toResponse(updated);
  }

  async deleteCollection(id: string): Promise<CollectionResponse> {
    const collection = await this.repository.findById(id);
    if (!collection) throw new NotFoundError('Collection not found');

    const deleted = await this.repository.delete(id);
    return CollectionMapper.toResponse(deleted!);
  }
}

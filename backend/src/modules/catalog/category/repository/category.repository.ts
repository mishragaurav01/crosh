import { CategoryModel } from '../domain/category.model.js';
import type { Category, CategoryDocument } from '../domain/category.types.js';
import type { ICategoryRepository } from './category.repository.interface.js';

export class CategoryRepository implements ICategoryRepository {
  async create(data: Category): Promise<CategoryDocument> {
    const category = new CategoryModel(data);
    return category.save();
  }

  async findById(id: string): Promise<CategoryDocument | null> {
    return CategoryModel.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<CategoryDocument | null> {
    return CategoryModel.findOne({ slug }).exec();
  }

  async findByName(name: string): Promise<CategoryDocument | null> {
    return CategoryModel.findOne({ name }).exec();
  }

  async findAll(activeOnly = false): Promise<CategoryDocument[]> {
    const query = activeOnly ? { isActive: true } : {};
    return CategoryModel.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .exec();
  }

  async update(
    id: string,
    data: Partial<Category>,
  ): Promise<CategoryDocument | null> {
    return CategoryModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<CategoryDocument | null> {
    return CategoryModel.findByIdAndDelete(id).exec();
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await CategoryModel.countDocuments({ slug }).exec();
    return count > 0;
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await CategoryModel.countDocuments({ name }).exec();
    return count > 0;
  }
}

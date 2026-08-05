import type { Category, CategoryDocument } from '../domain/category.types.js';

export interface ICategoryRepository {
  create(data: Category): Promise<CategoryDocument>;
  findById(id: string): Promise<CategoryDocument | null>;
  findBySlug(slug: string): Promise<CategoryDocument | null>;
  findByName(name: string): Promise<CategoryDocument | null>;
  findAll(activeOnly?: boolean): Promise<CategoryDocument[]>;
  update(id: string, data: Partial<Category>): Promise<CategoryDocument | null>;
  delete(id: string): Promise<CategoryDocument | null>;
  existsBySlug(slug: string): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
}

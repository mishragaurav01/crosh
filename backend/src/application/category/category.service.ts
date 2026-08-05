import { CategoryRepository } from '../../app/repositories/category.repository.js';
import { CategoryMapper } from '../../domain/category/index.js';
import type { Category, CategoryResponse } from '../../domain/category/index.js';
import { ConflictError, NotFoundError } from '../../shared/errors/index.js';

export class CategoryService {
    private repository = new CategoryRepository();

    async createCategory(data: Category): Promise<CategoryResponse> {
        const existing = await this.repository.findBySlug(data.slug);
        if (existing) {
            throw new ConflictError('Category slug must be unique');
        }

        const created = await this.repository.create(data);
        return CategoryMapper.toResponse(created);
    }

    async getCategory(id: string): Promise<CategoryResponse> {
        const category = await this.repository.findById(id);
        if (!category) throw new NotFoundError('Category not found');
        return CategoryMapper.toResponse(category);
    }

    async getCategories(activeOnly = false): Promise<CategoryResponse[]> {
        const query = activeOnly ? { isActive: true } : {};
        const categories = await this.repository.findAll(query);
        return categories.map(CategoryMapper.toResponse);
    }

    async updateCategory(id: string, data: Partial<Category>): Promise<CategoryResponse> {
        if (data.slug) {
            const existing = await this.repository.findBySlug(data.slug);
            if (existing && existing._id.toString() !== id) {
                throw new ConflictError('Category slug must be unique');
            }
        }

        const updated = await this.repository.update(id, data);
        if (!updated) throw new NotFoundError('Category not found');
        return CategoryMapper.toResponse(updated);
    }

    async deleteCategory(id: string): Promise<CategoryResponse> {
        const category = await this.repository.findById(id);
        if (!category) throw new NotFoundError('Category not found');

        const deleted = await this.repository.delete(id);
        return CategoryMapper.toResponse(deleted!);
    }
}

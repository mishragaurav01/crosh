import { CategoryModel } from '../../domain/category/index.js';
import type { Category, CategoryDocument } from '../../domain/category/index.js';

export class CategoryRepository {
    async create(data: Category): Promise<CategoryDocument> {
        const doc = new CategoryModel(data);
        return doc.save();
    }

    async findById(id: string): Promise<CategoryDocument | null> {
        return CategoryModel.findById(id).exec();
    }

    async findBySlug(slug: string): Promise<CategoryDocument | null> {
        return CategoryModel.findOne({ slug }).exec();
    }

    async findAll(query: Record<string, unknown> = {}): Promise<CategoryDocument[]> {
        return CategoryModel.find(query).sort({ sortOrder: 1, createdAt: -1 }).exec();
    }

    async update(id: string, updateData: Partial<Category>): Promise<CategoryDocument | null> {
        return CategoryModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
    }

    async delete(id: string): Promise<CategoryDocument | null> {
        // Soft delete preferred normally, but instructions state 'delete' operation. We will do soft-delete in update if possible, or support standard delete.
        // The requirements say "Soft delete preferred over hard delete" in Service Layer rules.
        return CategoryModel.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true }).exec();
    }
}

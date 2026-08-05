import type { CategoryDocument, CategoryResponse } from './category.types.js';

export class CategoryMapper {
    static toResponse(doc: CategoryDocument): CategoryResponse {
        return {
            id: doc._id.toString(),
            name: doc.name,
            slug: doc.slug,
            description: doc.description,
            image: doc.image,
            isActive: doc.isActive,
            sortOrder: doc.sortOrder,
            seo: doc.seo,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
}

import type { CollectionDocument, CollectionResponse } from './collection.types.js';

export class CollectionMapper {
    static toResponse(doc: CollectionDocument): CollectionResponse {
        return {
            id: doc._id.toString(),
            name: doc.name,
            slug: doc.slug,
            description: doc.description,
            image: doc.image,
            isFeatured: doc.isFeatured,
            isActive: doc.isActive,
            seo: doc.seo,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
}

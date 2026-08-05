import type { ProductDocument, ProductResponse } from './product.types.js';

export class ProductMapper {
    static toResponse(doc: ProductDocument): ProductResponse {
        let categoryMap = doc.category;
        if (doc.category && typeof doc.category === 'object' && '_id' in doc.category) {
            categoryMap = {
                id: doc.category._id.toString(),
                name: doc.category.name,
                slug: doc.category.slug
            };
        } else if (doc.category) {
            categoryMap = doc.category.toString();
        }

        let collectionMap = doc.collectionAssigned;
        if (doc.collectionAssigned && typeof doc.collectionAssigned === 'object' && '_id' in doc.collectionAssigned) {
            collectionMap = {
                id: doc.collectionAssigned._id.toString(),
                name: doc.collectionAssigned.name,
                slug: doc.collectionAssigned.slug
            };
        } else if (doc.collectionAssigned) {
            collectionMap = doc.collectionAssigned.toString();
        }

        return {
            id: doc._id.toString(),
            name: doc.name,
            slug: doc.slug,
            description: doc.description,
            shortDescription: doc.shortDescription,
            category: categoryMap,
            collectionAssigned: collectionMap,
            status: doc.status,
            featured: doc.featured,
            seo: doc.seo,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
}

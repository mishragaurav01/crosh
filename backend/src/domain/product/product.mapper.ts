/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProductDocument, ProductResponse } from './product.types.js';

export class ProductMapper {
    static toResponse(doc: ProductDocument): ProductResponse {
        let categoryMap: any = doc.category;
        if (doc.category && typeof doc.category === 'object' && '_id' in doc.category) {
            const cat = doc.category as any;
            categoryMap = {
                id: cat._id.toString(),
                name: cat.name,
                slug: cat.slug
            };
        } else if (doc.category) {
            categoryMap = doc.category.toString();
        }

        let collectionMap: any = doc.collectionAssigned;
        if (doc.collectionAssigned && typeof doc.collectionAssigned === 'object' && '_id' in doc.collectionAssigned) {
            const col = doc.collectionAssigned as any;
            collectionMap = {
                id: col._id.toString(),
                name: col.name,
                slug: col.slug
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

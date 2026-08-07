import type { ProductDocument, ProductResponse } from './product.types.js';

export class ProductMapper {
  static toResponse(doc: ProductDocument): ProductResponse {
    let categoryMap: Record<string, unknown> | string = doc.category as unknown as string;
    if (
      doc.category &&
      typeof doc.category === 'object' &&
      '_id' in (doc.category as Record<string, unknown>)
    ) {
      const cat = doc.category as Record<string, unknown>;
      categoryMap = {
        id: (cat._id as { toString: () => string })?.toString() || '',
        name: cat.name,
        slug: cat.slug,
      };
    } else if (doc.category) {
      categoryMap = doc.category.toString();
    }

    let collectionMap: Record<string, unknown> | string = doc.collectionAssigned as unknown as string;
    if (
      doc.collectionAssigned &&
      typeof doc.collectionAssigned === 'object' &&
      '_id' in (doc.collectionAssigned as Record<string, unknown>)
    ) {
      const col = doc.collectionAssigned as Record<string, unknown>;
      collectionMap = {
        id: (col._id as { toString: () => string })?.toString() || '',
        name: col.name,
        slug: col.slug,
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

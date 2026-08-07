import type { ProductDocument, ProductResponse } from './product.types.js';

export class ProductMapper {
  static toResponse(doc: ProductDocument): ProductResponse {
    let categoryMap: any = doc.category;
    if (
      doc.category &&
      typeof doc.category === 'object' &&
      '_id' in doc.category
    ) {
      categoryMap = {
        id: (doc.category as any)._id.toString(),
        name: (doc.category as any).name,
        slug: (doc.category as any).slug,
      };
    } else if (doc.category) {
      categoryMap = doc.category.toString();
    }

    let collectionMap: any = doc.collectionAssigned;
    if (
      doc.collectionAssigned &&
      typeof doc.collectionAssigned === 'object' &&
      '_id' in doc.collectionAssigned
    ) {
      collectionMap = {
        id: (doc.collectionAssigned as any)._id.toString(),
        name: (doc.collectionAssigned as any).name,
        slug: (doc.collectionAssigned as any).slug,
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

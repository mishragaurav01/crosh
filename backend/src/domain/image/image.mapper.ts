import type { ImageDocument, ImageResponse } from './image.types.js';

export class ImageMapper {
  static toResponse(doc: ImageDocument): ImageResponse {
    return {
      id: String(doc._id),
      productId: String(doc.productId),
      url: doc.url,
      altText: doc.altText,
      isThumbnail: doc.isThumbnail,
      sortOrder: doc.sortOrder,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}

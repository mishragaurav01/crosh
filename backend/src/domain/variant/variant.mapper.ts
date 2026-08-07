import type { VariantDocument, VariantResponse } from './variant.types.js';

export class VariantMapper {
  static toResponse(variant: VariantDocument): VariantResponse {
    return {
      id: variant._id.toString(),
      productId: variant.productId.toString(),
      sku: variant.sku,
      attributes: variant.attributes,
      barcode: variant.barcode,
      weight: variant.weight,
      dimensions: variant.dimensions,
      status: variant.status,
      createdAt: variant.createdAt,
      updatedAt: variant.updatedAt,
    };
  }
}

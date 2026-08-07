import type { PriceDocument, PriceResponse } from './pricing.types.js';

export class PriceMapper {
  static toResponse(price: PriceDocument): PriceResponse {
    return {
      id: price._id.toString(),
      variantId: price.variantId.toString(),
      currency: price.currency,
      basePrice: price.basePrice,
      salePrice: price.salePrice,
      costPrice: price.costPrice,
      taxClass: price.taxClass,
      discount: price.discount,
      effectiveFrom: price.effectiveFrom,
      effectiveTo: price.effectiveTo,
      createdAt: price.createdAt,
      updatedAt: price.updatedAt,
    };
  }
}

import { PriceRepository } from '../../app/repositories/pricing.repository.js';
import { ValidationError, NotFoundError } from '../../shared/errors/index.js';
import { PriceMapper } from '../../domain/pricing/pricing.mapper.js';
import type { PriceResponse } from '../../domain/pricing/pricing.types.js';

export class PricingService {
  constructor(
    private priceRepository: PriceRepository = new PriceRepository(),
  ) {}

  async getPricesForVariant(variantId: string): Promise<PriceResponse[]> {
    const prices = await this.priceRepository.findByVariantId(variantId);
    return prices.map(PriceMapper.toResponse);
  }

  async setPrice(variantId: string, data: any): Promise<PriceResponse> {
    // Business Rule: One active price per variant per currency
    // Current simplistic implementation: unique index enforced in mongo
    try {
      const price = await this.priceRepository.create({ ...data, variantId });
      return PriceMapper.toResponse(price);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ValidationError('Validation Error');
      }
      throw error;
    }
  }

  async updatePrice(id: string, data: any): Promise<PriceResponse> {
    const price = await this.priceRepository.findById(id);
    if (!price) throw new NotFoundError('Not Found');

    if (
      data.salePrice &&
      data.salePrice > (data.basePrice || price.basePrice)
    ) {
      throw new ValidationError('Validation Error');
    }

    const updated = await this.priceRepository.update(id, data);
    return PriceMapper.toResponse(updated!);
  }

  async removePrice(id: string): Promise<void> {
    const success = await this.priceRepository.delete(id);
    if (!success) throw new NotFoundError('Not Found');
  }
}

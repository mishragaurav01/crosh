import { VariantRepository } from '../../app/repositories/variant.repository.js';
import { InventoryRepository } from '../../app/repositories/inventory.repository.js';
import { ValidationError, NotFoundError } from '../../shared/errors/index.js';
import { VariantMapper } from '../../domain/variant/variant.mapper.js';
import type { VariantResponse } from '../../domain/variant/variant.types.js';

export class VariantService {
  constructor(
    private variantRepository: VariantRepository = new VariantRepository(),
    private inventoryRepository: InventoryRepository = new InventoryRepository(),
  ) {}

  async createVariant(productId: string, data: any): Promise<VariantResponse> {
    const existingSku = await this.variantRepository.findBySku(data.sku);
    if (existingSku) {
      throw new ValidationError('Validation Error');
    }

    const variant = await this.variantRepository.create({ ...data, productId });

    // Auto-create empty inventory for the variant
    await this.inventoryRepository.create({
      variantId: variant._id as unknown as string,
      quantity: 0,
      reservedQuantity: 0,
      availableQuantity: 0,
    });

    return VariantMapper.toResponse(variant);
  }

  async getVariantsByProductId(productId: string): Promise<VariantResponse[]> {
    const variants = await this.variantRepository.findByProductId(productId);
    return variants.map(VariantMapper.toResponse);
  }

  async updateVariant(id: string, data: any): Promise<VariantResponse> {
    if (data.sku) {
      const existingSku = await this.variantRepository.findBySku(data.sku);
      if (existingSku && existingSku._id.toString() !== id) {
        throw new ValidationError('Validation Error');
      }
    }

    const variant = await this.variantRepository.update(id, data);
    if (!variant) throw new NotFoundError('Not Found');

    return VariantMapper.toResponse(variant);
  }

  async archiveVariant(id: string): Promise<void> {
    const variant = await this.variantRepository.softDelete(id);
    if (!variant) throw new NotFoundError('Not Found');
  }
}

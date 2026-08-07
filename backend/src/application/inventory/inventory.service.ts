import { InventoryRepository } from '../../app/repositories/inventory.repository.js';
import { ValidationError, NotFoundError } from '../../shared/errors/index.js';
import { InventoryMapper } from '../../domain/inventory/inventory.mapper.js';
import type { InventoryResponse } from '../../domain/inventory/inventory.types.js';

export class InventoryService {
  constructor(
    private inventoryRepository: InventoryRepository = new InventoryRepository(),
  ) {}

  async getInventory(variantId: string): Promise<InventoryResponse> {
    const inventory = await this.inventoryRepository.findByVariantId(variantId);
    if (!inventory) throw new NotFoundError('Not Found');
    return InventoryMapper.toResponse(inventory);
  }

  async addStock(
    variantId: string,
    amount: number,
  ): Promise<InventoryResponse> {
    if (amount <= 0) throw new ValidationError('Validation Error');
    const inventory = await this.inventoryRepository.findByVariantId(variantId);
    if (!inventory) throw new NotFoundError('Not Found');

    inventory.quantity += amount;
    await inventory.save(); // Utilizing pre-save hook for availableQuantity
    return InventoryMapper.toResponse(inventory);
  }

  async reserveStock(
    variantId: string,
    amount: number,
  ): Promise<InventoryResponse> {
    if (amount <= 0) throw new ValidationError('Validation Error');
    const inventory = await this.inventoryRepository.findByVariantId(variantId);
    if (!inventory) throw new NotFoundError('Not Found');

    if (inventory.availableQuantity < amount && !inventory.allowBackorder) {
      throw new ValidationError('Validation Error');
    }

    inventory.reservedQuantity += amount;
    await inventory.save();
    return InventoryMapper.toResponse(inventory);
  }

  async releaseStock(
    variantId: string,
    amount: number,
  ): Promise<InventoryResponse> {
    if (amount <= 0) throw new ValidationError('Validation Error');
    const inventory = await this.inventoryRepository.findByVariantId(variantId);
    if (!inventory) throw new NotFoundError('Not Found');

    if (inventory.reservedQuantity < amount) {
      throw new ValidationError('Validation Error');
    }

    inventory.reservedQuantity -= amount;
    await inventory.save();
    return InventoryMapper.toResponse(inventory);
  }

  async adjustStock(
    variantId: string,
    quantity: number,
  ): Promise<InventoryResponse> {
    if (quantity < 0) throw new ValidationError('Validation Error');
    const inventory = await this.inventoryRepository.findByVariantId(variantId);
    if (!inventory) throw new NotFoundError('Not Found');

    if (quantity < inventory.reservedQuantity) {
      throw new ValidationError('Validation Error');
    }

    inventory.quantity = quantity;
    await inventory.save();
    return InventoryMapper.toResponse(inventory);
  }
}

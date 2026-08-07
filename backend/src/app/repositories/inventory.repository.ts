import { InventoryModel } from '../../domain/inventory/inventory.schema.js';
import type { InventoryDocument } from '../../domain/inventory/inventory.types.js';

export class InventoryRepository {
  async create(data: Partial<InventoryDocument>): Promise<InventoryDocument> {
    const inventory = new InventoryModel(data);
    return await inventory.save();
  }

  async findByVariantId(variantId: string): Promise<InventoryDocument | null> {
    return await InventoryModel.findOne({ variantId });
  }

  async update(
    variantId: string,
    data: Partial<InventoryDocument>,
  ): Promise<InventoryDocument | null> {
    return await InventoryModel.findOneAndUpdate({ variantId }, data, {
      new: true,
    });
  }
}

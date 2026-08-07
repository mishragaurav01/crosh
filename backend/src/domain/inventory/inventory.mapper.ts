import type {
  InventoryDocument,
  InventoryResponse,
} from './inventory.types.js';

export class InventoryMapper {
  static toResponse(inventory: InventoryDocument): InventoryResponse {
    return {
      id: inventory._id.toString(),
      variantId: inventory.variantId.toString(),
      quantity: inventory.quantity,
      reservedQuantity: inventory.reservedQuantity,
      availableQuantity: inventory.availableQuantity,
      lowStockThreshold: inventory.lowStockThreshold,
      trackInventory: inventory.trackInventory,
      allowBackorder: inventory.allowBackorder,
      createdAt: inventory.createdAt,
      updatedAt: inventory.updatedAt,
    };
  }
}

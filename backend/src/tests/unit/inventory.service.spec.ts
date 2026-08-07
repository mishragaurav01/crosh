import { describe, it, expect, beforeEach } from 'vitest';
import { InventoryService } from '../../application/inventory/inventory.service.js';
import { ValidationError } from '../../shared/errors/index.js';

describe('Inventory Calculations', () => {
  let service: InventoryService;
  let mockRepo: any;
  let fakeInventory: any;

  beforeEach(() => {
    fakeInventory = {
      variantId: '123',
      quantity: 100,
      reservedQuantity: 20,
      availableQuantity: 80,
      allowBackorder: false,
      save: async function () {
        this.availableQuantity = this.quantity - this.reservedQuantity;
        if (this.availableQuantity < 0) throw new Error('Cannot be negative');
      },
    };

    mockRepo = {
      findByVariantId: async () => fakeInventory,
    };

    service = new InventoryService(mockRepo as any);
  });

  it('should correctly add stock', async () => {
    await service.addStock('123', 50);
    expect(fakeInventory.quantity).toBe(150);
    expect(fakeInventory.availableQuantity).toBe(130);
  });

  it('should correctly reserve stock if available', async () => {
    await service.reserveStock('123', 30);
    expect(fakeInventory.reservedQuantity).toBe(50);
    expect(fakeInventory.availableQuantity).toBe(50);
  });

  it('should throw error if reserving more than available and no backorder', async () => {
    await expect(service.reserveStock('123', 90)).rejects.toThrow(
      ValidationError,
    );
  });

  it('should release reserved stock', async () => {
    await service.releaseStock('123', 10);
    expect(fakeInventory.reservedQuantity).toBe(10);
    expect(fakeInventory.availableQuantity).toBe(90);
  });

  it('should adjust exact stock', async () => {
    await service.adjustStock('123', 200);
    expect(fakeInventory.quantity).toBe(200);
    expect(fakeInventory.availableQuantity).toBe(180);
  });
});

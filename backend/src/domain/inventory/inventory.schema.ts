import mongoose, { Schema } from 'mongoose';
import type { InventoryDocument } from './inventory.types.js';

const inventorySchema = new Schema<InventoryDocument>(
  {
    variantId: {
      type: Schema.Types.ObjectId,
      ref: 'Variant',
      required: true,
      unique: true,
      index: true,
    },
    quantity: { type: Number, required: true, default: 0, min: 0 },
    reservedQuantity: { type: Number, required: true, default: 0, min: 0 },
    availableQuantity: { type: Number, required: true, default: 0, min: 0 },
    lowStockThreshold: { type: Number, required: true, default: 5, min: 0 },
    trackInventory: { type: Boolean, required: true, default: true },
    allowBackorder: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

// Pre-save hook to ensure available quantity relates to quantity and reserved
inventorySchema.pre('save', async function () {
  const doc = this as unknown as InventoryDocument;
  if (doc.isModified('quantity') || doc.isModified('reservedQuantity')) {
    doc.availableQuantity = doc.quantity - doc.reservedQuantity;
  }
  if (doc.availableQuantity < 0) {
    throw new Error('Available quantity cannot be negative');
  }
});

export const InventoryModel = mongoose.model<InventoryDocument>(
  'Inventory',
  inventorySchema,
);

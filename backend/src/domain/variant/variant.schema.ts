import mongoose, { Schema } from 'mongoose';
import type { VariantDocument } from './variant.types.js';

const variantSchema = new Schema<VariantDocument>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    sku: { type: String, required: true, unique: true, index: true },
    attributes: {
      color: { type: String },
      size: { type: String },
    },
    barcode: { type: String },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      unit: { type: String, default: 'cm' },
    },
    status: {
      type: String,
      enum: ['Active', 'Draft', 'Archived'],
      default: 'Active',
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const VariantModel = mongoose.model<VariantDocument>(
  'Variant',
  variantSchema,
);

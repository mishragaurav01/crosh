import mongoose, { Schema } from 'mongoose';
import type { PriceDocument } from './pricing.types.js';

const priceSchema = new Schema<PriceDocument>(
  {
    variantId: {
      type: Schema.Types.ObjectId,
      ref: 'Variant',
      required: true,
      index: true,
    },
    currency: { type: String, required: true, default: 'INR' }, // Adjust default based on market
    basePrice: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    costPrice: { type: Number, min: 0 },
    taxClass: { type: String },
    discount: { type: Number, min: 0, max: 100 }, // Percentage
    effectiveFrom: { type: Date },
    effectiveTo: { type: Date },
  },
  { timestamps: true },
);

// One active price per variant per currency
// Actually it's complex to enforce unique active via just index if using effective dates, but for now we unique variantId+currency
priceSchema.index({ variantId: 1, currency: 1 }, { unique: true });

// Validate business logic
priceSchema.pre('save', function (next: any) {
  if (this.salePrice !== undefined && this.salePrice > this.basePrice) {
    // @ts-ignore
    return next(new Error('Sale price cannot be greater than base price'));
  }
  if (this.costPrice !== undefined && this.costPrice < 0) {
    // @ts-ignore
    return next(new Error('Cost price cannot be negative'));
  }
  // @ts-ignore
  next();
});

export const PriceModel = mongoose.model<PriceDocument>('Price', priceSchema);

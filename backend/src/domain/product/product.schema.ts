import { Schema, model } from 'mongoose';
import type { ProductDocument } from './product.types.js';

export const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: { type: String },
    shortDescription: { type: String, maxlength: 250 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    collectionAssigned: { type: Schema.Types.ObjectId, ref: 'Collection' }, // aliased physically to match requested concept
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Archived'],
      default: 'Draft',
    },
    featured: { type: Boolean, default: false },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true },
);

export const ProductModel = model<ProductDocument>('Product', productSchema);

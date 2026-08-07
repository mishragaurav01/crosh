import { Schema, model } from 'mongoose';
import type { CollectionDocument } from './collection.types.js';

export const collectionSchema = new Schema<CollectionDocument>(
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
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true },
);

export const CollectionModel = model<CollectionDocument>(
  'Collection',
  collectionSchema,
);

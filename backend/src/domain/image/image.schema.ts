import { Schema, model } from 'mongoose';
import type { ImageDocument } from './image.types.js';

export const imageSchema = new Schema<ImageDocument>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    url: { type: String, required: true },
    altText: { type: String, maxlength: 255 },
    isThumbnail: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Active', 'Archived'],
      default: 'Active',
    },
  },
  { timestamps: true },
);

// We need index on productId and sortOrder to retrieve them sorted cleanly
imageSchema.index({ productId: 1, sortOrder: 1 });

export const ImageModel = model<ImageDocument>('Image', imageSchema);

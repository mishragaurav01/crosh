import { Schema, model } from 'mongoose';
import { CATEGORY_CONSTANTS } from './category.constants.js';

export const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: CATEGORY_CONSTANTS.MAX_NAME_LENGTH,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH,
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: CATEGORY_CONSTANTS.DEFAULT_SORT_ORDER,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.index({ sortOrder: 1, createdAt: -1 });

export const CategoryModel = model('Category', categorySchema);

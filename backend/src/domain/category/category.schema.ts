import { Schema, model } from 'mongoose';
import type { CategoryDocument } from './category.types.js';

export const categorySchema = new Schema<CategoryDocument>({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: [{ type: String }]
    }
}, { timestamps: true });

export const CategoryModel = model<CategoryDocument>('Category', categorySchema);

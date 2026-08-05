import type { InferSchemaType, HydratedDocument } from 'mongoose';
import type { categorySchema } from './category.model.js';

export type Category = InferSchemaType<typeof categorySchema>;
export type CategoryDocument = HydratedDocument<Category>;

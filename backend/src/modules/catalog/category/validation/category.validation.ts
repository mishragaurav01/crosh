import { z } from 'zod';
import { CATEGORY_CONSTANTS } from '../domain/category.constants.js';

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(
      CATEGORY_CONSTANTS.MAX_NAME_LENGTH,
      `Name cannot exceed ${CATEGORY_CONSTANTS.MAX_NAME_LENGTH} characters`,
    )
    .trim(),
  slug: z.string().min(1, 'Slug is required').trim().toLowerCase(),
  description: z
    .string()
    .max(
      CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH,
      `Description cannot exceed ${CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`,
    )
    .trim()
    .optional(),
  image: z.string().trim().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

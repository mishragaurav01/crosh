import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim(),
    slug: z.string().min(1, 'Slug is required').trim().toLowerCase(),
    description: z.string().optional(),
    image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    isActive: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional()
    }).optional()
  })
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).trim().optional(),
    slug: z.string().min(1).trim().toLowerCase().optional(),
    description: z.string().optional(),
    image: z.string().url().optional().or(z.literal('')),
    isActive: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional()
    }).optional()
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID')
  })
});

export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID')
  })
});

import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim(),
    slug: z.string().min(1, 'Slug is required').trim().toLowerCase(),
    description: z.string().optional(),
    shortDescription: z.string().max(250).optional(),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Category ID'),
    collectionAssigned: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Collection ID')
      .optional(),
    status: z.enum(['Draft', 'Active', 'Archived']).optional(),
    featured: z.boolean().optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).trim().optional(),
    slug: z.string().min(1).trim().toLowerCase().optional(),
    description: z.string().optional(),
    shortDescription: z.string().max(250).optional(),
    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .optional(),
    collectionAssigned: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .optional(),
    status: z.enum(['Draft', 'Active', 'Archived']).optional(),
    featured: z.boolean().optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
  }),
});

export const productIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
  }),
});

export const productSlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});

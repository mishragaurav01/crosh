import { z } from 'zod';

export const createPriceSchema = z.object({
  body: z.object({
    variantId: z.string().length(24), // ObjectId
    currency: z.string().min(2).max(5).default('INR'),
    basePrice: z.number().nonnegative(),
    salePrice: z.number().nonnegative().optional(),
    costPrice: z.number().nonnegative().optional(),
    taxClass: z.string().optional(),
    discount: z.number().min(0).max(100).optional(),
    effectiveFrom: z.string().datetime().optional(),
    effectiveTo: z.string().datetime().optional(),
  }),
});

export const updatePriceSchema = z.object({
  body: z.object({
    currency: z.string().min(2).max(5).optional(),
    basePrice: z.number().nonnegative().optional(),
    salePrice: z.number().nonnegative().optional(),
    costPrice: z.number().nonnegative().optional(),
    taxClass: z.string().optional(),
    discount: z.number().min(0).max(100).optional(),
    effectiveFrom: z.string().datetime().optional(),
    effectiveTo: z.string().datetime().optional(),
  }),
});

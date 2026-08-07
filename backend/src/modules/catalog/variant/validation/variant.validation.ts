import { z } from 'zod';

export const createVariantSchema = z.object({
  body: z.object({
    sku: z.string().min(3),
    attributes: z
      .object({
        color: z.string().optional(),
        size: z.string().optional(),
      })
      .passthrough()
      .optional(),
    barcode: z.string().optional(),
    weight: z.number().nonnegative().optional(),
    dimensions: z
      .object({
        length: z.number().nonnegative().optional(),
        width: z.number().nonnegative().optional(),
        height: z.number().nonnegative().optional(),
        unit: z.string().optional(),
      })
      .optional(),
    status: z.enum(['Active', 'Draft', 'Archived']).optional(),
  }),
});

export const updateVariantSchema = z.object({
  body: z.object({
    sku: z.string().min(3).optional(),
    attributes: z
      .object({
        color: z.string().optional(),
        size: z.string().optional(),
      })
      .passthrough()
      .optional(),
    barcode: z.string().optional(),
    weight: z.number().nonnegative().optional(),
    dimensions: z
      .object({
        length: z.number().nonnegative().optional(),
        width: z.number().nonnegative().optional(),
        height: z.number().nonnegative().optional(),
        unit: z.string().optional(),
      })
      .optional(),
    status: z.enum(['Active', 'Draft', 'Archived']).optional(),
  }),
});

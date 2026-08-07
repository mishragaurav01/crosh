import { z } from 'zod';

const stockChangeSchema = z.object({
  body: z.object({
    amount: z.number().int().positive(),
  }),
});

const stockAdjustSchema = z.object({
  body: z.object({
    quantity: z.number().int().nonnegative(),
  }),
});

export { stockChangeSchema, stockAdjustSchema };

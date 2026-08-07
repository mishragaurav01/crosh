import { z } from 'zod';

export const addItemSchema = z.object({
    body: z.object({
        productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
        variantId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Variant ID'),
        quantity: z.number().int().min(1)
    }),
});

export const updateItemSchema = z.object({
    params: z.object({
        itemId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Variant ID'),
    }),
    body: z.object({
        quantity: z.number().int().min(0) // 0 implies remove
    }),
});

export const removeItemSchema = z.object({
    params: z.object({
        itemId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Variant ID'),
    })
});

export const applyCouponSchema = z.object({
    body: z.object({
        code: z.string().min(1)
    })
});

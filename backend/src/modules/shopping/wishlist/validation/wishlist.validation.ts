import { z } from 'zod';

export const addWishlistSchema = z.object({
    body: z.object({
        productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
    }),
});

export const removeWishlistSchema = z.object({
    params: z.object({
        productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
    }),
});

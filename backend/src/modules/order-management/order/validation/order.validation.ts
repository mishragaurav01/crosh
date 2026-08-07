import { z } from 'zod';

export const orderParamsSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Order ID')
    })
});

export const updateOrderStatusSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Order ID')
    }),
    body: z.object({
        status: z.enum(['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Refunded'])
    })
});

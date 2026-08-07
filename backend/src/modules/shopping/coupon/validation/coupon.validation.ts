import { z } from 'zod';

export const createCouponSchema = z.object({
    body: z.object({
        code: z.string().min(3).max(20).toUpperCase(),
        type: z.enum(['Percentage', 'FixedAmount']),
        value: z.number().positive(),
        minOrderAmount: z.number().min(0).optional(),
        usageLimit: z.number().int().positive().optional(),
        expiresAt: z.string().datetime().optional()
    })
});

export const updateCouponSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
    }),
    body: z.object({
        code: z.string().min(3).max(20).toUpperCase().optional(),
        type: z.enum(['Percentage', 'FixedAmount']).optional(),
        value: z.number().positive().optional(),
        minOrderAmount: z.number().min(0).optional(),
        usageLimit: z.number().int().positive().optional(),
        expiresAt: z.string().datetime().optional(),
        isActive: z.boolean().optional()
    })
});

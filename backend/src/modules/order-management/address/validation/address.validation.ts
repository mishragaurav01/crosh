import { z } from 'zod';

export const addressSchema = z.object({
    body: z.object({
        fullName: z.string().min(2),
        phoneNumber: z.string().min(5),
        street1: z.string().min(5),
        street2: z.string().optional(),
        city: z.string().min(2),
        state: z.string().min(2),
        postalCode: z.string().min(2),
        country: z.string().min(2),
        isDefault: z.boolean().optional()
    })
});

export const updateAddressSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID')
    }),
    body: z.object({
        fullName: z.string().min(2).optional(),
        phoneNumber: z.string().min(5).optional(),
        street1: z.string().min(5).optional(),
        street2: z.string().optional(),
        city: z.string().min(2).optional(),
        state: z.string().min(2).optional(),
        postalCode: z.string().min(2).optional(),
        country: z.string().min(2).optional(),
        isDefault: z.boolean().optional()
    })
});

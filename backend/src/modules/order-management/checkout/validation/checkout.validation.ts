import { z } from 'zod';

export const checkoutSchema = z.object({
    body: z.object({
        addressId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Address ID')
    })
});

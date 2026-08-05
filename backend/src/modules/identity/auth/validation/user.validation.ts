import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z
    .object({
      firstName: z
        .string()
        .min(1, 'First name cannot be empty')
        .trim()
        .optional(),
      lastName: z
        .string()
        .min(1, 'Last name cannot be empty')
        .trim()
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
});

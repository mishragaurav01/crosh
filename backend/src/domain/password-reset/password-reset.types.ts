import type { InferSchemaType, HydratedDocument } from 'mongoose';
import type { passwordResetSchema } from './password-reset.schema.js';

export type PasswordReset = InferSchemaType<typeof passwordResetSchema>;
export type PasswordResetDocument = HydratedDocument<PasswordReset>;

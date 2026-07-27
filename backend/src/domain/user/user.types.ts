import type { InferSchemaType, HydratedDocument } from 'mongoose';
import type { userSchema } from './user.schema.js';

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;

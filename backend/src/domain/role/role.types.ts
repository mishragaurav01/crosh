import type { InferSchemaType, HydratedDocument } from 'mongoose';
import type { roleSchema } from './role.schema.js';

export type Role = InferSchemaType<typeof roleSchema>;
export type RoleDocument = HydratedDocument<Role>;

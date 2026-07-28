import type { InferSchemaType, HydratedDocument } from 'mongoose';
import type { permissionSchema } from './permission.schema.js';

export type Permission = InferSchemaType<typeof permissionSchema>;
export type PermissionDocument = HydratedDocument<Permission>;

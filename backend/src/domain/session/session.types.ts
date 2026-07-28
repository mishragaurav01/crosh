import type { InferSchemaType, HydratedDocument } from 'mongoose';
import type { sessionSchema } from './session.schema.js';

export type Session = InferSchemaType<typeof sessionSchema>;
export type SessionDocument = HydratedDocument<Session>;

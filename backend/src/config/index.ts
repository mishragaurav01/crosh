import { config as loadEnv } from 'dotenv';
import { z } from 'zod';
import { logger } from '../shared/logger/index.js';

// Load environment variables from .env file
loadEnv();

// Define schema for environment variables
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().url(),
});

// Validate process.env against schema
const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  logger.error('❌ Invalid environment variables:', parseResult.error.format());
  process.exit(1);
}

// Expose a single immutable configuration object
export const config = Object.freeze({
  nodeEnv: parseResult.data.NODE_ENV,
  port: parseResult.data.PORT,
  mongoUri: parseResult.data.MONGODB_URI,
});

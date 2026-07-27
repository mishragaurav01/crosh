import mongoose from 'mongoose';
import { config } from '../config/index.js';
import { logger } from '../shared/logger/index.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    logger.info('Attempting database connection...');
    await mongoose.connect(config.mongoUri);
    logger.info('Successful connection.');
  } catch (error) {
    logger.error('Failed connection.', error);
    process.exit(1);
  }
};

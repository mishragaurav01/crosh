import type { Server } from 'http';
import mongoose from 'mongoose';
import { logger } from './logger/index.js';

export const setupGracefulShutdown = (server: Server): void => {
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Graceful shutdown started.`);

    try {
      // Close HTTP server stopping new connections
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      logger.info('HTTP server closed.');

      // Close MongoDB connection cleanly
      await mongoose.connection.close();
      logger.info('MongoDB connection closed.');

      logger.info('Graceful shutdown completed successfully.');
      process.exit(0);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  };

  // Register signal events
  process.on('SIGINT', () => {
    shutdown('SIGINT');
  });

  process.on('SIGTERM', () => {
    shutdown('SIGTERM');
  });
};

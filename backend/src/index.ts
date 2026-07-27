import { app } from './app/app.js';
import { config } from './config/index.js';
import { logger } from './shared/logger/index.js';
import { connectDatabase } from './database/index.js';
import { setupGracefulShutdown } from './shared/shutdown.js';

const bootstrap = async (): Promise<void> => {
  try {
    await connectDatabase();

    const server = app.listen(config.port, () => {
      logger.info(
        `Crosh Backend is running at http://localhost:${config.port} in ${config.nodeEnv} mode.`,
      );
    });

    setupGracefulShutdown(server);
  } catch (error) {
    logger.error('Failed to bootstrap application.', error);
    process.exit(1);
  }
};

bootstrap();

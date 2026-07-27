import { app } from './app/app.js';
import { config } from './config/index.js';
import { logger } from './shared/logger/index.js';
import { connectDatabase } from './database/index.js';

const bootstrap = async (): Promise<void> => {
  await connectDatabase();

  app.listen(config.port, () => {
    logger.info(
      `Crosh Backend is running at http://localhost:${config.port} in ${config.nodeEnv} mode.`,
    );
  });
};

bootstrap();

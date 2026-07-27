import type { Request, Response, NextFunction } from 'express';
import { logger } from '../../shared/logger/index.js';

// Express strictly identifies error middlewares by their 4-arity signature
export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(err);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

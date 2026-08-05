import type { Request, Response, NextFunction } from 'express';
import { logger } from '../../shared/logger/index.js';

import {
  AuthenticationError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from '../../shared/errors/index.js';

// Express strictly identifies error middlewares by their 4-arity signature
export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ValidationError) {
    res.status(400).json({ success: false, message: err.message });
    return;
  }
  if (err instanceof AuthenticationError) {
    res
      .status(401)
      .json({ success: false, message: err.message || 'Unauthorized' });
    return;
  }
  if (err instanceof ForbiddenError) {
    res
      .status(403)
      .json({ success: false, message: err.message || 'Forbidden' });
    return;
  }
  if (err instanceof NotFoundError) {
    res.status(404).json({ success: false, message: err.message });
    return;
  }
  if (err instanceof ConflictError) {
    res.status(409).json({ success: false, message: err.message });
    return;
  }

  logger.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

import type { Request, Response, NextFunction } from 'express';
import type { z } from 'zod';
import { ZodError } from 'zod';
import { ValidationError } from '../../shared/errors/index.js';

export const validateRequest =
  (schema: z.ZodSchema) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues
          .map(
            (issue: z.ZodIssue) => `${issue.path.join('.')}: ${issue.message}`,
          )
          .join(', ');
        next(new ValidationError(errorMessages));
      } else {
        next(error);
      }
    }
  };

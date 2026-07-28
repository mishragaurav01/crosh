import type { Request, Response, NextFunction } from 'express';
import { AuthorizationService } from '../../../application/authorization/index.js';
import { ForbiddenError } from '../../../shared/errors/index.js';

export const requireRole = (roleName: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new ForbiddenError();
      }

      const authService = new AuthorizationService();
      const hasRole = authService.hasRole(req.user, roleName);

      if (!hasRole) {
        throw new ForbiddenError();
      }

      next();
    } catch (error) {
      next(error instanceof ForbiddenError ? error : new ForbiddenError());
    }
  };
};

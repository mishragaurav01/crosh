import type { Request, Response, NextFunction } from 'express';
import { AuthorizationService } from '../../../application/authorization/index.js';
import { ForbiddenError } from '../../../shared/errors/index.js';

export const requirePermission = (permissionName: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new ForbiddenError();
      }

      const authService = new AuthorizationService();
      const hasPermission = await authService.hasPermission(
        req.user.id,
        permissionName,
      );

      if (!hasPermission) {
        throw new ForbiddenError();
      }

      next();
    } catch (error) {
      next(error instanceof ForbiddenError ? error : new ForbiddenError());
    }
  };
};

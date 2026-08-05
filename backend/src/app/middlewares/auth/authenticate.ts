import type { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../../../shared/errors/index.js';
import { JwtUtility } from '../../../domain/auth/index.js';
import { UserRepository } from '../../repositories/user.repository.js';
import type { RoleDocument } from '../../../domain/role/index.js';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token = req.cookies?.accessToken;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      throw new AuthenticationError();
    }

    let decoded;
    try {
      decoded = JwtUtility.verifyToken(token);
    } catch {
      throw new AuthenticationError();
    }

    const userRepository = new UserRepository();
    const user = await userRepository.findWithRoles(decoded.userId);

    if (!user || user.isActive === false) {
      throw new AuthenticationError();
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      roles: (user.roles as unknown as RoleDocument[]).map((r) => ({
        id: r._id.toString(),
        name: r.name,
      })),
    };

    next();
  } catch (error) {
    next(
      error instanceof AuthenticationError ? error : new AuthenticationError(),
    );
  }
};

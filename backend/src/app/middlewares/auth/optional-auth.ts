import { Request, Response, NextFunction } from 'express';
import { JwtUtility } from '../../../domain/auth/index.js';
import { UserRepository } from '../../repositories/user.repository.js';
import { AuthenticationError } from '../../../shared/errors/index.js';
import type { RoleDocument } from '../../../domain/role/index.js';

export const optionalAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(); // Pass through for guest
        }

        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = JwtUtility.verifyToken(token);
        } catch {
            return next(); // invalid token treated as guest
        }

        const userRepo = new UserRepository();
        const user = await userRepo.findWithRoles(decoded.userId);

        if (!user || !user.isActive) {
            return next(); // invalid user, just treat as guest
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
        return next();
    }
};

import { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../../../application/auth/auth.service.js';
import { SessionRepository } from '../../../app/repositories/session.repository.js';
import { UserRepository } from '../../../app/repositories/user.repository.js';
import { AuthenticationError } from '../../../shared/errors/index.js';

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
        const sessionRepo = new SessionRepository();
        const userRepo = new UserRepository();
        const authService = new AuthenticationService(userRepo, sessionRepo);

        const payload = authService.verifyAccessToken(token);

        const user = await userRepo.findById(payload.userId);
        if (!user || !user.isActive) {
            return next(); // invalid user, just treat as guest
        }

        const roles = await userRepo.getUserRoles(user._id.toString());
        req.user = {
            id: user._id.toString(),
            email: user.email,
            roles: roles.map((r: any) => ({
                id: r._id.toString(),
                name: r.name,
                permissions: r.permissions.map((p: any) => ({
                    id: p._id.toString(),
                    name: p.name,
                    resource: p.resource,
                    action: p.action,
                })),
            })),
        };

        next();
    } catch (error) {
        if (error instanceof AuthenticationError) {
            // if token is simply expired or invalid, treat as missing/guest
            return next();
        }
        next(error);
    }
};

import type { AuthenticatedUser } from '../../app/middlewares/auth/auth.types.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

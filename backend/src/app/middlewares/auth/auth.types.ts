import type { RoleSummary } from '../../../domain/auth/index.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: RoleSummary[];
}

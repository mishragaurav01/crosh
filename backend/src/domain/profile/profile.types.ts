import type { RoleSummary } from '../auth/index.js';

export interface UserProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  roles: RoleSummary[];
  createdAt: Date;
}

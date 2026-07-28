import type { SessionDocument } from './session.types.js';

export interface SessionResponse {
  id: string;
  userId: string;
  device?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  expiresAt: Date;
  revoked: boolean;
  createdAt: Date;
}

export class SessionMapper {
  static toResponse(session: SessionDocument): SessionResponse {
    return {
      id: session._id.toString(),
      userId: session.user.toString(),
      device: session.device,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      expiresAt: session.expiresAt as Date,
      revoked: session.revoked,
      createdAt: session.createdAt as Date,
    };
  }
}

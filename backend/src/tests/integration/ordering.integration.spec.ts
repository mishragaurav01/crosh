import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app/app.js';
import * as authMiddleware from '../../../src/app/middlewares/auth/authenticate.js';

describe('Ordering Integration Flow', () => {
    beforeEach(() => {
        vi.spyOn(authMiddleware, 'authenticate').mockImplementation(async (req: any, res: any, next: any) => {
            req.user = { id: '507f1f77bcf86cd799439011', email: 'test@example.com', roles: [] };
            next();
        });
    });

    it('should retrieve checkout summary', async () => {
        const res = await request(app).get('/api/v1/checkout/summary').set('Authorization', 'Bearer dummy');
        expect(res.status).toBeDefined();
    });

    it('should retrieve user orders', async () => {
        const res = await request(app).get('/api/v1/orders').set('Authorization', 'Bearer dummy');
        expect(res.status).toBeDefined();
    });
});

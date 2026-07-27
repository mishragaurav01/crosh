import { Router } from 'express';

const healthRoute = Router();

healthRoute.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

healthRoute.get('/health/error', () => {
  throw new Error('Test error');
});

export { healthRoute };

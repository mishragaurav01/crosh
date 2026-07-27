import express from 'express';
import { healthRoute } from './routes/health.route.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

const app = express();

// Apply JSON body parsing middleware
app.use(express.json());

// Register routes
app.use('/', healthRoute);

// 404 Handler (must be registered after all functional routes)
app.use(notFoundHandler);

// Global Error Handler (must be registered absolutely last)
app.use(globalErrorHandler);

export { app };

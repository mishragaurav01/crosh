import express from 'express';
import { healthRoute } from './routes/health.route.js';
import { authRoutes } from '../modules/identity/auth/routes/auth.routes.js';
import { userRoutes } from '../modules/identity/auth/routes/user.routes.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

import cookieParser from 'cookie-parser';
import { setupSwagger } from '../shared/config/swagger.js';

const app = express();

// Apply JSON body parsing middleware
app.use(express.json());

// Apply Cookie parsing middleware
app.use(cookieParser());

// Initialize Swagger Documentation
setupSwagger(app);

// Register routes
app.use('/', healthRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// 404 Handler (must be registered after all functional routes)
app.use(notFoundHandler);

// Global Error Handler (must be registered absolutely last)
app.use(globalErrorHandler);

export { app };

import express from 'express';
import { healthRoute } from './routes/health.route.js';
import { authRoutes } from '../modules/identity/auth/routes/auth.routes.js';
import { userRoutes } from '../modules/identity/auth/routes/user.routes.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import { setupSwagger } from '../shared/config/swagger.js';

const app = express();

// Apply CORS allowing frontend (credentials true)
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    credentials: true,
  }),
);

// Apply JSON body parsing middleware
app.use(express.json());

// Apply Cookie parsing middleware
app.use(cookieParser());

// Initialize Swagger Documentation
setupSwagger(app);

import { categoryRoutes } from '../modules/catalog/category/routes/category.routes.js';
import { collectionRoutes } from '../modules/catalog/collection/routes/collection.routes.js';
import { productRoutes } from '../modules/catalog/product/routes/product.routes.js';
import { variantRoutes } from '../modules/catalog/variant/routes/variant.routes.js';
import { inventoryRoutes } from '../modules/catalog/inventory/routes/inventory.routes.js';
import { pricingRoutes } from '../modules/catalog/pricing/routes/pricing.routes.js';

// Register routes
app.use('/', healthRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/collections', collectionRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1', variantRoutes); // Since variant routes bind to both /products/:id/variants and /variants/:id
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/pricing', pricingRoutes);

// 404 Handler (must be registered after all functional routes)
app.use(notFoundHandler);

// Global Error Handler (must be registered absolutely last)
app.use(globalErrorHandler);

export { app };

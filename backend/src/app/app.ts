import express from 'express';
import { healthRoute } from './routes/health.route.js';

const app = express();

// Apply JSON body parsing middleware
app.use(express.json());

// Register routes
app.use('/', healthRoute);

export { app };

import express from 'express';
import { config } from './config/index.js';

const app = express();
const PORT = config.port;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.info(`Server is running at http://localhost:${PORT}`);
});

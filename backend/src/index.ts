import { app } from './app/app.js';
import { config } from './config/index.js';

app.listen(config.port, () => {
  console.info(`Server is running at http://localhost:${config.port}`);
});

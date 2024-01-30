import './app/helpers/env.load.js';
import { createServer } from 'http';
import app from './app/index.app.js';
import logger from './app/helpers/logger.js';

const PORT = process.env.PORT || 8082;
const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

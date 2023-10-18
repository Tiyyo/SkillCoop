import { createServer } from 'http';
import logger from './app/helpers/logger';
import './app/helpers/env.load.ts';
import app from './app/index.app';
import init from './app/service/chat/chat'

const PORT = process.env.PORT || 8080;

const server = createServer(app);
init(server, {
  cors: {
    origin: "*"
  }
})

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
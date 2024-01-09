import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router/main.router';
import accesHttp from './middleware/acces-http';
import logger from './helpers/logger';

const app: express.Application = express();

app.use(accesHttp);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5004',
      ' http://13.36.166.35:5004',
      process.env.CLIENT_PROD_URL as string,
    ],
  }),
);
logger.info(`environment: ${process.env.NODE_ENV}`);
app.use(router);

export default app;

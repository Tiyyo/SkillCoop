import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router/main.router.js';
import accesHttp from './middlewares/acces-http.js';
import logger from './helpers/logger.js';
import { sanitizer } from './middlewares/sanitizer.js';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { CLIENT_URL } from './utils/variables.js';

const app: express.Application = express();
Sentry.init({
  dsn:
    process.env.NODE_ENV === 'production' ? process.env.SENTRY_DSN : undefined,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(accesHttp);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

logger.info(`Client URL : ${CLIENT_URL}`);
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5004', CLIENT_URL as string],
  }),
);
app.use(sanitizer);

logger.info(`environment: ${process.env.NODE_ENV}`);
app.use(router);
export default app;

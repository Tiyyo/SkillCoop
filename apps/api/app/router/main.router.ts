import express, { Router } from 'express';
import authRouter from './auth.router.js';
import apiRouter from './api.router.js';
import factory from '../middlewares/wrapper-controller.js';
/*eslint-disable */
import * as Sentry from '@sentry/node';
import tokenHandler from '../helpers/token.handler.js';
import { sseConnectionManager } from '../services/notification/sse-connection.manager.js';
import NotFoundError from '../helpers/errors/not-found.error.js';
import logger from '../helpers/logger.js';
import { errorHandler } from '../middlewares/errors.handler.js';
import { getMe } from '../controllers/user/get-me.js';
/*eslint-enable */

const router: Router = express.Router();

// this route need to be outsite of the apiRouter
// to let the app access to it without 2 tokens
// because it doesn't need to be protected by validateInfosTokens
router
  .route('/api/user/me')
  .get(tokenHandler.validate('access'), factory(getMe));

router.route('/api/subscription_pathway').get(sseConnectionManager);

router.route('/check').get((_req, res) => {
  res.status(200).json({ message: 'OK' });
});

router.use(
  '/api',
  //  tokenHandler.validateInfosTokens()
  apiRouter,
);
router.use('/auth', authRouter);

// Health check
router.route('/').get((_req, res) => {
  res.status(200).json({ message: 'API server is ok' });
});

router.use((_req, _res, next) => {
  next(new NotFoundError("Request couldn't match any routes"));
});
router.use(Sentry.Handlers.errorHandler());
router.use(errorHandler);

export default router;

import express, { Router } from 'express';
import authRouter from './auth.router.js';
import NotFoundError from '../helpers/errors/not-found.error.js';
import { errorHandler } from '../middleware/errors.handler.js';
import apiRouter from './api.router.js';
import tokenHandler from '../helpers/token.handler.js';
import factory from '../middleware/wrapper-controller.js';
import userController from '../controller/user.controller.js';
import logger from '../helpers/logger.js';
/*eslint-disable */
import { sseConnectionManager } from '../service/notification/sse-connection.manager.js';
import { hasActiveNotification } from '../utils/has-active-notification.js';
import { uploadLocalFile } from '../service/upload/upload-local-file.js';
import * as Sentry from '@sentry/node';
import qs from 'qs'
import axios from 'axios'
/*eslint-enable */

const { getMe } = userController;
const router: Router = express.Router();

router.route('/test').post(async (req, res) => {
  const codesROMELogistics = ['N1303'];
  const options = {
    qualifications: '0',
    codeROME: codesROMELogistics,
    origineOffre: 2,
  };
  const baseUrl =
    'https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres/search?';
  const queryString = qs.stringify(options);
  const accessToken = 'J3CWZ8hibEQ8CR8MFkw9la2CRJ4';

  const result = await axios
    .get(baseUrl + queryString, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log('error', err));

  res.status(200).json(result);
});

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
  // tokenHandler.validateInfosTokens() ,
  apiRouter,
);
router.use('/auth', authRouter);

// Health check
router.route('/').get((_req, res) => {
  res.status(200).json({ message: 'Server is ok' });
});

router.use((_req, _res, next) => {
  logger.info('404');
  next(new NotFoundError("Request couldn't match any routes"));
});
router.use(Sentry.Handlers.errorHandler());
router.use(errorHandler);

export default router;

import express, { Router } from 'express';
import authRouter from './auth.router.js';
import NotFoundError from '#errors/not-found.error';
import { errorHandler } from '#middlewares/errors.handler';
import apiRouter from './api.router.js';
import tokenHandler from '#helpers/token.handler';
import factory from '#middlewares/wrapper-controller';
import userController from '#controllers/user.controller';
import logger from '#logger';
/*eslint-disable */
import { sseConnectionManager } from '#services/notification/sse-connection.manager';
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

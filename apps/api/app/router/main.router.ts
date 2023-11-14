import express, { Router } from 'express';
import authRouter from './auth.router';
import NotFoundError from '../helpers/errors/not-found.error';
import { errorHandler } from '../middleware/errors.handler';
import apiRouter from './api.router';
import tokenHandler from '../helpers/token.handler';
import factory from '../middleware/wrapper-controller';
import userController from '../controller/user.controller';
import logger from '../helpers/logger';

const { getMe } = userController;
const router: Router = express.Router();

// this route need to be outsite of the apiRouter
// to let the app access to it without 2 tokens
// because it doesn't need to be protected by validateInfosTokens
router
  .route('/api/user/me')
  .get(tokenHandler.validate('access'), factory(getMe));

router.route('/check').get((_req, res) => {
  res.status(200).json({ message: 'OK' });
});

router.use('/api', tokenHandler.validateInfosTokens(), apiRouter);
router.use('/auth', authRouter);

router.route('/').get((_req, res) => {
  res.status(200).json({ message: 'Server is ok' });
});

router.use((_req, _res, next) => {
  logger.info('404');
  next(new NotFoundError("Request couldn't match any routes"));
});

router.use(errorHandler);

export default router;

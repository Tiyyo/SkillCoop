import express, { Router } from 'express';
import authRouter from './auth.router';
import NotFoundError from '../helpers/errors/not-found.error';
import { errorHandler } from '../middleware/errors.handler';
import apiRouter from './api.router';
import tokenHandler from '../helpers/token.handler';


const router: Router = express.Router();

router.use('/api',
  tokenHandler.validate('access'),
  apiRouter);
router.use('/auth', authRouter);


router.use((_req, _res, next) => {
  next(new NotFoundError("Request couldn't match any routes"));
});


router.use(errorHandler);


export default router;
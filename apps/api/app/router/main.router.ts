import express, { Router } from 'express';

import profileRouter from './api-router/profile.router'
import authRouter from './auth.router'
import eventRouter from './api-router/event.router'
import friendlistRouter from './api-router/friendslist.router'
import profileOnEventRouter from './api-router/profileOnEvent.router'
import skilFootRouter from './api-router/skillFoot.router'
import statusRouter from './api-router/status.router'
import NotFoundError from '../helpers/errors/not-found.error';
import { errorHandler } from '../middleware/errors-handler';
import { generateBalancedTeam } from '../service/generate-teams';
import apiRouter from './api.router';
import validateToken from '../middleware/validate-access-token';

const router: Router = express.Router();

router.use('/api',
  //  validateToken
  apiRouter)
router.use('/auth', authRouter)


// test generate team alogrithm
router.route('/test').get((req, res) => {
  try {
    generateBalancedTeam()
  } catch (error) {
    console.log(error)
  }
  res.send('ok')
})


router.use((_req, _res, next) => {
  next(new NotFoundError("Request couldn't match any routes"));
})


router.use(errorHandler)


export default router;
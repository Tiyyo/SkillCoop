import express, { Router } from 'express';
import profileRouter from './api-router/profile.router'
import eventRouter from './api-router/event.router'
import friendlistRouter from './api-router/friendslist.router'
import profileOnEventRouter from './api-router/profileOnEvent.router'
import skilFootRouter from './api-router/skillFoot.router'
import statusRouter from './api-router/status.router'
import userRouter from './api-router/user.router'
import NotFoundError from '../helpers/errors/not-found.error';


const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/profile', profileRouter)
router.use('/event', eventRouter)
router.use('/friendlist', friendlistRouter)
router.use('/profile_on_event', profileOnEventRouter)
router.use('/skill_foot', skilFootRouter)
router.use('/status', statusRouter)



export default router;
import express, { Router } from 'express';

import profileRouter from './profile.router'
import authRouter from './auth.router'
import eventRouter from './event.router'
import friendlistRouter from './friendslist.router'
import profileOnEventRouter from './profileOnEvent.router'
import skilFootRouter from './skillFoot.router'
import sportRouter from './sport.router'
import statusRouter from './status.router'
import NotFoundError from '../helpers/errors/not.found.error';
import { errorHandler } from '../middleware/error.handlers';
import { generateBalancedTeam } from '../service/generate_teams';

const router: Router = express.Router();

// router.use('/api/user', userRouter);
router.use('/api/profile', profileRouter)
router.use('/api/event', eventRouter)
router.use('/api/friendlist', friendlistRouter)
router.use('/api/profile_on_event', profileOnEventRouter)
router.use('/api/skill_foot', skilFootRouter)
router.use('/api/sport', sportRouter)
router.use('/api/status', statusRouter)
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
import express, { Router } from 'express';
import profileRouter from './api-router/profile.router';
import eventRouter from './api-router/event.router';
import friendlistRouter from './api-router/friendslist.router';
import profileOnEventRouter from './api-router/profile-on-event.router';
import skilFootRouter from './api-router/skill-foot.router';
import userRouter from './api-router/user.router';
import scoreRouter from './api-router/score.router';
import mvpRouter from './api-router/mvp.router';
import bestStrikerRouter from './api-router/best-striker.router';


const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/profile', profileRouter);
router.use('/event', eventRouter);
router.use('/friends', friendlistRouter);
router.use('/profile_on_event', profileOnEventRouter);
router.use('/skill_foot', skilFootRouter);
router.use('/score', scoreRouter);
router.use('/mvp', mvpRouter);
router.use('/best_striker', bestStrikerRouter);


export default router;
import express, { Router } from 'express';
import profileRouter from './api-router/profile.router.js';
import eventRouter from './api-router/event.router.js';
import friendlistRouter from './api-router/friendslist.router.js';
import profileOnEventRouter from './api-router/profile-on-event.router.js';
import skilFootRouter from './api-router/skill-foot.router.js';
import userRouter from './api-router/user.router.js';
import scoreRouter from './api-router/score.router.js';
import mvpRouter from './api-router/mvp.router.js';
import bestStrikerRouter from './api-router/best-striker.router.js';
import notificationRouter from './api-router/notification.router.js';
import userPreferenceRouter from './api-router/user-preference.router.js';

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
router.use('/notification', notificationRouter);
router.use('/user-preference', userPreferenceRouter);

export default router;

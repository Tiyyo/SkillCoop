import express, { Router } from 'express';
import profileRouter from './api-router/profile.router.js';
import eventRouter from './api-router/event.router.js';
import friendlistRouter from './api-router/profile-on-profile.router.js';
import profileOnEventRouter from './api-router/profile-on-event.router.js';
import skilFootRouter from './api-router/skill-foot.router.js';
import userRouter from './api-router/user.router.js';
import scoreRouter from './api-router/score.router.js';
import mvpRouter from './api-router/mvp.router.js';
import bestStrikerRouter from './api-router/best-striker.router.js';
import notificationRouter from './api-router/notification.router.js';
import userPreferenceRouter from './api-router/user-preference.router.js';
import playgroundRouter from './api-router/playground.router.js';

const router: Router = express.Router();

router.use('/user', userRouter);
// Migrated
router.use('/profile', profileRouter);
//Migrated
router.use('/event', eventRouter);
//Migrated
router.use('/friends', friendlistRouter);
// Migrated
router.use('/profile_on_event', profileOnEventRouter);
//Migrated
router.use('/skill_foot', skilFootRouter);
//Migrated
router.use('/score', scoreRouter);
//Migrated
router.use('/mvp', mvpRouter);
//Migrated
router.use('/best_striker', bestStrikerRouter);
//Migrated
router.use('/notification', notificationRouter);
//Migrated
router.use('/user-preference', userPreferenceRouter);
//Migrated
router.use('/playground', playgroundRouter);

export default router;

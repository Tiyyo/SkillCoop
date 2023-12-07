import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import notificationController from '../../controller/notification.controller';

const { getNotification, markAsRead } = notificationController;

const router: Router = express.Router();

router.route('/:profileId').get(factory(getNotification));
router.route('/').patch(factory(markAsRead));

export default router;

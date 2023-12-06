import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import notificationController from '../../controller/notification.controller';

const { getNotification } = notificationController;

const router: Router = express.Router();

router.route('/:profileId').get(factory(getNotification));

export default router;

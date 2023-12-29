import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import notificationController from '../../controller/notification.controller';
import { markAsReadNotificationSchema } from 'schema';
import { validateSchema } from '../../middleware/schema-validator';
import { canals } from '../../@types/types';

const { getNotification, markAsRead } = notificationController;

const router: Router = express.Router();

router.route('/:profileId').get(factory(getNotification));
router
  .route('/')
  .patch(
    validateSchema(markAsReadNotificationSchema, canals.body),
    factory(markAsRead),
  );

export default router;

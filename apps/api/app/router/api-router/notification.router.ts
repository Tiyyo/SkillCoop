import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
/*eslint-disable-next-line */
import notificationController from '../../controller/notification.controller.js';
import { markAsReadNotificationSchema } from '@skillcoop/schema';
import { validateSchema } from '../../middleware/schema-validator.js';
import { canals } from '../../@types/types.js';

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

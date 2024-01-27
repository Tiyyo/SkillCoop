import express, { Router } from 'express';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
/*eslint-disable-next-line */
import notificationController from '../../controllers/notification.controller.js';
import { markAsReadNotificationSchema } from '@skillcoop/schema';

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

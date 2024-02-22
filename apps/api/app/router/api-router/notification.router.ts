import express, { Router } from 'express';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { markAsReadNotificationSchema } from '@skillcoop/schema';
import { markAsRead } from '../../controllers/notification/mark-as-read.js';
import { getNotification } from '../../controllers/notification/get-all.js';

const router: Router = express.Router();
//Migrated
router.route('/:profileId').get(factory(getNotification));
router
  .route('/')
  .patch(
    validateSchema(markAsReadNotificationSchema, canals.body),
    factory(markAsRead),
  );

export default router;

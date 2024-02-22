import express, { Router } from 'express';
import {
  updateNotificationPreferenceSchema,
  updateLanguagePreferenceSchema,
  updateThemePreferenceSchema,
} from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { get } from '../../controllers/user-preferences/get-all.js';
/* eslint-disable */
import { updateNotification } from '../../controllers/user-preferences/update-notification.js';
import { updateLanguage } from '../../controllers/user-preferences/update-language.js';
import { updateTheme } from '../../controllers/user-preferences/update-theme.js';
/* eslint-enable */

// Migrated
const router: Router = express.Router();

router.route('/:id').get(factory(get));

router.patch(
  '/notification',
  validateSchema(updateNotificationPreferenceSchema, canals.body),
  factory(updateNotification),
);

router.patch(
  '/language',
  validateSchema(updateLanguagePreferenceSchema, canals.body),
  factory(updateLanguage),
);

router.patch(
  '/theme',
  validateSchema(updateThemePreferenceSchema, canals.body),
  factory(updateTheme),
);

export default router;

import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
/*eslint-disable*/
import userPreferenceController from '../../controller/user-preference.controller.js';
/*eslint-enable*/
import { validateSchema } from '../../middleware/schema-validator.js';
import { canals } from '../../@types/types.js';
import {
  updateNotificationPreferenceSchema,
  updateLanguagePreferenceSchema,
  updateThemePreferenceSchema,
} from '@skillcoop/schema';

const { get, updateNotification, updateLanguage, updateTheme } =
  userPreferenceController;

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

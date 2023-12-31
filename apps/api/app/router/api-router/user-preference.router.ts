import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
/*eslint-disable*/
import userPreferenceController from '../../controller/user-preference.controller';
/*eslint-enable*/
import { validateSchema } from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
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

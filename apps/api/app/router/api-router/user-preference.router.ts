import express, { Router } from 'express';
import {
  updateNotificationPreferenceSchema,
  updateLanguagePreferenceSchema,
  updateThemePreferenceSchema,
} from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
/* eslint-disable-next-line */
import userPreferenceController from '../../controllers/user-preference.controller.js';

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

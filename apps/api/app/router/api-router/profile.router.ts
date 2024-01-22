import express, { Router } from 'express';
import factory from '#middlewares/wrapper-controller';
import profileController from '#controllers/profile.controller';
import upload from '#services/upload/upload';
import { validateSchema } from '#middlewares/schema-validator';
import { editProfileInfosSchema } from '@skillcoop/schema';
import { canals } from '#types/types';
import { sanitizeParams } from '#middlewares/sanitizer.params';

const { getOne, updateOne, updateImage, searchProfileByUsername, createOne } =
  profileController;

const router: Router = express.Router();

router
  .route('/')
  .patch(
    validateSchema(editProfileInfosSchema, canals.body),
    factory(updateOne),
  )
  // Need some validation pipe
  .post(factory(createOne));

router.route('/avatar').patch(upload.single('avatar'), factory(updateImage));

// query routes
router.route('/search').get(factory(searchProfileByUsername));

router.route('/:profileId').get(sanitizeParams, factory(getOne));

export default router;

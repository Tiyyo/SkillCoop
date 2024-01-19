import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
import profileController from '../../controller/profile.controller.js';
import upload from '../../service/upload/upload.js';
import { validateSchema } from '../../middleware/schema-validator.js';
import { editProfileInfosSchema } from '@skillcoop/schema';
import { canals } from '../../@types/types.js';
import { sanitizeParams } from '../../middleware/sanitizer.params.js';

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

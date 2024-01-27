import express, { Router } from 'express';
import { editProfileInfosSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import profileController from '../../controllers/profile.controller.js';
import { canals } from '../../@types/types.js';
import upload from '../../services/upload/upload.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';

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

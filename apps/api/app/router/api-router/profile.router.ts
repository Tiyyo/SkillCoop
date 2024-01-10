import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
import profileController from '../../controller/profile.controller.js';
import upload from '../../service/upload/upload.js';
import { validateSchema } from '../../middleware/schema-validator.js';
import { editProfileInfosSchema } from '@skillcoop/schema';
import { canals } from '../../@types/types.js';

const { getOne, updateOne, updateImage, searchProfileByUsername } =
  profileController;

const router: Router = express.Router();

router
  .route('/')
  .patch(
    validateSchema(editProfileInfosSchema, canals.body),
    factory(updateOne),
  );

router.route('/avatar').patch(upload.single('avatar'), factory(updateImage));

// query routes
router.route('/search').get(factory(searchProfileByUsername));

router.route('/:profileId').get(factory(getOne));

export default router;

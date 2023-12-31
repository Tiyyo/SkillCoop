import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import profileController from '../../controller/profile.controller';
import upload from '../../service/upload/upload';
import { validateSchema } from '../../middleware/schema-validator';
import { editProfileInfosSchema } from '@skillcoop/schema';
import { canals } from '../../@types/types';

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

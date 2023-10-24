import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import profileController from '../../controller/profile.controller';
import upload from '../../service/upload/upload';
import validate from '../../middleware/schema-validator';
import createProfileSchema from '../../schemas/profile/create.profile';
import schema from 'schema';
import { canals } from '../../@types/types';
const { editProfileInfosSchema } = schema;
const {
  getOne,
  createOne,
  updateOne,
  updateImage,
  searchProfileByUsername,
} = profileController;

const router: Router = express.Router();

router
  .route('/')
  .post(validate(createProfileSchema, canals.body), factory(createOne))
  .patch(validate(editProfileInfosSchema, canals.body), factory(updateOne));

router.route('/avatar').patch(upload.single('avatar'), factory(updateImage));

// query routes
router.route('/search').get(factory(searchProfileByUsername));

router.route('/:profileId').get(factory(getOne));

export default router;

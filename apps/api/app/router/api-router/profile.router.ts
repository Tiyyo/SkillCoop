import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import profileController from '../../controller/profile.controller';
import upload from '../../service/upload/upload';
import validate from '../../middleware/schema-validator';
import createProfileSchema from '../../schemas/profile/create.profile';
import schema from 'schema'
import { canals } from '../../@types/types';
const { editProfileInfosSchema } = schema
const { getAll, getOne, createOne, createImage, updateOne, deleteOne, updateImage, searchProfileByUsername } = profileController;


const router: Router = express.Router();

router.route('/')
  // useless
  // .get(factory(getAll))
  .post(validate(createProfileSchema, canals.body), factory(createOne))
  .patch(validate(editProfileInfosSchema, canals.body), factory(updateOne))

router.route('/avatar')
  // .post(upload.single('avatar'), factory(createImage))
  .patch(upload.single('avatar'), factory(updateImage))

router.route('/search')
  .get(factory(searchProfileByUsername))


router.route('/:id')
  .get(factory(getOne))
  .delete(factory(deleteOne))


export default router;
import express, { Router } from 'express';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { playgroundSchema } from '@skillcoop/schema';
import { createOne } from '../../controllers/playground/create-one.js';
import { search } from '../../controllers/playground/search.js';

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(playgroundSchema, canals.body), factory(createOne))
  .get(factory(search));

export default router;

import express, { Router } from 'express';
import { voteSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import mvpController from '../../controllers/mvp.controller.js';

const { createOne } = mvpController;

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(voteSchema, canals.body), factory(createOne));

export default router;

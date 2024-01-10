import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
import mvpController from '../../controller/mvp.controller.js';
import { validateSchema } from '../../middleware/schema-validator.js';
import { canals } from '../../@types/types.js';
import { voteSchema } from '@skillcoop/schema';

const { createOne } = mvpController;

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(voteSchema, canals.body), factory(createOne));

export default router;

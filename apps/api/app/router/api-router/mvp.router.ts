import express, { Router } from 'express';
import factory from '#middlewares/wrapper-controller';
import mvpController from '#controllers/mvp.controller';
import { validateSchema } from '#middlewares/schema-validator';
import { canals } from '#types/types';
import { voteSchema } from '@skillcoop/schema';

const { createOne } = mvpController;

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(voteSchema, canals.body), factory(createOne));

export default router;

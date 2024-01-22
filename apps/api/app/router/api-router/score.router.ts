import express, { Router } from 'express';
import factory from '#middlewares/wrapper-controller';
import scoreController from '#controllers/score.controller';
import { validateSchema } from '#middlewares/schema-validator';
import { canals } from '#types/types';
import { saveScoreSchema } from '@skillcoop/schema';

const { createOne } = scoreController;

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(saveScoreSchema, canals.body), factory(createOne));

export default router;

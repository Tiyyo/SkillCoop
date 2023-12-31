import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import scoreController from '../../controller/score.controller';
import { validateSchema } from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { saveScoreSchema } from '@skillcoop/schema';

const { createOne } = scoreController;

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(saveScoreSchema, canals.body), factory(createOne));

export default router;

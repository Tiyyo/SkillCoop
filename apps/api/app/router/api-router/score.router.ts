import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
import scoreController from '../../controller/score.controller.js';
import { validateSchema } from '../../middleware/schema-validator.js';
import { canals } from '../../@types/types.js';
import { saveScoreSchema } from '@skillcoop/schema';

const { createOne } = scoreController;

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(saveScoreSchema, canals.body), factory(createOne));

export default router;

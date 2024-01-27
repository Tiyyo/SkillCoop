import express, { Router } from 'express';
import { saveScoreSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import scoreController from '../../controllers/score.controller.js';

const { createOne } = scoreController;

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(saveScoreSchema, canals.body), factory(createOne));

export default router;

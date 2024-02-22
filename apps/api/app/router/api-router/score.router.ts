import express, { Router } from 'express';
import { saveScoreSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { createOne } from '../../controllers/score/create-one.js';
// Migrated
const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(saveScoreSchema, canals.body), factory(createOne));

export default router;

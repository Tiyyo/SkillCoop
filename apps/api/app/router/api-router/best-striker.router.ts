import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import bestStrikerController from '../../controller/best-striker.controller';
import { canals } from '../../@types/types';
import { voteSchema } from 'schema';
import { validateSchema } from '../../middleware/schema-validator';

const { createOne } = bestStrikerController;

const router: Router = express.Router();

// Invalidate event id
router
  .route('/')
  .post(validateSchema(voteSchema, canals.body), factory(createOne));

export default router;

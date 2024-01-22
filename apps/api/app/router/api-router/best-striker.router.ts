import express, { Router } from 'express';
import factory from '#middlewares/wrapper-controller';
import bestStrikerController from '#controllers/best-striker.controller';
import { canals } from '#types/types';
import { voteSchema } from '@skillcoop/schema';
import { validateSchema } from '#middlewares/schema-validator';

const { createOne } = bestStrikerController;

const router: Router = express.Router();

// Invalidate event id
router
  .route('/')
  .post(validateSchema(voteSchema, canals.body), factory(createOne));

export default router;

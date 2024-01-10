import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
import bestStrikerController from '../../controller/best-striker.controller.js';
import { canals } from '../../@types/types.js';
import { voteSchema } from '@skillcoop/schema';
import { validateSchema } from '../../middleware/schema-validator.js';

const { createOne } = bestStrikerController;

const router: Router = express.Router();

// Invalidate event id
router
  .route('/')
  .post(validateSchema(voteSchema, canals.body), factory(createOne));

export default router;

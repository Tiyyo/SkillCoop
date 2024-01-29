import express, { Router } from 'express';
import { voteSchema } from '@skillcoop/schema';
import { validateSchema } from '../../middlewares/schema-validator.js';
import factory from '../../middlewares/wrapper-controller.js';
import { canals } from '../../@types/types.js';
/* eslint-disable-next-line */
import bestStrikerController from '../../controllers/best-striker.controller.js';

const { createOne } = bestStrikerController;

const router: Router = express.Router();

// Invalidate event id
router
  .route('/')
  .post(validateSchema(voteSchema, canals.body), factory(createOne));

export default router;

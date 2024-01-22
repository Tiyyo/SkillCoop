import express, { Router } from 'express';
import factory from '#middlewares/wrapper-controller';
import userController from '#controllers/user.controller';
import { validateSchema } from '#middlewares/schema-validator';
import { canals } from '#types/types';
import { emailSchema, passwordUpdateSchema } from '@skillcoop/schema';
import tokenHandler from '#helpers/token.handler';
import { sanitizeParams } from '#middlewares/sanitizer.params';

const { updateEmail, updatePassword, deleteUser } = userController;

const router: Router = express.Router();

router
  .route('/email')
  .patch(validateSchema(emailSchema, canals.body), factory(updateEmail));

router
  .route('/password')
  .patch(
    validateSchema(passwordUpdateSchema, canals.body),
    factory(updatePassword),
  );

router
  .route('/:userId')
  .delete(sanitizeParams, tokenHandler.validate('access'), factory(deleteUser));

export default router;

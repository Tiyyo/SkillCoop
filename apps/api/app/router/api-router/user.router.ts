import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
import userController from '../../controller/user.controller.js';
import { validateSchema } from '../../middleware/schema-validator.js';
import { canals } from '../../@types/types.js';
import { emailSchema, passwordUpdateSchema } from '@skillcoop/schema';
import tokenHandler from '../../helpers/token.handler.js';
import { sanitizeParams } from '../../middleware/sanitizer.params.js';

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

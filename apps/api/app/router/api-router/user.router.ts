import express, { Router } from 'express';
import { emailSchema, passwordUpdateSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';
import tokenHandler from '../../helpers/token.handler.js';
import { canals } from '../../@types/types.js';
import userController from '../../controllers/user.controller.js';

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

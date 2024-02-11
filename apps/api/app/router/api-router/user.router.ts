import express, { Router } from 'express';
import { emailSchema, passwordUpdateSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';
import tokenHandler from '../../helpers/token.handler.js';
import { canals } from '../../@types/types.js';
import { updateEmail } from '../../controllers/user/update-eamil.js';
import { updatePassword } from '../../controllers/user/update-password.js';
import { deleteUser } from '../../controllers/user/delete-user.js';

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

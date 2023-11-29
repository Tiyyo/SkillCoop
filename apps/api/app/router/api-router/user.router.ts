import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import userController from '../../controller/user.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { emailSchema, passwordUpdateSchema } from 'schema';
import tokenHandler from '../../helpers/token.handler';

const { updateEmail, updatePassword, deleteUser } = userController;

const router: Router = express.Router();

router.route('/email').patch(validate(emailSchema, canals.body), factory(updateEmail));

router
  .route('/password')
  .patch(validate(passwordUpdateSchema, canals.body), factory(updatePassword));

router.route('/:userId').delete(tokenHandler.validate('access'), deleteUser);

export default router;

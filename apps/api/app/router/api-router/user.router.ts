import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import userController from '../../controller/user.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import schema from 'schema';
import tokenHandler from '../../helpers/token.handler';
const { emailSchema, passwordSchema } = schema;
const { getMe, updateEmail, updatePassword, deleteUser } = userController;

const router: Router = express.Router();

router.route('/me')
  .get(tokenHandler.validate('access'), factory(getMe));

router.route('/email')
  .patch(validate(emailSchema, canals.body), factory(updateEmail));

router.route('/password')
  .patch(validate(passwordSchema, canals.body), factory(updatePassword));

router.route('/:userId')
  .delete(tokenHandler.validate('access'), deleteUser);


export default router;
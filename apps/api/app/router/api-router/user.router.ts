import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import validateToken from '../../middleware/validate-access-token';
import userController from '../../controller/user.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import schema from 'schema'
const { emailSchema, passwordSchema } = schema
const { getMe, updateEmail, updatePassword, deleteUser } = userController

const router: Router = express.Router();

router.route('/me')
  .get(validateToken, factory(getMe))

router.route('/email')
  .patch(validate(emailSchema, canals.body), factory(updateEmail))

router.route('/password')
  // Type error with refine present in Schema
  .patch(validate(passwordSchema, canals.body), factory(updatePassword))

router.route('/:userId')
  .delete(deleteUser)


export default router;
import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import validateToken from '../../middleware/validate-access-token';
import userController from '../../controller/user.controller';

const { getMe } = userController

const router: Router = express.Router();

router.route('/me')
  .get(validateToken, factory(getMe))


export default router;
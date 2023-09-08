import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import validateToken from '../../middleware/validateAccessToken';
import userController from '../../controller/user.controller';

const { getMe } = userController

const router: Router = express.Router();

router.route('/me')
  .get(validateToken, factory(getMe))


export default router;
import express, { Router } from 'express';
import { editProfileInfosSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { getOne } from '../../controllers/profile/get-one.js';
import { updateOne } from '../../controllers/profile/update-one.js';
import { updateImage } from '../../controllers/profile/update-image.js';
import { createOne } from '../../controllers/profile/create-one.js';
/*eslint-disable */
import { searchProfileByUsername } from '../../controllers/profile/search-by-username.js';
/*eslint-enable */
import { canals } from '../../@types/types.js';
import upload from '../../services/upload/upload.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';
// Migrated
const router: Router = express.Router();

router
  .route('/')
  .patch(
    validateSchema(editProfileInfosSchema, canals.body),
    factory(updateOne),
  )
  // Need some validation pipe
  .post(factory(createOne));

router.route('/avatar').patch(upload.single('avatar'), factory(updateImage));

// query routes
router.route('/search').get(factory(searchProfileByUsername));

router.route('/:profileId').get(sanitizeParams, factory(getOne));

export default router;

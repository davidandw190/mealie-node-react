import { jwtCheck, jwtParse } from '../middleware/auth.middleware';

import express from 'express';
import uploadImage from '../middleware/upload.middleware';
import { validateUpdateUserRequest } from '../middleware/validation.middleware';

const router = express.Router();

router.post(
  '/',
  uploadImage.single('imageFile'),
  jwtCheck,
  jwtParse,
  // @ts-ignore
  registerRestaurant,
);

export default router;

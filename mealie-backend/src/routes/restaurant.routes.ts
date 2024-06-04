import { jwtCheck, jwtParse } from '../middleware/auth.middleware';

import express from 'express';
import { registerRestaurant } from '../resources/restaurant.resource';
import uploadImage from '../middleware/upload.middleware';
import { validateRegisterRestaurantRequest } from '../middleware/validation.middleware';

const router = express.Router();

router.post(
  '/',
  uploadImage.single('imageFile'),
  validateRegisterRestaurantRequest,
  jwtCheck,
  jwtParse,
  registerRestaurant,
);

export default router;

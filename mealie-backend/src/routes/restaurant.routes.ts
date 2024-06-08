import { jwtCheck, jwtParse } from '../middleware/auth.middleware';
import { registerRestaurant, retrieveOwnedRestaurantDetails, updateRestaurant } from '../resources/restaurant.resource';

import express from 'express';
import uploadImage from '../middleware/upload.middleware';
import { validateRegisterRestaurantRequest } from '../middleware/validation.middleware';

const router = express.Router();

router.get('/owned/', jwtCheck, jwtParse, retrieveOwnedRestaurantDetails);

router.post(
  '/owned/',
  uploadImage.single('imageFile'),
  validateRegisterRestaurantRequest,
  jwtCheck,
  jwtParse,
  registerRestaurant,
);

router.put(
  '/owned/',
  uploadImage.single('imageFile'),
  validateRegisterRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateRestaurant,
);

export default router;

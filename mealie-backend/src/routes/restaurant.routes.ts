import { jwtCheck, jwtParse } from '../middleware/auth.middleware';
import {
  registerRestaurant,
  retrieveOwnedRestaurantDetails,
  searchRestaurants,
  updateRestaurant,
} from '../resources/restaurant.resource';

import express from 'express';
import { param } from 'express-validator';
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

router.get(
  '/search/:city',
  param('city').isString().trim().notEmpty().withMessage('City parameter must be a valid city name'),
  searchRestaurants,
);

export default router;

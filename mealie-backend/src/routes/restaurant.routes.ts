import { jwtCheck, jwtParse } from '../middleware/auth.middleware';
import { registerRestaurant, retrieveOwnedRestaurantDetails } from '../resources/restaurant.resource';

import express from 'express';
import jwt from 'jsonwebtoken';
import uploadImage from '../middleware/upload.middleware';
import { validateRegisterRestaurantRequest } from '../middleware/validation.middleware';

const router = express.Router();

router.post(
  '/owned/',
  uploadImage.single('imageFile'),
  validateRegisterRestaurantRequest,
  jwtCheck,
  jwtParse,
  registerRestaurant,
);

router.get('/owned/', jwtCheck, jwtParse, retrieveOwnedRestaurantDetails);

export default router;

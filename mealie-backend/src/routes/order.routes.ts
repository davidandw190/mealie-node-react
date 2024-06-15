import { jwtCheck, jwtParse } from '../middleware/auth.middleware';

import { createOrderCheckoutSession } from '../resources/order.resource';
import express from 'express';

const router = express.Router();

router.post('/checkout/create-checkout-session', jwtCheck, jwtParse, createOrderCheckoutSession);
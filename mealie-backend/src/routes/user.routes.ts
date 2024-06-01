import { jwtCheck, jwtParse } from '../middleware/auth.middleware';

import { createCurrentUser } from '../resources/user.resource';
import express from 'express';

const router = express.Router();

router.post('/', jwtCheck, jwtParse,  createCurrentUser);

export default router;

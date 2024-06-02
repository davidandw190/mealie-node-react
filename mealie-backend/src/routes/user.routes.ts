import { createUser, updateUser } from '../resources/user.resource';
import { jwtCheck, jwtParse } from '../middleware/auth.middleware';

import express from 'express';

const router = express.Router();

router.post('/', jwtCheck, jwtParse,  createUser);
router.put('/', jwtCheck, jwtParse, updateUser);

export default router;

import { createUser, getUser, updateUser } from '../resources/user.resource';
import { jwtCheck, jwtParse } from '../middleware/auth.middleware';

import express from 'express';
import { validateUpdateUserRequest } from '../middleware/validation.middleware';

const router = express.Router();

router.get('/', jwtCheck, jwtParse, getUser);
router.post('/', jwtCheck, createUser);
router.put('/', validateUpdateUserRequest, updateUser);

export default router;

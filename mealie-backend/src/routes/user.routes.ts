import { createUser, updateUser } from '../resources/user.resource';
import { jwtCheck, jwtParse } from '../middleware/auth.middleware';

import express from 'express';
import { validateUpdateUserRequest } from '../middleware/validation.middleware';

const router = express.Router();

router.get('/', jwtCheck, jwtParse, (req, res) => {});
router.post('/', jwtCheck, createUser);
router.put('/', jwtCheck, jwtParse, validateUpdateUserRequest, updateUser);

export default router;

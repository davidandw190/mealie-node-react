import { createCurrentUser } from '../resources/user.resource';
import express from 'express';

const router = express.Router();

router.post('/', createCurrentUser);

export default router;

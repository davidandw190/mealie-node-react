import { NextFunction, Request, Response } from 'express';

import UserModel from '../models/user.model';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0_id: string;
    }
  }
}

const envLoaded = dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });
if (envLoaded.error) {
  console.error('Failed to load environment variables:', envLoaded.error);
  process.exit(1);
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ') || authorization.split(' ')[1] === 'null') {
    return res.sendStatus(401);
  }

  const accessToken = authorization.split(' ')[1];

  try {
    const payload = jwt.decode(accessToken) as jwt.JwtPayload;
    const auth0_id = payload.sub;

    const user = await UserModel.findOne({ auth0_id }).lean().exec();

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.auth0_id = auth0_id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

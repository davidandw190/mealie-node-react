import { Request, Response } from 'express';

import UserModel from '../models/user.model';

export const createCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { auth0_id } = req.body;

    if (!auth0_id) {
      res.status(400).json({ message: 'auth0_id is required' });
      return;
    }

    const existingUser = await UserModel.findOne({ auth0_id }).lean().exec();

    if (existingUser) {
      res.status(200).send();
      return;
    }

    const newUser = new UserModel(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

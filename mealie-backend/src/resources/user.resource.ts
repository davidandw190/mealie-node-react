import { Request, Response } from 'express';

import UserModel from '../models/user.model';

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId).exec();
    if (!user) {
      return res.status(404).json({ message: 'User was not found' });
    }

    res.json(user.toObject());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await UserModel.findById(req.userId).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) user.name = name;
    if (addressLine1 !== undefined) user.addressLine1 = addressLine1;
    if (city !== undefined) user.city = city;
    if (country !== undefined) user.country = country;

    await user.save();

    res.status(200).json(user.toObject());
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

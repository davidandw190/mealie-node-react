import { Request, Response } from 'express';

import RestaurantModel from '../models/restaurant.model';
import path from 'path';
import s3 from '../config/aws.config';

export const registerRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await RestaurantModel.findOne({ owner: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User already owns a restaurant" });
    }

    let imageUrl: string | null = null;
    
    if (req.file) {
      imageUrl = await uploadImageToS3(req.file as Express.Multer.File);
    }

    const newRestaurant = new RestaurantModel({
      ...req.body,
      owner: req.userId,
      imageUrl,
    });

    await newRestaurant.save();
    
    res.status(201).json({ message: "Restaurant registered successfully", restaurant: newRestaurant });
    
  } catch (error) {
    console.error('Error registering restaurant:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const uploadImageToS3 = async (file: Express.Multer.File): Promise<string> => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `restaurant-images/${Date.now().toString()}${path.extname(file.originalname)}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    throw new Error('Image upload failed');
  }

};


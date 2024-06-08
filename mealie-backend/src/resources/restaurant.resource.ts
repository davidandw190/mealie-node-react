import { ObjectCannedACL, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';

import RestaurantModel from '../models/restaurant.model';
import { Upload } from '@aws-sdk/lib-storage';
import path from 'path';
import s3 from '../config/aws.config';

export const retrieveOwnedRestaurantDetails = async (req: Request, res: Response) => {
  try {
    const ownedRestaurant = await RestaurantModel.findOne({ owner: req.userId });

    if (!ownedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(ownedRestaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching owned restaurant details" });
  }
};

export const registerRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await RestaurantModel.findOne({ owner: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User already owns a restaurant" });
    }

    let imageUrl: string | undefined = '';
    
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

const uploadImageToS3 = async (file: Express.Multer.File): Promise<string | undefined> => {
  const uploadParams: PutObjectCommandInput = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `restaurant-images/${Date.now().toString()}${path.extname(file.originalname)}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read' as ObjectCannedACL,
  };

  try {
    const parallelUploads3 = new Upload({
      client: s3,
      params: uploadParams,
    });

    parallelUploads3.on('httpUploadProgress', (progress) => {
      console.log(progress);
    });

    const data = await parallelUploads3.done();
    return data?.Location || '';
  } catch (error) {
    throw new Error('Image upload failed');
  }
};


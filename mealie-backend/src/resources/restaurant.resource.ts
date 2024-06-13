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
    console.log('error', error);
    res.status(500).json({ message: 'Error fetching owned restaurant details' });
  }
};

export const retrieveRestaurantDetails = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.findOne({ _id: req.params.restaurantId });

    if (!restaurant) {
      return res.status(404).json({ message: 'restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

export const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || '';
    const selectedCuisines = (req.query.selectedCuisines as string) || '';
    const sortOption = (req.query.sortOption as string) || 'updatedAt';
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;
    let query: any = {};

    query['city'] = new RegExp(city, 'i');
    const cityCheck = await RestaurantModel.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines.split(',').map((cuisine) => new RegExp(cuisine, 'i'));
      query['cuisines'] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, 'i');
      query['$or'] = [{ resturantName: searchRegex }, { cuisines: { $in: [searchRegex] } }];
    }

    const restaurants = await RestaurantModel.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const response = {
      data: restaurants,
      pagination: {
        total: restaurants.length,
        page,
        pages: Math.ceil(restaurants.length / pageSize),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error searching restaurants:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const registerRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await RestaurantModel.findOne({ owner: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({ message: 'User already owns a restaurant' });
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

    res.status(201).json({ message: 'Restaurant registered successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error('Error registering restaurant:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.findOne({ owner: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.updatedAt = new Date();

    if (req.file) {
      restaurant.imageUrl = await uploadImageToS3(req.file as Express.Multer.File);
    }

    await restaurant.save();

    res.status(200).send(restaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
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

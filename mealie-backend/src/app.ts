import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import orderRoutes from './routes/order.routes';
import restaurantRoutes from './routes/restaurant.routes';
import userRoutes from './routes/user.routes';

const envLoaded = dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });
if (envLoaded.error) {
  console.error('Failed to load environment variables:', envLoaded.error);
  process.exit(1);
}

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Environment file: ${envLoaded.parsed?.NODE_ENV}`);

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`${process.env.DB_URI_LOCAL}`)
.then(() => {
  console.log('Successfully connected to MongoDB');
});

app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orderss', orderRoutes)

const PORT = process.env.SERVER_PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
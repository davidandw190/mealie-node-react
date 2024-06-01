import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import userRoutes from './routes/user.routes';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: '.env.dev' });
}

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.DB_URI_LOCAL}`)
.then(() => {
  console.log('Successfully connected to MongoDB');
});

app.use('/api/users', userRoutes);

const PORT = process.env.SERVER_PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
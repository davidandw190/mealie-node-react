import "dotenv/config";

import cors from 'cors';
import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
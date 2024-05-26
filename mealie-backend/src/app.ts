import "dotenv/config";

import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen( process.env.POST || 7000, () =>{
  console.log(`Server started on http://localhost:${process.env.PORT || 7000}`);
});
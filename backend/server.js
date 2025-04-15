import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/UserRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Running at server ' + port);
});

async function conne() {
  console.log('DB link: ' + process.env.MONGO_URL);
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to the DB');
  } catch (error) {
    console.error('Connection failed!', error);
  }
}

conne();

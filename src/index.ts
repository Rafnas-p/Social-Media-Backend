import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import videoRoutes from './routes/videoRoutes';
import commentRoutes from "./routes/commentRoutes"
const cors = require('cors');


dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
const MONGODB_URL = process.env.MONGODB_URL as string;
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('MongoDB connection error:', err));

app.use('/api', videoRoutes);
app.use('/api',commentRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

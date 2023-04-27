import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routers/authRoute.js';

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.ORIGIN_ADDRESS, 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));

app.use(passport.initialize());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

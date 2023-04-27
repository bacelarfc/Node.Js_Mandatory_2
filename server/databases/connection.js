import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
const router = Router();
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


export default connection;
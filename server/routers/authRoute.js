import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import nodemailer from "nodemailer";
import { createUser, getUserByEmail } from '../databases/userQueries.js';
import passportConfig from '../middlewares/passport.js';

const router = express.Router();
passportConfig(passport);

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_PASSWORD,
    },
  });

  /*===== ROUTES =====*/

  router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Welcome to the home page!', user: req.user });
  });
  
  router.post('/signUp', async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await getUserByEmail(email);
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const newUser = {
        email,
        password: hash,
      };
  
      const userId = await createUser(newUser);
      res.json({ message: 'User registered', userId });
  
      //Welcome email
      const message = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Welcome to My App!',
        text: 'Thank you for registering with My App!',
      };
  
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
            //Enable get the URL to access the ethereal email preview UI
            console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  });
  
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const payload = { id: user.id, email: user.email };
  
        const token = jwt.sign(payload, process.env.MY_ACCESS_TOKEN, {
          expiresIn: '1h',
        });
        res.json({ message: 'Logged in', token: 'Bearer ' + token });
      } else {
        res.status(400).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });

  router.get('/myList', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Welcome to the list page!', user: req.user });
  });

  router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id, email } = req.user.user;
    res.json({ id, email });
  });

  export default router;
import dotenv from 'dotenv';
dotenv.config();
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getUserByEmail } from '../databases/userQueries.js';
import jwt from 'jsonwebtoken';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MY_ACCESS_TOKEN,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await getUserByEmail(jwt_payload.email);

        if (user) {
          const token = jwt.sign({ email: jwt_payload.email }, process.env.MY_ACCESS_TOKEN, { expiresIn: '1h' });
          return done(null, { user, token });
        } else {
          console.log('User not found!');
          return done(null, false);
        }
      } catch (error) {
        console.log('Error:', error);
        return done(error, false);
      }
    })
  );
};
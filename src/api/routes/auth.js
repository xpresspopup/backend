import { Router } from 'express';
import passport from 'passport';
import userRepository from '../../repository/auth';

const route = Router();

export default (app) => {
  app.use('/auth', route);
  route.get('/test', (req, res) => {
    res.status(200).send('I am here for you');
  });
  route.post('/signup', userRepository.signUp);
  route.post('/signin', userRepository.signIn);
  route.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    userRepository.currentProfile,
  );
  route.get(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    userRepository.logOut,
  );
};

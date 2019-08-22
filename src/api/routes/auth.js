import { Router } from 'express';
import passport from 'passport';
// import userRepository from '../../repository/auth';
import authController from '../../controllers/auth';
import authService from '../../services/auth';

const route = Router();

export default (app) => {
  app.use('/auth', route);
  route.get('/test', (req, res) => {
    res.status(200).send('I am here for you');
  });
  route.post('/signup', authController.userSignUp);
  route.post('/signin', authController.userSignIn);
  route.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    authController.userCurrentProfile,
  );
  route.get(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    authController.userLogOut,
  );
};

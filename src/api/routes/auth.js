import { Router } from 'express';
import passport from 'passport';
import upload from '../../services/multerService';
import authController from '../../controllers/auth';

const route = Router();

export default (app) => {
  app.use('/auth', route);

  route.post('/signup', authController.userSignUp);
  route.post('/verify', authController.verifySignUp);
  route.post('/signin', authController.userSignIn);
  route.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    authController.userCurrentProfile,
  );
  route.get(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    authController.userLogOut,
  );

  /** updates a user profile with all the required fields */
  route.put(
    '/',
    passport.authenticate('jwt', { session: false }),
    authController.updateUser,
  );
  /** Upload profile picture for user */
  route.put(
    '/upload',
    passport.authenticate('jwt', { session: false }),
    upload.any(),
    authController.uploadPicture,
  );
};

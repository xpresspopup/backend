import { Router } from 'express';
import passport from 'passport';
import upload from '../../services/multerService';
import authController from '../../controllers/auth';
import isWhiteCollar from '../middleware/whiteCollar';

const route = Router();

export default (app) => {
  app.use('/auth', route);

  route.post('/signup', authController.userSignUp);
  route.post('/verify', authController.verifySignUp);
  route.post('/signin', authController.userSignIn);
  route.put(
    '/userType',
    passport.authenticate('jwt', { session: false }),
    authController.selectUserType,
  );
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
    '/uploadAvatar',
    passport.authenticate('jwt', { session: false }),
    upload.any(),
    authController.uploadPicture,
  );
  /** Upload profile picture for user */
  route.put(
    '/uploadCv',
    passport.authenticate('jwt', { session: false }),
    isWhiteCollar,
    upload.any(),
    authController.uploadCv,
  );
};

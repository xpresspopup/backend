import { Router } from 'express';
import passport from 'passport';
import isEmployerOrAdmin from '../middlewares/isEmployerOrAdmin';
import listingController from '../../controllers/listing';

const route = Router();

export default (app) => {
  app.use('/listing', route);
  /** post listing */
  route.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    listingController.createListing,
  );
};

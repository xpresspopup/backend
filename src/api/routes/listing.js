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
  /** post listing */
  route.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    listingController.updateListing,
  );
  /** query parameter type which can be all, unapproved, approved, invalid */
  route.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    listingController.getAllListing,
  );
  /** query parameter the distance within you, in graduation of 2,4,8,12,24, and longitude and latitude */
  route.get(
    '/within',
    passport.authenticate('jwt', { session: false }),
    listingController.within,
  );
  route.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    listingController.getListingById,
  );
  route.get(
    '/approve/:id',
    passport.authenticate('jwt', { session: false }),
    listingController.approveListing,
  );
  // get listing by categories
};

import { Router } from 'express';
import passport from 'passport';
import upload from '../../services/multerService';
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
  /** query parameter type which can be all, unapproved, approved, invalid */
  route.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    listingController.getAllListing,
  );
  /** update listing */
  route.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    listingController.updateListing,
  );
  route.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    listingController.getListingById,
  );

  /** Search listings by category */
  route.get(
    '/category',
    passport.authenticate('jwt', { session: false }),
    listingController.searchByCategory,
  );
  /** query parameter the distance within you, in graduation of 2,4,8,12,24, and longitude and latitude */
  route.get(
    '/within',
    passport.authenticate('jwt', { session: false }),
    listingController.within,
  );
  route.get(
    '/approve/:id',
    passport.authenticate('jwt', { session: false }),
    listingController.approveListing,
  );
  route.put(
    '/images/:id',
    passport.authenticate('jwt', { session: false }),
    upload.any(),
    listingController.updateListingImage,
  );
  route.put(
    '/updateCatalogue/:id',
    passport.authenticate('jwt', { session: false }),
    listingController.updateCatalogue,
  );
};

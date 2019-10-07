import { Router } from 'express';
import passport from 'passport';
import isBusinessOwner from '../middleware/businessOwner';
import catalogueController from '../../controllers/catalogue';

const route = Router();

export default (app) => {
  app.use('/catalogue', route);
  route.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isBusinessOwner,
    catalogueController.createCatalogue,
  );
  route.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    isBusinessOwner,
    catalogueController.getAllCatalogueByUser,
  );
  route.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isBusinessOwner,
    catalogueController.updateCatalogue,
  );
  route.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isBusinessOwner,
    catalogueController.deleteCatalogue,
  );
  route.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    catalogueController.getCatalogueById,
  );
};

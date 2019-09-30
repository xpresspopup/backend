import { Router } from 'express';
import passport from 'passport';
import isAdmin from '../middleware/isAdmin';
import categoryController from '../../controllers/category';

const route = Router();

export default (app) => {
  app.use('/category', route);
  /** post category, protect it by admin later */
  route.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    categoryController.createCategory,
  );
  route.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    categoryController.getAllCategory,
  );
  route.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    categoryController.updateCategory,
  );
  route.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    categoryController.deleteCategory,
  );
};

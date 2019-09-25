import { Router } from 'express';
import passport from 'passport';
import isEmployerOrAdmin from '../middlewares/isEmployerOrAdmin';
import categoryController from '../../controllers/category';

const route = Router();

export default (app) => {
  app.use('/category', route);
  /** post category, protect it by admin later */
  route.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    categoryController.createCategory,
  );
};

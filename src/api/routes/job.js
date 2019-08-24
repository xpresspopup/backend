import { Router } from 'express';
import passport from 'passport';
import isRecruiter from '../middlewares/isRecruiter';
import isEmployer from '../middlewares/employer';
import jobController from '../../controllers/job';

const route = Router();

export default (app) => {
  app.use('/job', route);
  /** post job */
  route.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    jobController.postJob,
  );
  /** get all job specifying the job type or all to get all */
  route.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    isEmployer,
    jobController.getJob,
  );
};

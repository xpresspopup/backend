import { Router } from 'express';
import passport from 'passport';
import isRecruiter from '../middleware/isRecruiter';
import isEmployer from '../middleware/employer';
import isEmployerOrAdmin from '../middleware/isEmployerOrAdmin';
import jobController from '../../controllers/job';

const route = Router();

export default (app) => {
  app.use('/job', route);
  /** post job */
  route.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isEmployerOrAdmin,
    jobController.postJob,
  );
  /** get all job specifying the job type or all as a query parameter to get all */
  // ?jobType='all' or jobType='whiteCollar'
  route.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    // isEmployerOrAdmin,
    jobController.getJob,
  );
  /** all jobs within a 20km radius passing lat and long */
  route.get(
    '/within',
    passport.authenticate('jwt', { session: false }),
    jobController.getJobWithin,
  );
  /** Search jobs by category */
  route.get(
    '/category',
    passport.authenticate('jwt', { session: false }),
    jobController.searchByCategory,
  );
  /** Single job by id */
  route.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    jobController.getJobById,
  );
  /** Update Single job by id, updates any field from white collar job and blue collar job */
  route.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isEmployerOrAdmin,
    jobController.updateJobById,
  );
};

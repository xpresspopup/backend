import { Router } from 'express';
import auth from './routes/auth';
import job from './routes/job';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  job(app);

  return app;
};

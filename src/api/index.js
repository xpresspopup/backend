import { Router } from 'express';
import auth from './routes/auth';
import job from './routes/job';
import listing from './routes/listing';
import category from './routes/category';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  job(app);
  listing(app);
  category(app);

  return app;
};

import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import routes from '../api';
import config from '../config';
import '@babel/polyfill/noConflict';
import passportFunction from './passport';
export default async (app) => {
  app.use(cors());
  app.enable('trust proxy');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  passportFunction(passport);
  app.use(config.api.prefix, routes());

  /** Error Handlers */
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
  return app;
};

import { Router } from 'express';
// import { Container } from 'typedi';
// import AuthService from '../../services/auth';
// import middlewares from '../middlewares';
// import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app) => {
  app.use('/auth', route);
  route.get('/test', (req, res) => {
    res.status(200).send('I am here for you');
  });
};

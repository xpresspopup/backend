import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjectors';
import Logger from './logger';
import User from '../models/User';

export default async (app) => {
  const mongoConnection = await mongooseLoader();

  const userModel = {
    name: 'userModel',
    model: User.default,
  };

  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [userModel],
  });
  Logger.info('✌️ Dependency Injector loaded✌ ️');
  await expressLoader(app);
  Logger.info('Express App Intialized ✌️✌️');
};

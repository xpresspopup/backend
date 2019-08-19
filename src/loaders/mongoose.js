import mongoose from 'mongoose';
import config from '../config';
import LoggerInstance from './logger';
let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = config.databaseURL;
} else {
  connectionString = config.databaseURL;
}
export default async () => {
  try {
    const connection = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    LoggerInstance.info(`MongoDB connected to ${connectionString}`);
    return connection.connection.db;
  } catch (error) {
    LoggerInstance.error('🔥 Error starting MongoDB', error);
    throw error;
  }
};

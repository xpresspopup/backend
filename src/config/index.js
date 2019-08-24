import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  secretOrKey: process.env.SECRET_KEY,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    apikey: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET,
  },
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  agendash: {
    user: 'agendash',
    password: '123456',
  },
  // paypal: {
  //   publicKey: process.env.PAYPAL_PUBLIC_KEY,
  //   secretKey: process.env.PAYPAL_SECRET_KEY,
  // },
};

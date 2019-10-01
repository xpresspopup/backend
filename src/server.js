import express from 'express';
import '@babel/polyfill/noConflict';
import loaders from './loaders';

const startServer = async () => {
  const app = express();
  app.use(
    express.static(
      'https://app.swaggerhub.com/apis-docs/BucketList/bucket-list/1.0.0',
    ),
  );
  app.use('/uploads', express.static('uploads'));
  await loaders(app);

  const PORT = process.env.PORT || 5555;
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready!!! on port ${PORT}`);
  });
};

startServer();

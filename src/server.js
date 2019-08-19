import express from 'express';
import loaders from './loaders';

const startServer = async () => {
  const app = express();

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

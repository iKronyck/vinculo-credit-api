import mongoose from 'mongoose';

require('dotenv').config({
  path: './.env',
});

process.on('uncaughtException', (error: Error) => {
  console.log('UNCAUGHT EXCEPTION!');
  console.log(error.name, error.message);
  process.exit(1);
});

import app from './app';

const PORT = process.env.APP_PORT || 1234;
const DATABASE = process.env.DATABASE || '';
const USERNAME = process.env.DATABASE_USERNAME || '';
const PASSWORD = process.env.DATABASE_PASSWORD || '';

const DB = DATABASE.replace('<username>', USERNAME).replace('<password>', PASSWORD);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB connection successfully!!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

const server = app.listen(PORT, () => {
  console.log(`The app is running in port ${PORT}`);
});

process.on('unhandledRejection', (error: Error) => {
  console.log('UNHANDLED REJECTION!');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

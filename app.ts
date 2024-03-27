// @ts-ignore
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { creditRoutes } from './routes/creditRoutes';
import AppError from './utils/AppError';
import path from 'path';

const APP_VERSION = process.env.APP_VERSION ?? 1;
const API_PATH = `/api/v${APP_VERSION}`;

const app = express();

if (process.env.APP_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(`${API_PATH}/images`, express.static(path.join(__dirname, 'public', 'img', 'users')));

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(API_PATH, creditRoutes);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;

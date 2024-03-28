// @ts-ignore
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import { creditRoutes } from './routes/creditRoutes';
import AppError from './utils/AppError';

const APP_VERSION = process.env.APP_VERSION ?? 1;
const API_PATH = `/api/v${APP_VERSION}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Name',
      version: '1.0.2',
      description: 'A short description of your API',
      contact: {
        name: 'Israel Alfaro',
        url: 'https://www.linkedin.com/in/ikronyck',
        email: 'israel.devalfaro@gmail.com',
      },
    },
    servers: [
      {
        url: `${process.env.APP_URL}${process.env.APP_VERSION}`,
      },
    ],
  },
  apis: ['./routes/*.ts'],
};
const specs = swaggerJSdoc(options);

const app = express();

if (process.env.APP_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(`${API_PATH}/images`, express.static(path.join(__dirname, 'public', 'img', 'users')));

app.use(
  `${API_PATH}/api-docs`,
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true, customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/2.x/theme-newspaper.css' }),
);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(API_PATH, creditRoutes);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;

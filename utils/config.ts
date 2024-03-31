require('dotenv').config({
  path: './.env',
});

export const PORT = process.env.APP_PORT || 1234;
export const DATABASE = process.env.DATABASE || '';
export const USERNAME = process.env.DATABASE_USERNAME || '';
export const PASSWORD = process.env.DATABASE_PASSWORD || '';

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION as string;
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY as string;
export const AWS_SECRET_KEY = process.env.AWS_PUBLIC_SECRET_KEY as string;

export const HOST =
  process.env.NODE_ENV === 'production' ? process.env.HOST : 'localhost';
export const CLIENT_URL =
  process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_PROD_URL as string)
    : (process.env.CLIENT_DEV_URL as string);

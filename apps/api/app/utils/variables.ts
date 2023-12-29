export const HOST = process.env.HOST;
export const CLIENT_URL =
  process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_PROD_URL as string)
    : (process.env.CLIENT_DEV_URL as string);

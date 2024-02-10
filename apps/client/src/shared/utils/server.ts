export const SERVER_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_SERVER_URL
  : import.meta.env.VITE_DEV_SERVER_URL;

export const CHAT_SERVER_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_CHAT_SERVER_URL
  : import.meta.env.VITE_DEV_CHAT_SERVER_URL;

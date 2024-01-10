import logger from '../logger.js';
import { Response } from 'express';

type CustomError = Error & {
  status: number;
};

type HandleCommonError = {
  error: CustomError;
  response: Response;
  isProduction: boolean;
  userMessage: string;
  fieldErrors?: unknown;
};

export const handleCommonError = ({
  error,
  response,
  isProduction,
  userMessage,
  fieldErrors,
}: HandleCommonError) => {
  logger.error(error.name + ' ' + error.message);

  const responseError = !isProduction
    ? fieldErrors || error.message
    : userMessage;
  return response.status(error.status || 500).json({ error: responseError });
};

import { NextFunction, Request, Response } from 'express';
import ValidationError from '../helpers/errors/validation.error.js';
import { handleCommonError } from '../helpers/errors/handle-common-error.js';
import APITypeError from '../helpers/errors/type.error.js';
import NotFoundError from '../helpers/errors/not-found.error.js';
import AuthorizationError from '../helpers/errors/unauthorized.error.js';
import ServerError from '../helpers/errors/server.error.js';
import UserInputError from '../helpers/errors/user-input.error.js';
import DatabaseError from '../helpers/errors/database.error.js';
import ForbidenError from '../helpers/errors/forbiden.js';
import logger from '../helpers/logger.js';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,// eslint-disable-line
) => {
  const isProduction = res.app.get('env') === 'production';

  if (error instanceof ValidationError) {
    return handleCommonError({
      error,
      response: res,
      isProduction,
      userMessage: 'Invalid data',
      fieldErrors: error.fieldErrors,
    });
  }

  if (
    error instanceof APITypeError ||
    error instanceof NotFoundError ||
    error instanceof AuthorizationError ||
    error instanceof ServerError ||
    error instanceof UserInputError ||
    error instanceof DatabaseError ||
    error instanceof ForbidenError
  ) {
    return handleCommonError({
      error,
      response: res,
      isProduction,
      userMessage: error.userMessage,
    });
  }

  if (error instanceof Error) {
    logger.error(error.name + ' ' + error.message);
    const errorResponse = isProduction
      ? 'Internal Server Error'
      : error.message;
    return res.status(500).json({ error: errorResponse });
  }

  logger.error('Unknown error');
  return res.status(500).send('Internal Server Error');
};

import { NextFunction, Request, Response } from 'express';
import ServerError from '../helpers/errors/server.error';
import AuthorizationError from '../helpers/errors/unauthorized.error';
import ValidationError from '../helpers/errors/validation.error';
import logger from '../helpers/logger';
import NotFoundError from '../helpers/errors/not-found.error';
import UserInputError from '../helpers/errors/user-input.error';
import DatabaseError from '../helpers/errors/database.error';
import APITypeError from '../helpers/errors/type.error';
import ForbidenError from '../helpers/errors/forbiden';
import { handleCommonError } from '../helpers/errors/handle-common-error';

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

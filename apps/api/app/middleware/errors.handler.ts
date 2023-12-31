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

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,// eslint-disable-line
) => {
  const devEnv = res.app.get('env') === 'development';
  logger.info(devEnv);

  if (error instanceof ValidationError && devEnv) {
    logger.error(error.name + ' ' + error.message);
    return res.status(error.status).json({
      error: error.fieldErrors,
    });
  }

  if (error instanceof ValidationError && !devEnv) {
    logger.error(error.name + ' ' + error.message);
    return res.status(error.status).json({
      error: 'Invalid data',
    });
  }

  if (error instanceof APITypeError && devEnv) {
    logger.error(error.message);
    return res.status(error.status).json({
      error: error.message,
    });
  }

  if (error instanceof APITypeError && !devEnv) {
    logger.error(error.message);
    return res.status(error.status).json({
      error: error.userMessage,
    });
  }

  if (error instanceof NotFoundError && devEnv) {
    logger.error(error.message);
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof NotFoundError && !devEnv) {
    logger.error(error.name);
    return res.status(error.status).json({ error: error.userMessage });
  }

  if (error instanceof AuthorizationError && devEnv) {
    logger.error(error.message);
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof AuthorizationError && !devEnv) {
    logger.error(error.name);
    return res.status(error.status).json({ error: error.userMessage });
  }

  if (error instanceof ServerError && devEnv) {
    logger.error(error.message);
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof ServerError && !devEnv) {
    logger.error(error.name);
    return res.status(error.status).json({ error: error.userMessage });
  }

  if (error instanceof UserInputError && devEnv) {
    logger.error(error.message);
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof UserInputError && !devEnv) {
    logger.error(error.name);
    return res.status(error.status).json({ error: error.userMessage });
  }

  if (error instanceof DatabaseError && devEnv) {
    logger.error(error.name + ' ' + error.message);
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof DatabaseError && !devEnv) {
    logger.error(error.name + ' ' + error.message);
    return res.status(error.status).json({ error: error.userMessage });
  }

  if (error instanceof ForbidenError && devEnv) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }

  if (error instanceof ForbidenError && !devEnv) {
    logger.error(error.name);
    return res.status(500).json({ error: error.userMessage });
  }

  if (error instanceof Error) {
    logger.error(error.name + ' ' + error.message);
    return res.status(500).json({ error: 'Somethign went wrong' });
  }

  if (res.app.get('env') !== 'development') {
    return res.status(500).send('Internal Server Error');
  } else {
    if (error instanceof Error) {
      logger.error('Unknow error' + ' ' + error.message);
      return res.status(500).send({ error: error.message });
    }
  }
};

import { NextFunction, Request, Response } from "express";
// import DatabaseError from "../helpers/errors/database.error";
import ServerError from "../helpers/errors/server.error";
import AuthorizationError from "../helpers/errors/unauthorized.error";
import ValidationError from "../helpers/errors/validation.error";
import logger from "../helpers/logger";
import NotFoundError from "../helpers/errors/not-found.error";
import UserInputError from "../helpers/errors/user-input.error";
import DatabaseError from "../helpers/errors/database.error";

export const errorHandler = (error: any, _req: Request, res: Response, next: NextFunction) => {

  if (error instanceof ValidationError) {
    logger.error(error.name + " " + error.message);
    return res.status(error.status).json({
      error: 'Invalid data',
    });
  }

  if (error instanceof AuthorizationError || error instanceof ServerError || error instanceof NotFoundError || error instanceof UserInputError) {
    logger.error(error.name + " " + error.message);
    return res.status(error.status).json({ error: error.userMessage });
  }

  if (error instanceof DatabaseError) {
    logger.error(error.name + " " + error.message);
    return res.status(error.status).json({ error: error.userMessage });
  }

  if (res.app.get('env') !== 'development') {
    return res.status(500).send('Internal Server Error');
  } else {
    logger.error("Unknow error" + " " + error.message);
    return res.status(500).send({ error: error.message });
  }
}
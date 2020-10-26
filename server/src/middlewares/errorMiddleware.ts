import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import AppError from '../errors/AppError';

export const routeNotFound = (req: Request) => {
  throw new AppError(`Not found - ${req.originalUrl}`);
};

export const errorHandler = (
  error: Error,
  __: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      message: error.message,
    });
  }

  if (error instanceof ValidationError) {
    const errorsMap: Record<string, string> = {};

    error.inner.map(({ path, message }) => {
      errorsMap[path] = message;
    });

    console.log(error);
    return res.status(400).send({ type: 'Invalid fields', fields: errorsMap });
  }

  console.error(`Unexpected error ${error}`.red);

  return res.status(500).send({ message: 'Internal server error.' });
};

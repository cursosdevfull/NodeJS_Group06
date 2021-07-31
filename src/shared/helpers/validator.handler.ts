import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IError } from './errors.handler';

export const validator = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(res.locals.parameters);

    if (result.hasOwnProperty('error')) {
      const listErrors: string[] = [];

      for (const detail of result.error.details) {
        listErrors.push(detail.message);
      }

      if (listErrors.length > 0) {
        const error: IError = new Error('Error in parameters');
        error.status = 411;
        error.message = 'Error in parameters';
        error.name = 'Error Parameters';
        error.stack = listErrors.join(', ');

        return next(error);
      }
    }

    next();
  };
};

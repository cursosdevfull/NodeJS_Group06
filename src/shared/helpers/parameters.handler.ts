import { NextFunction, Request, Response } from 'express';

export const mergeParameters = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('read parameters', req.body);
    let parameters = {};

    /* eslint no-prototype-builtins: "off" */
    if (req.hasOwnProperty('params')) {
      parameters = { ...req.params, ...parameters };
    }

    if (req.hasOwnProperty('body')) {
      parameters = { ...req.body, ...parameters };
    }

    if (
      req.hasOwnProperty('headers') &&
      req.headers.hasOwnProperty('authorization')
    ) {
      parameters = { authorization: req.headers.authorization, ...parameters };
    }

    if (req.hasOwnProperty('query')) {
      parameters = { ...req.query, ...parameters };
    }

    res.locals.parameters = parameters;
    next();
  };
};

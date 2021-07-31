import { NextFunction, Response, Request } from 'express';
import { ResponseDto } from './response.dto';
import { generateTrace } from './trace';

export interface IError extends Error {
  status?: number;
  traceId?: string;
}

export class ErrorHandler {
  static notFound(req: Request, res: Response, next: NextFunction) {
    const traceId = generateTrace();
    const err: IError = new Error('Path not found');
    err.status = 404;
    err.traceId = traceId;
    next(err);
  }

  static asyncError(
    ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      ftn(req, res, next).catch((err) => {
        let error: IError;

        error = new Error('Async Error');
        error.message = err.message;
        error.stack = err.stack;
        error.status = err.status;

        next(error);
      });
    };
  }

  static generic(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const objError: IError = {
      name: error.name,
      status: error.status,
      message: error.message,
    };

    if (process.env.NODE_ENV === 'development') {
      objError.stack = error.stack;
    }

    res
      .status(error.status)
      .json(ResponseDto.format<IError>(error.traceId, objError, 1, 'Error'));

    // res.status(error.status).json(objError);
  }
}

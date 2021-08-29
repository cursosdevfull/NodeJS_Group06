import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../user/application/user.service';
import { IError } from '../helpers/errors.handler';

export class AuthenticationGuard {
  static canActivate(request: Request, response: Response, next: NextFunction) {
    const headers = request.headers;
    const authorizationHeader = headers['authorization'];

    if (authorizationHeader) {
      const partsAuthentication = authorizationHeader.split(' ');

      if (partsAuthentication.length > 1) {
        const accessToken = partsAuthentication[1];

        UserService.validateAccessToken(accessToken).then(
          (payload) => {
            next();
          },
          (error) => {
            if (error.status === 401) {
              const error: IError = new Error('Usuario no autorizado');
              error.status = 401;
              next(error);
            } else if (error.status === 409) {
              const error: IError = new Error('Token expirado');
              error.status = 409;
              next(error);
            }
          }
        );
      }
    } else {
      const error: IError = new Error('Usuario no autenticado');
      error.status = 401;
      next(error);
    }
  }
}

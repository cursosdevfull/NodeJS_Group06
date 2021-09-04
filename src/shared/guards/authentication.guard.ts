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

        console.log('accessToken', accessToken);

        UserService.validateAccessToken(accessToken).then(
          (payload) => {
            response.locals.payload = payload;
            next();
          },
          (error) => {
            const messageError =
              error.status === 401 ? 'Usuario no autorizado' : 'Token expirado';
            const err: IError = new Error(messageError);
            err.status = error.status;
            next(err);
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

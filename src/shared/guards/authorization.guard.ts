import { NextFunction, Request, Response } from 'express';
import { IError } from '../helpers/errors.handler';

export class AuthorizationGuard {
  static canActivate(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { roles } = res.locals.payload;

      const userAuthorizated = this.isUserAuthorizated(roles, rolesAllowed);

      if (userAuthorizated) {
        next();
      } else {
        const error: IError = new Error('User not authorizated');
        error.status = 401;
        next(error);
      }
    };
  }

  static isUserAuthorizated(roles: string[], rolesAllowed: string[]): boolean {
    let roleMatched = false;
    for (const role of roles) {
      if (rolesAllowed.includes(role)) {
        roleMatched = true;
        break;
      }
    }

    return roleMatched;
  }
}

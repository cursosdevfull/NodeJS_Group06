import express from 'express';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { AuthorizationGuard } from '../../shared/guards/authorization.guard';
import { ErrorHandler, IError } from '../../shared/helpers/errors.handler';
import { mergeParameters } from '../../shared/helpers/parameters.handler';
import { validator } from '../../shared/helpers/validator.handler';
import { UploadMiddleware } from '../../shared/middlewares/upload.middleware';
import { UserController } from './user.controller';
import { schemas } from './user.schema';

const route = express.Router();
const userController = new UserController();

route.get(
  '/',
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate('ADMIN'),
  ErrorHandler.asyncError(userController.list)
);
route.post(
  '/',
  UploadMiddleware.S3('photo', 'image/gif', 'image/png', 'image/jpeg'),
  mergeParameters(),
  validator(schemas.INSERT),
  ErrorHandler.asyncError(userController.insert)
);
route.get(
  '/page/:page',
  mergeParameters(),
  validator(schemas.GET_PAGE),
  ErrorHandler.asyncError(userController.getPage)
);

route.get(
  '/:id',
  mergeParameters(),
  validator(schemas.GET_ONE),
  ErrorHandler.asyncError(userController.getOne)
);

route.put(
  '/:id',
  mergeParameters(),
  validator(schemas.UPDATE),
  ErrorHandler.asyncError(userController.update)
);
route.delete(
  '/:id',
  mergeParameters(),
  validator(schemas.DELETE),
  ErrorHandler.asyncError(userController.delete)
);

export { route };

import express from 'express';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { AuthorizationGuard } from '../../shared/guards/authorization.guard';
import { ErrorHandler, IError } from '../../shared/helpers/errors.handler';
import { mergeParameters } from '../../shared/helpers/parameters.handler';
import { validator } from '../../shared/helpers/validator.handler';
import { UploadMiddleware } from '../../shared/middlewares/upload.middleware';
import { UserController } from './user.controller';
import { schemas } from './user.schema';
import { RoleRepository } from '../../role/application/role.repository';
import { RoleOperation } from '../../role/infraestructure/role.operation';
import { UserRepository } from '../application/user.repository';
import { UserOperation } from '../infraestructure/user.operation';
import { UserUseCase } from '../application/user.usecase';
import { CacheRedis } from '../../shared/middlewares/cache.middleware';

const userOperation: UserRepository = new UserOperation();
const roleOperation: RoleRepository = new RoleOperation();
const userUseCase = new UserUseCase(userOperation, roleOperation);

const route = express.Router();
const userController = new UserController(userUseCase);

route.get(
  '/',
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate('ADMIN'),
  CacheRedis.handle('LIST_USERS'),
  ErrorHandler.asyncError(userController.list)
);
route.post(
  '/',
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate('ADMIN'),
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
  userController.getOne
  //ErrorHandler.asyncError(userController.getOne)
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

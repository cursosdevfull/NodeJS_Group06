import express from 'express';
import { ErrorHandler, IError } from '../../shared/helpers/errors.handler';
import { mergeParameters } from '../../shared/helpers/parameters.handler';
import { validator } from '../../shared/helpers/validator.handler';
import { UserController } from './user.controller';
import { schemas } from './user.schema';

const route = express.Router();
const userController = new UserController();

route.get('/', ErrorHandler.asyncError(userController.list));
route.post(
  '/',
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

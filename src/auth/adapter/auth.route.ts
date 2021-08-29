import express from 'express';
import { ErrorHandler } from '../../shared/helpers/errors.handler';
import { AuthController } from './auth.controller';

const route = express.Router();
const controller = new AuthController();

route.post('/login', ErrorHandler.asyncError(controller.login));
route.get(
  '/request-new-access-token/:refreshToken',
  ErrorHandler.asyncError(controller.getNewAccessToken)
);

export { route };

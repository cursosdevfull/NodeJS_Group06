import express from 'express';
import { ErrorHandler } from '../../shared/helpers/errors.handler';
import { RoleController } from './role.controller';

const route = express.Router();
const roleController = new RoleController();

route.get('/', ErrorHandler.asyncError(roleController.list));
route.post('/', ErrorHandler.asyncError(roleController.insert));
route.get('/page/:page', ErrorHandler.asyncError(roleController.getPage));
route.get('/:id', ErrorHandler.asyncError(roleController.getOne));
route.put('/:id', ErrorHandler.asyncError(roleController.update));
route.delete('/:id', ErrorHandler.asyncError(roleController.delete));

export { route };

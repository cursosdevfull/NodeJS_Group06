import express from 'express';
import { ErrorHandler } from '../../shared/helpers/errors.handler';
import { MedicController } from './medic.controller';

const route = express.Router();
const medicController = new MedicController();

route.get('/', ErrorHandler.asyncError(medicController.list));
route.post('/', ErrorHandler.asyncError(medicController.insert));
route.get('/page/:page', ErrorHandler.asyncError(medicController.getPage));
route.get('/:id', ErrorHandler.asyncError(medicController.getOne));
route.put('/:id', ErrorHandler.asyncError(medicController.update));
route.delete('/:id', ErrorHandler.asyncError(medicController.delete));

export { route };

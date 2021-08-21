import express from 'express';
import { ErrorHandler } from '../../shared/helpers/errors.handler';
import { DriverController } from './driver.controller';

const route = express.Router();
const driverController = new DriverController();

route.get('/', ErrorHandler.asyncError(driverController.list));
route.post('/', ErrorHandler.asyncError(driverController.insert));
route.get('/page/:page', ErrorHandler.asyncError(driverController.getPage));
route.get('/:id', ErrorHandler.asyncError(driverController.getOne));
route.put('/:id', ErrorHandler.asyncError(driverController.update));
route.delete('/:id', ErrorHandler.asyncError(driverController.delete));

export { route };

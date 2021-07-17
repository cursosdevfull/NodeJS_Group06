import express, { Request, Response } from 'express';
import { UserController } from './user.controller';

const route = express.Router();
const userController = new UserController();

route.get('/', userController.list);
route.post('/', userController.insert);
route.get('/page/:page', userController.getPage);
route.get('/:id', userController.getOne);
route.put('/:id', userController.update);
route.delete('/:id', userController.delete);

export { route };

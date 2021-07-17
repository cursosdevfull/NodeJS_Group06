import express, { Request, Response } from 'express';
import { UserController } from './user.controller';

const route = express.Router();
const userController = new UserController();

route.get('/', userController.list);
route.post('/', userController.insert);

export { route };

import express, { Request, Response } from 'express';
import { MedicController } from './medic.controller';

const route = express.Router();
const medicController = new MedicController();

route.get('/', medicController.list);
route.post('/', medicController.insert);
route.get('/page/:page', medicController.getPage);
route.get('/:id', medicController.getOne);
route.put('/:id', medicController.update);
route.delete('/:id', medicController.delete);

export { route };

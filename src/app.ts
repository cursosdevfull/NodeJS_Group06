import express, { Application, Request, Response } from 'express';
import { route as RouteUser } from './user/adapter/user.route';

const app: Application = express();
app.use('/users', RouteUser);

export default app;

import express, { Application } from 'express';
import { route as RouteUser } from './user/adapter/user.route';
import { route as RouteMedic } from './medic/adapter/medic.route';

const app: Application = express();

// Middlewares

app.use('/users', RouteUser);
app.use('/medics', RouteMedic);

// Manejo de excepciones

export default app;

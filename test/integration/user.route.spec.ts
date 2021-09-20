import app from '../../src/app';
import { DatabaseBootstrap } from '../../src/bootstrap/database.bootstrap';
import request from 'supertest';

const databaseBootstrap = new DatabaseBootstrap();

describe('user.route.ts', () => {
  beforeAll(async () => {
    await databaseBootstrap.initialize();
  });

  afterAll(async () => {
    await databaseBootstrap.closeConnection();
  });

  it('get /users without token', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(401);
    expect(response.body.payload.data.message).toBe('Usuario no autenticado');
  });
});

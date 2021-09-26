import app from '../../src/app';
import { DatabaseBootstrap } from '../../src/bootstrap/database.bootstrap';
import request from 'supertest';
import path from 'path';

const databaseBootstrap = new DatabaseBootstrap();

const tokenExpired =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2VyZ2lvIiwicGhvdG8iOiJ1c2VyLnBuZyIsInJvbGVzIjpbIkFETUlOIiwiT1BFUkFUT1IiXSwiaWF0IjoxNjMyNTc3NDcyLCJleHAiOjE2MzI1Nzc0NzZ9.o6bELkE8KA3_wgYDWGFoZSQUjyKRmTT8ED7gBETomm4';

const tokenValid =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2VyZ2lvIiwicGhvdG8iOiJ1c2VyLnBuZyIsInJvbGVzIjpbIkFETUlOIiwiT1BFUkFUT1IiXSwiaWF0IjoxNjMyNTc3NjU5LCJleHAiOjE2Mzc4MzM2NTl9.lOiGbrtt3PTX1w7H4Za7h8iKYfeLcP3-fghf0LCPIQI';

const TIMEOUT = 24 * 60 * 60 * 1000;

const numberRandom = Math.round(Math.random() * 100000 + 1);

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

  it('get /users with token expired', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${tokenExpired}`);
    expect(response.status).toBe(409);
    expect(response.body.payload.data.message).toBe('Token expirado');
  });

  it(
    'get /users with token valid',
    async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${tokenValid}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('trace');
      expect(response.body).toHaveProperty('payload');
      expect(response.body).toHaveProperty('payload.data');
      expect(response.body.payload.data.length).toBeGreaterThanOrEqual(1);
      expect(response.body.payload.data[0]).toHaveProperty('id');
      expect(response.body.payload.data[0]).toHaveProperty('name');
      expect(response.body.payload.data[0]).toHaveProperty('email');
      expect(response.body.payload.data[0]).toHaveProperty('photo');
      expect(response.body.payload.data[0]).toHaveProperty('roles');
    },
    TIMEOUT
  );

  it(
    'post /users',
    async () => {
      const response = await request(app)
        .post('/users')
        .field('name', 'username-' + numberRandom)
        .field('email', numberRandom + '@correo.com')
        .field('password', numberRandom)
        .field('roles', 1)
        .field('roles', 2)
        .attach('photo', path.join(__dirname, '../', 'mocks/medico.jpg'))
        .set('Authorization', 'Bearer ' + tokenValid);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('trace');
      expect(response.body).toHaveProperty('payload');
      expect(response.body).toHaveProperty('payload.data');
      expect(response.body.payload.data).toHaveProperty('id');
      expect(response.body.payload.data).toHaveProperty('name');
      expect(response.body.payload.data).toHaveProperty('email');
      expect(response.body.payload.data).toHaveProperty('photo');
      expect(response.body.payload.data).toHaveProperty('roles');
    },
    TIMEOUT
  );

  it(
    'post /users with error in parameters',
    async () => {
      const response = await request(app)
        .post('/users')
        .field('name', 'username-' + numberRandom)
        .field('email', numberRandom + '@correo.com')
        .field('password', numberRandom)
        .field('roles', 1)
        .field('roles', 2)
        .set('Authorization', 'Bearer ' + tokenValid);

      expect(response.status).toBe(411);
      expect(response.body).toHaveProperty('trace');
      expect(response.body).toHaveProperty('payload');
      expect(response.body).toHaveProperty('payload.data');
      expect(response.body.payload.data.message).toBe('Error in parameters');
    },
    TIMEOUT
  );
});

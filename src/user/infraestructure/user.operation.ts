import { UserRepository } from '../application/user.repository';
import { UserModel } from '../domain/user.model';

export class UserOperation implements UserRepository {
  getOne(id: number): Promise<UserModel> {
    console.log('Operations getOne');
    return Promise.resolve({
      id: 1,
      name: 'Janet',
      email: 'correo01@correo.com',
      password: '123',
      photo: 'foto.jgp',
      roles: ['OPERATOR'],
    });
  }
  getPage(page: number): Promise<UserModel[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'Janet',
        email: 'correo01@correo.com',
        password: '123',
        photo: 'foto.jgp',
        roles: ['OPERATOR'],
      },
      {
        id: 2,
        name: 'Marcela',
        email: 'correo02@correo.com',
        password: '123',
        photo: 'foto.jgp',
        roles: ['ADMIN'],
      },
    ]);
  }
  update(id: number, user: Partial<UserModel>): Promise<UserModel> {
    return Promise.resolve({
      id: 1,
      name: 'Janet',
      email: 'correo01@correo.com',
      password: '123',
      photo: 'foto.jgp',
      roles: ['OPERATOR'],
    });
  }
  delete(id: number): Promise<UserModel> {
    return Promise.resolve({
      id: 2,
      name: 'Marcela',
      email: 'correo02@correo.com',
      password: '123',
      photo: 'foto.jgp',
      roles: ['ADMIN'],
    });
  }
  list(): Promise<UserModel[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'Janet',
        email: 'correo01@correo.com',
        password: '123',
        photo: 'foto.jgp',
        roles: ['OPERATOR'],
      },
      {
        id: 2,
        name: 'Marcela',
        email: 'correo02@correo.com',
        password: '123',
        photo: 'foto.jgp',
        roles: ['ADMIN'],
      },
    ]);
  }
  insert(user: Omit<UserModel, 'id'>): Promise<UserModel> {
    return Promise.resolve({ id: 3, ...user } as UserModel);
  }
}

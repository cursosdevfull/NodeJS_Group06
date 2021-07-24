import { UserRequestDto } from '../application/user.dto';
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
      roles: [{ id: 1, name: 'OPERATOR' }],
    });
  }
  getPage(page: number): Promise<{ data: UserModel[]; total: number }> {
    return Promise.resolve({
      data: [
        {
          id: 1,
          name: 'Janet',
          email: 'correo01@correo.com',
          password: '123',
          photo: 'foto.jgp',
          roles: [{ id: 1, name: 'OPERATOR' }],
        },
        {
          id: 2,
          name: 'Marcela',
          email: 'correo02@correo.com',
          password: '123',
          photo: 'foto.jgp',
          roles: [{ id: 1, name: 'OPERATOR' }],
        },
      ],
      total: 2,
    });
  }
  update(id: number, user: Partial<UserModel>): Promise<UserModel> {
    return Promise.resolve({
      id: 1,
      name: 'Janet',
      email: 'correo01@correo.com',
      password: '123',
      photo: 'foto.jgp',
      roles: [{ id: 1, name: 'OPERATOR' }],
    });
  }
  delete(id: number): Promise<UserModel> {
    return Promise.resolve({
      id: 2,
      name: 'Marcela',
      email: 'correo02@correo.com',
      password: '123',
      photo: 'foto.jgp',
      roles: [{ id: 1, name: 'OPERATOR' }],
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
        roles: [{ id: 1, name: 'OPERATOR' }],
      },
      {
        id: 2,
        name: 'Marcela',
        email: 'correo02@correo.com',
        password: '123',
        photo: 'foto.jgp',
        roles: [{ id: 2, name: 'ADMIN' }],
      },
    ]);
  }
  insert(user: Omit<UserRequestDto, 'id'>): Promise<UserModel> {
    return Promise.resolve({
      id: 2,
      name: 'Marcela',
      email: 'correo02@correo.com',
      password: '123',
      photo: 'foto.jgp',
      roles: [{ id: 2, name: 'ADMIN' }],
    } as UserModel);
  }
}

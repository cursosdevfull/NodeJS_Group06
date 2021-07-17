import { UserModel } from '../domain/user.model';

export interface UserRepository {
  list(): Promise<UserModel[]>;
  getOne(id: number): Promise<UserModel>;
  getPage(page: number): Promise<UserModel[]>;
  insert(user: Omit<UserModel, 'id'>): Promise<UserModel>;
  update(id: number, user: Partial<UserModel>): Promise<UserModel>;
  delete(id: number): Promise<UserModel>;
}

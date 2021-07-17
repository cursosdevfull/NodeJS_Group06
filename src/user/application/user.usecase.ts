import { UserModel } from '../domain/user.model';
import { UserRepository } from './user.repository';

export class UserUseCase {
  constructor(private operation: UserRepository) {}

  async list(): Promise<UserModel[]> {
    return await this.operation.list();
  }

  async getOne(id: number): Promise<UserModel> {
    console.log('getOne');
    return await this.operation.getOne(id);
  }

  async update(id: number, user: Partial<UserModel>): Promise<UserModel> {
    return await this.operation.update(id, user);
  }

  async getPage(page: number): Promise<UserModel[]> {
    return await this.operation.getPage(page);
  }

  async insert(user: Omit<UserModel, 'id'>): Promise<UserModel> {
    return await this.operation.insert(user);
  }

  async delete(id: number): Promise<UserModel> {
    return await this.operation.delete(id);
  }
}

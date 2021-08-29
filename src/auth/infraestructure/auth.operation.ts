import { Repository, getRepository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UserModel } from '../../user/domain/user.model';
import { AuthRepository } from '../application/auth.repository';

export class AuthOperation implements AuthRepository {
  async login(where: object, relations: string[]): Promise<UserModel> {
    const repository: Repository<UserEntity> = getRepository(UserEntity);
    const data: UserModel = await repository.findOne({ where, relations });
    return data;
  }

  async getUserByRefreshToken(
    where: object,
    relations: string[]
  ): Promise<UserModel> {
    console.log('where', where);
    const repository: Repository<UserEntity> = getRepository(UserEntity);
    const data: UserModel = await repository.findOne({
      where,
      relations,
    });
    console.log('data', data);
    return data;
  }
}

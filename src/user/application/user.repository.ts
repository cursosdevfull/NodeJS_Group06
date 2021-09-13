import { RepositoryBase } from '../../shared/application/base.repository';
import { UserModel } from '../domain/user.model';

export type UserRepository = RepositoryBase<UserModel>;

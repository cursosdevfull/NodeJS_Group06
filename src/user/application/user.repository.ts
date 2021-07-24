import { BaseClass } from '../../shared/application/base.class';
import { UserModel } from '../domain/user.model';

export interface UserRepository extends BaseClass<UserModel> {}

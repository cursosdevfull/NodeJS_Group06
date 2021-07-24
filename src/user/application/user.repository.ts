import { BaseClass } from '../../shared/application/base.class';
import { UserModel } from '../domain/user.model';
import { UserRequestDto } from './user.dto';

export interface UserRepository extends BaseClass<UserModel, UserRequestDto> {}

import { UserEntity } from '../../entities/user.entity';
import { OperationRepository } from '../../shared/infraestructure/operation.repository';
import { UserRequestDto } from '../application/user.dto';
import { UserRepository } from '../application/user.repository';
import { UserModel } from '../domain/user.model';

export class UserOperation
  extends OperationRepository<UserEntity>
  implements UserRepository
{
  constructor() {
    super(UserEntity);
  }
}

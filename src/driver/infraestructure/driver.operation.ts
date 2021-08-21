import { DriverRepository } from '../application/driver.repository';
import { DriverEntity } from '../../entities/driver.entity';
import { OperationRepository } from '../../shared/infraestructure/operation.repository';

export class DriverOperation
  extends OperationRepository<DriverEntity>
  implements DriverRepository
{
  constructor() {
    super(DriverEntity);
  }
}

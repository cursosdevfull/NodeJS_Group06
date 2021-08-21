import { MedicRepository } from '../application/medic.repository';
import { MedicEntity } from '../../entities/medic.entity';
import { OperationRepository } from '../../shared/infraestructure/operation.repository';

export class MedicOperation
  extends OperationRepository<MedicEntity>
  implements MedicRepository
{
  constructor() {
    super(MedicEntity);
  }

  report(): Promise<MedicEntity[]> {
    throw new Error('Method not implemented.');
  }
}

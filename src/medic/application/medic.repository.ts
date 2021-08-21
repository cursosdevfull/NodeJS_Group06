import { MedicEntity } from '../../entities/medic.entity';
import { RepositoryBase } from '../../shared/application/base.repository';

export interface MedicRepository extends RepositoryBase<MedicEntity> {
  report(): Promise<MedicEntity[]>;
}

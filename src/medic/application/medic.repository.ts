import { BaseClass } from '../../shared/application/base.class';
import { MedicModel } from '../domain/medic.model';

export interface MedicRepository extends BaseClass<MedicModel, MedicModel> {}

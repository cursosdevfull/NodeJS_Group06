import { Result } from '../../shared/application/result.repository';
import { ResponseDto } from '../../shared/helpers/response.dto';
import { generateTrace } from '../../shared/helpers/trace';
import { MedicModel } from '../domain/medic.model';
import { MedicResponseDto, mappingMedicDto } from './medic.dto';
import { MedicRepository } from './medic.repository';

export class MedicUseCase {
  constructor(private operation: MedicRepository) {}

  async list(): Promise<Result<MedicResponseDto>> {
    const traceId = generateTrace();
    const result: MedicModel[] = await this.operation.list();

    return ResponseDto.format<MedicResponseDto>(
      traceId,
      mappingMedicDto(result),
      1,
      'MedicUseCase, List'
    );
  }

  async getOne(id: number): Promise<Result<MedicResponseDto>> {
    const traceId = generateTrace();
    const result: MedicModel = await this.operation.getOne(id);

    return ResponseDto.format<MedicResponseDto>(
      traceId,
      mappingMedicDto(result),
      1,
      'MedicUseCase, GetOne'
    );
  }

  async update(
    id: number,
    user: Partial<MedicModel>
  ): Promise<Result<MedicResponseDto>> {
    const traceId = generateTrace();
    const result: MedicModel = await this.operation.update(id, user);

    return ResponseDto.format<MedicResponseDto>(
      traceId,
      mappingMedicDto(result),
      1,
      'MedicUseCase, Update'
    );
  }

  async getPage(page: number): Promise<Result<MedicResponseDto>> {
    const traceId = generateTrace();
    const result: { data: MedicModel[]; total: number } =
      await this.operation.getPage(page);

    return ResponseDto.format<MedicResponseDto>(
      traceId,
      mappingMedicDto(result.data),
      1,
      'MedicUseCase, GetPage',
      result.total
    );
  }

  async insert(
    medic: Omit<MedicModel, 'id'>
  ): Promise<Result<MedicResponseDto>> {
    const traceId = generateTrace();
    const result: MedicModel = await this.operation.insert(medic);

    return ResponseDto.format<MedicResponseDto>(
      traceId,
      mappingMedicDto(result),
      1,
      'MedicUseCase, Insert'
    );
  }

  async delete(id: number): Promise<Result<MedicResponseDto>> {
    const traceId = generateTrace();
    const result: MedicModel = await this.operation.delete(id);

    return ResponseDto.format<MedicResponseDto>(
      traceId,
      mappingMedicDto(result),
      1,
      'MedicUseCase, Delete'
    );
  }
}

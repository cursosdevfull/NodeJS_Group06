import { Result } from '../../shared/application/result.repository';
import { ResponseDto } from '../../shared/helpers/response.dto';
import { generateTrace } from '../../shared/helpers/trace';
import { DriverModel } from '../domain/driver.model';
import { DriverResponseDto, mappingDriverDto } from './driver.dto';
import { DriverRepository } from './driver.repository';

export class DriverUseCase {
  constructor(private operation: DriverRepository) {}

  async list(): Promise<Result<DriverResponseDto>> {
    const traceId = generateTrace();
    const result: DriverModel[] = await this.operation.list(
      { gender: 1 },
      [],
      {}
    );

    return ResponseDto.format<DriverResponseDto>(
      traceId,
      mappingDriverDto(result),
      1,
      'DriverUseCase, List'
    );
  }

  async getOne(id: number): Promise<Result<DriverResponseDto>> {
    const traceId = generateTrace();
    const result: DriverModel = await this.operation.getOne(id);

    return ResponseDto.format<DriverResponseDto>(
      traceId,
      mappingDriverDto(result),
      1,
      'DriverUseCase, GetOne'
    );
  }

  async update(
    id: number,
    user: Partial<DriverModel>
  ): Promise<Result<DriverResponseDto>> {
    const traceId = generateTrace();
    const result: DriverModel = await this.operation.update(id, user);

    return ResponseDto.format<DriverResponseDto>(
      traceId,
      mappingDriverDto(result),
      1,
      'DriverUseCase, Update'
    );
  }

  async getPage(page: number): Promise<Result<DriverResponseDto>> {
    const traceId = generateTrace();
    const result: { data: DriverModel[]; total: number } =
      await this.operation.getPage(page);

    return ResponseDto.format<DriverResponseDto>(
      traceId,
      mappingDriverDto(result.data),
      1,
      'DriverUseCase, GetPage',
      result.total
    );
  }

  async insert(
    driver: Partial<DriverModel>
  ): Promise<Result<DriverResponseDto>> {
    const traceId = generateTrace();

    const result: DriverModel = await this.operation.insert(driver);

    return ResponseDto.format<DriverResponseDto>(
      traceId,
      mappingDriverDto(result),
      1,
      'DriverUseCase, Insert'
    );
  }

  async delete(id: number): Promise<Result<DriverResponseDto>> {
    const traceId = generateTrace();
    const result: DriverModel = await this.operation.delete(id);

    return ResponseDto.format<DriverResponseDto>(
      traceId,
      mappingDriverDto(result),
      1,
      'DriverUseCase, Delete'
    );
  }
}

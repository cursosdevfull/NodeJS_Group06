import { Result } from '../../shared/application/result.repository';
import { ResponseDto } from '../../shared/helpers/response.dto';
import { generateTrace } from '../../shared/helpers/trace';
import { RoleModel } from '../domain/role.model';

import { RoleRepository } from './role.repository';

export class RoleUseCase {
  constructor(private operation: RoleRepository) {}

  async list(): Promise<Result<RoleModel>> {
    const traceId = generateTrace();
    const result: RoleModel[] = await this.operation.list({}, [], {});

    return ResponseDto.format<RoleModel>(
      traceId,
      result,
      1,
      'RoleUseCase, List'
    );
  }

  async getOne(id: number): Promise<Result<RoleModel>> {
    const traceId = generateTrace();
    const result: RoleModel = await this.operation.getOne(id);

    return ResponseDto.format<RoleModel>(
      traceId,
      result,
      1,
      'RoleUseCase, GetOne'
    );
  }

  async update(
    id: number,
    user: Partial<RoleModel>
  ): Promise<Result<RoleModel>> {
    const traceId = generateTrace();
    const result: RoleModel = await this.operation.update(id, user);

    return ResponseDto.format<RoleModel>(
      traceId,
      result,
      1,
      'RoleUseCase, Update'
    );
  }

  async getPage(page: number): Promise<Result<RoleModel>> {
    const traceId = generateTrace();
    const result: { data: RoleModel[]; total: number } =
      await this.operation.getPage(page);

    return ResponseDto.format<RoleModel>(
      traceId,
      result.data,
      1,
      'RoleUseCase, GetPage',
      result.total
    );
  }

  async insert(role: Partial<RoleModel>): Promise<Result<RoleModel>> {
    const traceId = generateTrace();

    const result: RoleModel = await this.operation.insert(role);

    return ResponseDto.format<RoleModel>(
      traceId,
      result,
      1,
      'RoleUseCase, Insert'
    );
  }

  async delete(id: number): Promise<Result<RoleModel>> {
    const traceId = generateTrace();
    const result: RoleModel = await this.operation.delete(id);

    return ResponseDto.format<RoleModel>(
      traceId,
      result,
      1,
      'RoleUseCase, Delete'
    );
  }
}

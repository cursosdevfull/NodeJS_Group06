import { RoleRepository } from '../../role/application/role.repository';
import { RoleModel } from '../../role/domain/role.model';
import { Result } from '../../shared/application/result.repository';
import { ResponseDto } from '../../shared/helpers/response.dto';
import { generateTrace } from '../../shared/helpers/trace';
import { UserModel } from '../domain/user.model';
import { mappingUserDto, UserRequestDto, UserResponseDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

export class UserUseCase {
  constructor(
    private operation: UserRepository,
    private operationRoles: RoleRepository
  ) {}

  async list(): Promise<Result<UserResponseDto>> {
    const traceId = generateTrace();
    const result: UserModel[] = await this.operation.list({}, ['roles'], {});

    return ResponseDto.format<UserResponseDto>(
      traceId,
      mappingUserDto(result),
      1,
      'UserUseCase, List'
    );
  }

  async getOne(id: number): Promise<Result<UserResponseDto>> {
    const traceId = generateTrace();
    const result: UserModel = await this.operation.getOne(id);

    return ResponseDto.format<UserResponseDto>(
      traceId,
      mappingUserDto(result),
      1,
      'UserUseCase, GetOne'
    );
  }

  async update(
    id: number,
    user: Partial<UserModel>
  ): Promise<Result<UserResponseDto>> {
    const traceId = generateTrace();
    const result: UserModel = await this.operation.update(id, user);

    return ResponseDto.format<UserResponseDto>(
      traceId,
      mappingUserDto(result),
      1,
      'UserUseCase, Update'
    );
  }

  async getPage(page: number): Promise<Result<UserResponseDto>> {
    const traceId = generateTrace();
    const result: { data: UserModel[]; total: number } =
      await this.operation.getPage(page);

    return ResponseDto.format<UserResponseDto>(
      traceId,
      mappingUserDto(result.data),
      1,
      'UserUseCase, GetPage',
      result.total
    );
  }

  async insert(user: Partial<UserModel>): Promise<Result<UserResponseDto>> {
    const newUser = Object.assign({}, user);
    newUser.password = await UserService.cryptPassword(newUser.password);
    newUser.refreshToken = UserService.generateRefreshToken();

    const listRoles: any[] = [];
    newUser.roles.forEach((roleId) => {
      listRoles.push(this.operationRoles.getOne(+roleId));
    });

    const roles = await Promise.all(listRoles);

    newUser.roles = roles;

    const traceId = generateTrace();
    const result: UserModel = await this.operation.insert(newUser);

    return ResponseDto.format<UserResponseDto>(
      traceId,
      mappingUserDto(result),
      1,
      'UserUseCase, Insert'
    );
  }

  async delete(id: number): Promise<Result<UserResponseDto>> {
    const traceId = generateTrace();
    const result: UserModel = await this.operation.delete(id);

    return ResponseDto.format<UserResponseDto>(
      traceId,
      mappingUserDto(result),
      1,
      'UserUseCase, Delete'
    );
  }
}

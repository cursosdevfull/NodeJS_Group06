import { NextFunction, Request, Response } from 'express';
import { UserUseCase } from '../application/user.usecase';
import { UserOperation } from '../infraestructure/user.operation';
import { UserModel } from '../domain/user.model';
import { UserRepository } from '../application/user.repository';
import { Result } from '../../shared/application/result.repository';
import { UserRequestDto, UserResponseDto } from '../application/user.dto';
import { RoleRepository } from '../../role/application/role.repository';
import { RoleOperation } from '../../role/infraestructure/role.operation';

const userOperation: UserRepository = new UserOperation();
const roleOperation: RoleRepository = new RoleOperation();
const userUseCase = new UserUseCase(userOperation, roleOperation);
export class UserController {
  async list(request: Request, response: Response) {
    const result: Result<UserResponseDto> = await userUseCase.list();
    response.json(result);
  }

  async getOne(request: Request, response: Response) {
    const id = +request.params.id;
    const result: Result<UserResponseDto> = await userUseCase.getOne(id);
    response.json(result);
  }

  async update(request: Request, response: Response) {
    const user: Partial<UserModel> = request.body;
    const id: number = +request.params.id;
    const result: Result<UserResponseDto> = await userUseCase.update(id, user);
    response.json(result);
  }

  async delete(request: Request, response: Response) {
    const id = +request.params.id;
    const result: Result<UserResponseDto> = await userUseCase.delete(id);
    response.json(result);
  }

  async getPage(request: Request, response: Response) {
    const page = +request.params.page;
    const result: Result<UserResponseDto> = await userUseCase.getPage(page);
    response.json(result);
  }

  async insert(request: Request, response: Response) {
    const user: Partial<UserModel> = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      photo: request.body.photo,
      roles: request.body.roles,
    };
    const result: Result<UserResponseDto> = await userUseCase.insert(user);
    response.json(result);
  }
}

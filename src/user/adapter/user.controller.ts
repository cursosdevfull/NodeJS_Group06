import { Request, Response } from 'express';
import { UserUseCase } from '../application/user.usecase';
import { UserOperation } from '../infraestructure/user.operation';
import { UserModel } from '../domain/user.model';
import { UserRepository } from '../application/user.repository';
import { Result } from '../../shared/application/result.repository';
import { UserRequestDto, UserResponseDto } from '../application/user.dto';

const userOperation: UserRepository = new UserOperation();
const userUseCase = new UserUseCase(userOperation);
export class UserController {
  async list(request: Request, response: Response) {
    const result: Result<UserResponseDto> = await userUseCase.list();
    response.json(result);
  }

  async getOne(request: Request, response: Response) {
    const result: Result<UserResponseDto> = await userUseCase.getOne(1);
    response.json(result);
  }

  async update(request: Request, response: Response) {
    const user: Partial<UserModel> = {
      photo: 'andrea.jpg',
    };
    const result: Result<UserResponseDto> = await userUseCase.update(1, user);
    response.json(result);
  }

  async delete(request: Request, response: Response) {
    const result: Result<UserResponseDto> = await userUseCase.delete(1);
    response.json(result);
  }

  async getPage(request: Request, response: Response) {
    const result: Result<UserResponseDto> = await userUseCase.getPage(1);
    response.json(result);
  }

  async insert(request: Request, response: Response) {
    const user: Omit<UserRequestDto, 'id'> = {
      name: 'Andrea',
      email: 'correo03@correo.com',
      password: '123',
      photo: 'andrea.jpg',
      roles: [1, 2],
    };
    const result: Result<UserResponseDto> = await userUseCase.insert(user);
    response.json(result);
  }
}

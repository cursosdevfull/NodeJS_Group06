import { Request, Response } from 'express';
import { UserUseCase } from '../application/user.usecase';

import { UserModel } from '../domain/user.model';

import { Result } from '../../shared/application/result.repository';
import { UserResponseDto } from '../application/user.dto';

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async list(request: Request, response: Response) {
    const result: Result<UserResponseDto> = await this.userUseCase.list();
    response.json(result);
  }

  async getOne(request: Request, response: Response) {
    const id = +request.params.id;
    const result: Result<UserResponseDto> = await this.userUseCase.getOne(id);
    response.json(result);
  }

  async update(request: Request, response: Response) {
    const user: Partial<UserModel> = request.body;
    const id: number = +request.params.id;
    const result: Result<UserResponseDto> = await this.userUseCase.update(
      id,
      user
    );
    response.json(result);
  }

  async delete(request: Request, response: Response) {
    const id = +request.params.id;
    const result: Result<UserResponseDto> = await this.userUseCase.delete(id);
    response.json(result);
  }

  async getPage(request: Request, response: Response) {
    const page = +request.params.page;
    const result: Result<UserResponseDto> = await this.userUseCase.getPage(
      page
    );
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
    const result: Result<UserResponseDto> = await this.userUseCase.insert(user);
    response.json(result);
  }
}

import { Request, Response } from 'express';
import { UserModel } from '../../user/domain/user.model';
import { AuthRepository } from '../application/auth.repository';
import { AuthUseCase } from '../application/auth.usecase';
import { AuthOperation } from '../infraestructure/auth.operation';

const operation: AuthRepository = new AuthOperation();
const useCase = new AuthUseCase(operation);

export class AuthController {
  async login(request: Request, response: Response) {
    const body: any = request.body;
    const user: Partial<UserModel> = {
      email: body.email,
      password: body.password,
    };

    const result = await useCase.login(user);
    response.json(result);
  }

  async getNewAccessToken(request: Request, response: Response) {
    const params = request.params;
    const user: Partial<UserModel> = {
      refreshToken: params.refreshToken,
    };

    const result = await useCase.getNewAccessToken(user);

    if (result) {
      return response.json(result);
    }
    return response.status(401).send('User not found');
  }
}

import { UserModel } from '../../user/domain/user.model';
import { AuthRepository } from './auth.repository';
import { Tokens } from './tokens.interface';
import { UserService } from '../../user/application/user.service';
import { RoleModel } from '../../role/domain/role.model';

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async login(entity: Partial<UserModel>): Promise<Tokens> {
    const user: UserModel = await this.authRepository.login(
      { email: entity.email },
      ['roles']
    );

    if (user) {
      const match = await UserService.decryptPassword(
        entity.password,
        user.password
      );

      if (match) {
        const accessToken = UserService.generateAccessToken(
          user.name,
          user.photo,
          (user.roles as RoleModel[]).map((role) => role.name)
        );

        return { accessToken, refreshToken: user.refreshToken };
      }
      return null;
    }

    return null;
  }

  async getNewAccessToken(entity: Partial<UserModel>) {
    const user: UserModel = await this.authRepository.getUserByRefreshToken(
      { refreshToken: entity.refreshToken },
      ['roles']
    );

    if (user) {
      const accessToken = UserService.generateAccessToken(
        user.name,
        user.photo,
        (user.roles as RoleModel[]).map((role) => role.name)
      );
      return { accessToken, refreshToken: user.refreshToken };
    }

    return null;
  }
}

import { UserUseCase } from '../../src/user/application/user.usecase';
import { UserOperation } from '../../src/user/infraestructure/user.operation';
import { RoleOperation } from '../../src/role/infraestructure/role.operation';
import mockUsers from '../mocks/list-users-operation.json';
import mockUser from '../mocks/user.json';
import mockRole from '../mocks/role.json';
import mockUserInserted from '../mocks/user-inserted.json';
import mockUserInsertedFormatted from '../mocks/user-inserted-formatted.json';
import { UserService } from '../../src/user/application/user.service';
import { generateTrace } from '../../src/shared/helpers/trace';

describe('user.usecase.ts', () => {
  it('list', async () => {
    // Preparación
    (UserOperation as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn().mockResolvedValue(mockUsers),
    });

    const operationUser = new UserOperation();
    const operationRoles = new RoleOperation();

    // Ejecución
    const userUseCase = new UserUseCase(operationUser, operationRoles);
    const response = await userUseCase.list();

    // Comprobación
    expect(response).toHaveProperty('trace');
    expect(response).toHaveProperty('payload');
    expect(response).toHaveProperty('payload.data');
    expect(response.payload.data).not.toBeNull();
    expect(Array.isArray(response.payload.data)).toBeTruthy();
    expect(operationUser.list).toHaveBeenCalled();
    expect(operationUser.list).toHaveBeenCalledTimes(1);
    expect(operationUser.list).toHaveBeenCalledWith({}, ['roles'], {});
  });

  it('insert', async () => {
    UserService.cryptPassword = jest
      .fn()
      .mockReturnValue(
        '$2a$10$1m5lB31vy5uHEcjVxVUbEetNRlDCj5gTjhIWR5hE/CMhlp2Z61iGm'
      );

    UserService.generateRefreshToken = jest
      .fn()
      .mockReturnValue('972b2306-c3b3-4481-b6f9-81f1309ba433');

    (RoleOperation as jest.Mock) = jest.fn().mockReturnValue({
      getOne: jest.fn().mockResolvedValue(mockRole),
    });

    (UserOperation as jest.Mock) = jest.fn().mockReturnValue({
      insert: jest.fn().mockResolvedValue(mockUserInserted),
    });

    (generateTrace as jest.Mock) = jest
      .fn()
      .mockReturnValue('3d381b15-332f-48b6-90c3-4af0a43efa9a');

    const operationUser = new UserOperation();
    const operationRole = new RoleOperation();
    const userUseCase = new UserUseCase(operationUser, operationRole);

    const response = await userUseCase.insert(mockUser);

    expect(UserService.cryptPassword).toHaveBeenCalledTimes(1);
    expect(UserService.generateRefreshToken).toHaveBeenCalledTimes(1);
    expect(operationRole.getOne).toHaveBeenCalledTimes(2);
    expect(response).toEqual(mockUserInsertedFormatted);
  });
});

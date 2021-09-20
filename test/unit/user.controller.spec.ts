import * as httpMock from 'node-mocks-http';
import { UserUseCase } from '../../src/user/application/user.usecase';
import { UserOperation } from '../../src/user/infraestructure/user.operation';
import { RoleOperation } from '../../src/role/infraestructure/role.operation';
import mockUsers from '../mocks/list-users.json';
import { UserController } from '../../src/user/adapter/user.controller';

let req: any, res: any, next;

describe('user.controller.ts', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
  });

  it('list', async () => {
    (UserOperation as jest.Mock) = jest.fn();
    (RoleOperation as jest.Mock) = jest.fn();

    (UserUseCase as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn().mockResolvedValue(mockUsers),
    });

    const userOperation = new UserOperation();
    const roleOperation = new RoleOperation();
    const userUseCase = new UserUseCase(userOperation, roleOperation);

    const controller = new UserController(userUseCase);
    await controller.list(req, res);

    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result.payload.data).toEqual(mockUsers.payload.data);
  });
});

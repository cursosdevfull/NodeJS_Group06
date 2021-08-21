import { Request, Response } from 'express';
import { Result } from '../../shared/application/result.repository';
import { RoleModel } from '../domain/role.model';
import { RoleRepository } from '../application/role.repository';
import { RoleUseCase } from '../application/role.usecase';
import { RoleOperation } from '../infraestructure/role.operation';

const roleOperation: RoleRepository = new RoleOperation();
const roleUseCase = new RoleUseCase(roleOperation);

export class RoleController {
  async list(request: Request, response: Response) {
    const result: Result<RoleModel> = await roleUseCase.list();
    response.json(result);
  }

  async getOne(request: Request, response: Response) {
    const id: number = +request.params.id;
    const result: Result<RoleModel> = await roleUseCase.getOne(id);
    response.json(result);
  }

  async update(request: Request, response: Response) {
    const user: Partial<RoleModel> = request.body;
    const id: number = +request.params.id;
    const result: Result<RoleModel> = await roleUseCase.update(id, user);
    response.json(result);
  }

  async delete(request: Request, response: Response) {
    const id: number = +request.params.id;
    const result: Result<RoleModel> = await roleUseCase.delete(id);
    response.json(result);
  }

  async getPage(request: Request, response: Response) {
    const page: number = +request.params.page;
    const result: Result<RoleModel> = await roleUseCase.getPage(page);
    response.json(result);
  }

  async insert(request: Request, response: Response) {
    const role: Partial<RoleModel> = {
      name: request.body.name,
    };
    const result: Result<RoleModel> = await roleUseCase.insert(role);
    response.json(result);
  }
}

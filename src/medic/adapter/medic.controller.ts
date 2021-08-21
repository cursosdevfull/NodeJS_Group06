import { Request, Response } from 'express';
import { Result } from '../../shared/application/result.repository';
import { MedicModel } from '../domain/medic.model';
import { MedicResponseDto } from '../application/medic.dto';
import { MedicRepository } from '../application/medic.repository';
import { MedicUseCase } from '../application/medic.usecase';
import { MedicOperation } from '../infraestructure/medic.operation';

const medicOperation: MedicRepository = new MedicOperation();
const medicUseCase = new MedicUseCase(medicOperation);
export class MedicController {
  async list(request: Request, response: Response) {
    const result: Result<MedicResponseDto> = await medicUseCase.list();
    response.json(result);
  }

  async getOne(request: Request, response: Response) {
    const id: number = +request.params.id;
    const result: Result<MedicResponseDto> = await medicUseCase.getOne(id);
    response.json(result);
  }

  async update(request: Request, response: Response) {
    const user: Partial<MedicModel> = request.body;
    const id: number = +request.params.id;
    const result: Result<MedicResponseDto> = await medicUseCase.update(
      id,
      user
    );
    response.json(result);
  }

  async delete(request: Request, response: Response) {
    const id: number = +request.params.id;
    const result: Result<MedicResponseDto> = await medicUseCase.delete(id);
    response.json(result);
  }

  async getPage(request: Request, response: Response) {
    const page: number = +request.params.page;
    const result: Result<MedicResponseDto> = await medicUseCase.getPage(page);
    response.json(result);
  }

  async insert(request: Request, response: Response) {
    const medic: Partial<MedicModel> = {
      name: request.body.name,
      lastname: request.body.lastname,
      identifier: request.body.identifier,
    };
    const result: Result<MedicResponseDto> = await medicUseCase.insert(medic);
    response.json(result);
  }
}

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
    const result: Result<MedicResponseDto> = await medicUseCase.getOne(1);
    response.json(result);
  }

  async update(request: Request, response: Response) {
    const user: Partial<MedicModel> = {
      lastname: 'hidalgo',
    };
    const result: Result<MedicResponseDto> = await medicUseCase.update(1, user);
    response.json(result);
  }

  async delete(request: Request, response: Response) {
    const result: Result<MedicResponseDto> = await medicUseCase.delete(1);
    response.json(result);
  }

  async getPage(request: Request, response: Response) {
    const result: Result<MedicResponseDto> = await medicUseCase.getPage(1);
    response.json(result);
  }

  async insert(request: Request, response: Response) {
    const medic: Omit<MedicModel, 'id'> = {
      name: 'Andrea',
      lastname: 'Veliz',
      identifier: '123',
    };
    const result: Result<MedicResponseDto> = await medicUseCase.insert(medic);
    response.json(result);
  }
}

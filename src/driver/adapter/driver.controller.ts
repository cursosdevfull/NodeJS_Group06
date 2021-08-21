import { Request, Response } from 'express';
import { Result } from '../../shared/application/result.repository';
import { DriverModel } from '../domain/driver.model';
import { DriverResponseDto } from '../application/driver.dto';
import { DriverRepository } from '../application/driver.repository';
import { DriverUseCase } from '../application/driver.usecase';
import { DriverOperation } from '../infraestructure/driver.operation';

const driverOperation: DriverRepository = new DriverOperation();
const driverUseCase = new DriverUseCase(driverOperation);
export class DriverController {
  async list(request: Request, response: Response) {
    const result: Result<DriverResponseDto> = await driverUseCase.list();
    response.json(result);
  }

  async getOne(request: Request, response: Response) {
    const id: number = +request.params.id;
    const result: Result<DriverResponseDto> = await driverUseCase.getOne(id);
    response.json(result);
  }

  async update(request: Request, response: Response) {
    const user: Partial<DriverModel> = request.body;
    const id: number = +request.params.id;
    const result: Result<DriverResponseDto> = await driverUseCase.update(
      id,
      user
    );
    response.json(result);
  }

  async delete(request: Request, response: Response) {
    const id: number = +request.params.id;
    const result: Result<DriverResponseDto> = await driverUseCase.delete(id);
    response.json(result);
  }

  async getPage(request: Request, response: Response) {
    const page: number = +request.params.page;
    const result: Result<DriverResponseDto> = await driverUseCase.getPage(page);
    response.json(result);
  }

  async insert(request: Request, response: Response) {
    const driver: Partial<DriverModel> = {
      name: request.body.name,
      lastname: request.body.lastname,
      driverLicense: request.body.driverLicense,
      isoCountry: request.body.isoCountry,
    };
    const result: Result<DriverResponseDto> = await driverUseCase.insert(
      driver
    );
    response.json(result);
  }
}

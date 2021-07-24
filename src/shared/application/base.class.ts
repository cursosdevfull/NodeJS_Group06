import { GeneralRepository, GenericRepository } from './base.repository';

export abstract class BaseClass<T>
  implements GenericRepository<T>, GeneralRepository<T>
{
  abstract getOne(id: number): Promise<T>;
  abstract insert(entity: Omit<T, 'id'>): Promise<T>;
  abstract update(id: number, entity: Partial<T>): Promise<T>;
  abstract delete(id: number): Promise<T>;
  abstract list(): Promise<T[]>;
  abstract getPage(page: number): Promise<{ data: T[]; total: number }>;
}

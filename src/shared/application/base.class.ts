/* import { GeneralRepository, GenericRepository } from './base.repository';

export abstract class BaseClass<T, U>
  implements GenericRepository<T, U>, GeneralRepository<T>
{
  abstract getOne(id: number): Promise<T>;
  abstract insert(entity: Omit<U, 'id'>): Promise<T>;
  abstract update(id: number, entity: Partial<T>): Promise<T>;
  abstract delete(id: number): Promise<T>;
  abstract list(): Promise<T[]>;
  abstract getPage(page: number): Promise<{ data: T[]; total: number }>;
} */

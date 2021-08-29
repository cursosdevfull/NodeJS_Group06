import { getRepository, ObjectType, Repository } from 'typeorm';
import yenv from 'yenv';

const env = yenv();

export abstract class OperationRepository<T> {
  constructor(private entity: ObjectType<T>) {}

  async getOne(id: number): Promise<T> {
    const repository: Repository<T> = getRepository(this.entity);
    const data: T = await repository.findOne({ where: { id } });
    return data;
  }

  async getPage(page: number): Promise<{ data: T[]; total: number }> {
    const repository: Repository<T> = getRepository(this.entity);
    const [data, total] = await repository.findAndCount({
      skip: page * env.PAGE_SIZE,
      take: env.PAGE_SIZE,
    });

    return { data, total };
  }

  async update(id: number, medic: Partial<T>): Promise<T> {
    const repository: Repository<T> = getRepository(this.entity);
    let recordToUpdate = await repository.findOne({ where: { id: id } });

    recordToUpdate = Object.assign(recordToUpdate, medic);

    return await repository.save(recordToUpdate);
  }

  async delete(id: number): Promise<T> {
    const repository: Repository<T> = getRepository(this.entity);
    const recordToDelete = await repository.findOne({ where: { id } });

    if (recordToDelete) {
      await repository.delete(id);
      return recordToDelete;
    }

    return null;
  }

  async list(
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<T[]> {
    const repository: Repository<T> = getRepository(this.entity);
    const data: T[] = await repository.find({
      where,
      relations,
      order,
    });

    return data;
  }

  async insert(entity: T): Promise<T> {
    try {
      const repository: Repository<T> = getRepository(this.entity);
      const data: T = await repository.save(entity);
      console.log('data', data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

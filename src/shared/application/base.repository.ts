export interface RepositoryBase<T> {
  getOne(id: number): Promise<T>;
  getPage(page: number): Promise<{ data: T[]; total: number }>;
  update(id: number, medic: Partial<T>): Promise<T>;
  delete(id: number): Promise<T>;
  list(where: object, relations: string[], order: object): Promise<T[]>;
  insert(entity: Partial<T>): Promise<T>;
}

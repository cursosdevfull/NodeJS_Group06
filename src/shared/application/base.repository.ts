export interface GenericRepository<T> {
  getOne(id: number): Promise<T>;
  insert(entity: Omit<T, 'id'>): Promise<T>;
  update(id: number, entity: Partial<T>): Promise<T>;
  delete(id: number): Promise<T>;
}

export interface GeneralRepository<T> {
  list(): Promise<T[]>;
  getPage(page: number): Promise<T[]>;
}

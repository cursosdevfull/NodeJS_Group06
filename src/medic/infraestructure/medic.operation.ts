import { MedicRepository } from '../application/medic.repository';
import { MedicModel } from '../domain/medic.model';

export class MedicOperation implements MedicRepository {
  getOne(id: number): Promise<MedicModel> {
    return Promise.resolve({
      id: 1,
      name: 'Janet',
      lastname: 'Ayala',
      identifier: '123',
    });
  }
  getPage(page: number): Promise<{ data: MedicModel[]; total: number }> {
    return Promise.resolve({
      data: [
        {
          id: 1,
          name: 'Janet',
          lastname: 'Ayala',
          identifier: '123',
        },
        {
          id: 2,
          name: 'Janet',
          lastname: 'Ayala',
          identifier: '123',
        },
      ],
      total: 2,
    });
  }
  update(id: number, user: Partial<MedicModel>): Promise<MedicModel> {
    return Promise.resolve({
      id: 1,
      name: 'Janet',
      lastname: 'Ayala',
      identifier: '123',
    });
  }
  delete(id: number): Promise<MedicModel> {
    return Promise.resolve({
      id: 2,
      name: 'Janet',
      lastname: 'Ayala',
      identifier: '123',
    });
  }
  list(): Promise<MedicModel[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'Janet',
        lastname: 'Ayala',
        identifier: '123',
      },
      {
        id: 2,
        name: 'Janet',
        lastname: 'Ayala',
        identifier: '123',
      },
    ]);
  }
  insert(medic: Omit<MedicModel, 'id'>): Promise<MedicModel> {
    return Promise.resolve({ id: 3, ...medic } as MedicModel);
  }
}

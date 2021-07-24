import { MedicModel } from '../domain/medic.model';

export interface MedicResponseDto {
  id: number;
  fullName: string;
  identifier: string;
}

export const mappingMedicDto = (
  data: MedicModel | MedicModel[]
): MedicResponseDto | MedicResponseDto[] => {
  const isArray = Array.isArray(data);

  if (isArray) {
    return (data as MedicModel[]).reduce((accum, medic) => {
      const { id, name, lastname, identifier } = medic;
      accum.push({ id, fullName: `${name} ${lastname}`, identifier });
      return accum;
    }, []);
  } else {
    const { id, name, lastname, identifier } = data as MedicModel;
    return { id, fullName: `${name} ${lastname}`, identifier };
  }
};

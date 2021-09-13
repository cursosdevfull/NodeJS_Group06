import { DriverModel } from '../domain/driver.model';

export interface DriverResponseDto {
  id: number;
  fullName: string;
  driverLicense: string;
  isoCountry: string;
}

export const mappingDriverDto = (
  data: DriverModel | DriverModel[]
): DriverResponseDto | DriverResponseDto[] => {
  const isArray = Array.isArray(data);

  if (isArray) {
    return (data as DriverModel[]).reduce((accum, driver) => {
      const { id, name, lastname, driverLicense, isoCountry } = driver;
      accum.push({
        id,
        fullName: `${name} ${lastname}`,
        driverLicense,
        isoCountry,
      });
      return accum;
    }, []);
  }
  const { id, name, lastname, driverLicense, isoCountry } = data as DriverModel;
  return { id, fullName: `${name} ${lastname}`, driverLicense, isoCountry };
};

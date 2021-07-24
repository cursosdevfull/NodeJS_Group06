import { UserModel } from '../domain/user.model';

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  roles: any;
  photo: string;
}

export const mappingUserDto = (
  data: UserModel | UserModel[]
): UserResponseDto | UserResponseDto[] => {
  const isArray = Array.isArray(data);

  if (isArray) {
    return (data as UserModel[]).reduce((accum, user) => {
      const { id, name, email, roles, photo } = user;
      accum.push({ id, name, email, roles, photo });
      return accum;
    }, []);
  } else {
    const { id, name, email, roles, photo } = data as UserModel;
    return { id, name, email, roles, photo };
  }
};

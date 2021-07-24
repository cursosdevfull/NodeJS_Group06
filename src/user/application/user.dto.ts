import { RoleModel } from '../../role/domain/role.model';
import { UserModel } from '../domain/user.model';

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  roles: string[];
  photo: string;
}

export const mappingUserDto = (
  data: UserModel | UserModel[]
): UserResponseDto | UserResponseDto[] => {
  const isArray = Array.isArray(data);

  if (isArray) {
    return (data as UserModel[]).reduce((accum, user: UserModel) => {
      const { id, name, email, roles, photo } = user;
      accum.push({
        id,
        name,
        email,
        roles: roles.map((el: RoleModel) => el.name),
        photo,
      });
      return accum;
    }, []);
  } else {
    const { id, name, email, roles, photo } = data as UserModel;
    return {
      id,
      name,
      email,
      roles: roles.map((el: RoleModel) => el.name),
      photo,
    };
  }
};

export interface UserRequestDto {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: number[];
  photo: string;
}

import { RoleModel } from '../../role/domain/role.model';

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  photo: string;
  refreshToken: string;
  roles: RoleModel[];
}

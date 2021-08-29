import { v4 as uuidv4 } from 'uuid';
import * as bcryptjs from 'bcryptjs';
import moment from 'moment';
import yenv from 'yenv';
import jwt from 'jwt-simple';

const env = yenv();

export class UserService {
  static async cryptPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  static async decryptPassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return await bcryptjs.compare(password, passwordHash);
  }

  static validatePassword(
    password: string,
    passwordCrypt: string
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static generateAccessToken(name: string, photo: string, roles: string[]) {
    const iat = moment().unix();
    const exp = moment().add(env.TOKEN.TIMEOUT, 'seconds').unix();

    const payload = {
      name,
      photo,
      roles,
      iat,
      exp,
    };

    return jwt.encode(payload, env.TOKEN.KEYWORD_SECRET);
  }

  static validateAccessToken(accessToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(accessToken, env.TOKEN.KEYWORD_SECRET);
        resolve(payload);
      } catch (error) {
        if (error.message.toLowerCase() === 'token expired') {
          reject({
            status: 409,
            message: 'El accessToken ha expirado',
          });
        } else {
          reject({
            status: 401,
            message: 'Debe loguearse',
          });
        }
      }
    });
  }
}

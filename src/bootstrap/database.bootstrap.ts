import { IServerBootstrap } from './server.interface';
import yenv from 'yenv';
import { Connection, createConnection } from 'typeorm';
const env = yenv();

let client: Connection;

export class DatabaseBootstrap implements IServerBootstrap {
  async initialize(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const parametersConnection = {
        host: env.DATABASE.MYSQL.HOST, // process.env.DATABASE.MYSQL.HOST
        type: env.DATABASE.MYSQL.TYPE,
        username: env.DATABASE.MYSQL.USERNAME,
        password: env.DATABASE.MYSQL.PASSWORD,
        database: env.DATABASE.MYSQL.DATABASE,
        port: env.DATABASE.MYSQL.PORT,
        entities: [env.DATABASE.MYSQL.ENTITIES],
        synchronize: env.DATABASE.MYSQL.SYNCHRONIZE,
        extra: { connectionLimit: env.DATABASE.MYSQL.EXTRA_CONNECTIONS },
      };

      createConnection(parametersConnection).then(
        (connection) => {
          console.log('Connected to database');
          client = connection;
          resolve(true);
        },
        (error) => {
          console.log('Error connecting to database: ', error);
          reject(error);
        }
      );
    });

    await promise;
  }

  async closeConnection(): Promise<void> {
    try {
      await client.close();
    } catch (error) {}
  }
}

import { IServerBootstrap } from './server.interface';
import yenv from 'yenv';
import IORedis from 'ioredis';

const env = yenv();

let client: any;

export class RedisBootstrap implements IServerBootstrap {
  private client: IORedis.Redis;

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client = new IORedis({
        host: env.DATABASE.REDIS.HOST,
        port: env.DATABASE.REDIS.PORT,
        password: env.DATABASE.REDIS.PASSWORD,
        maxRetriesPerRequest: 5,
      });

      this.client
        .on('connect', () => {
          console.log('Connected to Redis');
          resolve(true);
        })
        .on('error', (error: any) => {
          console.log('Error connecting to Redis');
          reject(error);
        });

      client = this.client;
    });
  }

  getConnection() {
    return this.client;
  }

  static async get(key: string) {
    return await client.get(key);
  }

  static async set(key: string, value: any) {
    await client.set(key, value, 'PX', 24 * 60 * 60 * 1000);
  }

  static async clear() {
    const keys = await client.keys('*');
    const pipeline = client.pipeline();

    keys.forEach((key: any) => {
      pipeline.del(key);
    });
    return pipeline.exec();
  }
}

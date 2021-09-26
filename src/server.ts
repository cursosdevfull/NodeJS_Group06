import app from './app';
import { DatabaseBootstrap } from './bootstrap/database.bootstrap';
import { RedisBootstrap } from './bootstrap/redis.bootstrap';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

const serverBootstrap = new ServerBootstrap(app);
const databaseBootstrap = new DatabaseBootstrap();
const redisBootstrap = new RedisBootstrap();

(async () => {
  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
    await redisBootstrap.initialize();
  } catch (error) {
    console.log(error);
    databaseBootstrap.closeConnection();
    process.exit(1);
  }
})();

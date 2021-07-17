import app from './app';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

const serverBootstrap = new ServerBootstrap(app);

(async () => {
  try {
    await serverBootstrap.initialize();
  } catch (error) {
    console.log(error);
  }
})();

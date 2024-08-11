import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';
import controllerRouting from './routes/index';

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

controllerRouting(server);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;

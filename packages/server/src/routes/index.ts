import {
  ConnectionHandler,
  authConnectionHandler,
} from 'src/handlers';

type Routes = Record<string, ConnectionHandler>;

export default {
  '/auth': authConnectionHandler,
} as Routes;

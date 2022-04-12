import {
  ConnectionHandler,
  authConnectionHandler,
} from './handlers.js';

type Routes = Record<string, ConnectionHandler>;

export default {
  '/auth': authConnectionHandler,
} as Routes;

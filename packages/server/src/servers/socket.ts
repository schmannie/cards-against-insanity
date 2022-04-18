import {
  Server as SocketServer,
  Socket as SocketClient,
} from 'socket.io';

import { isDev } from '../utils/isDev.js';
import { log } from '../utils/logging.js';

/**
 * 
 * Initialize Socket.IO server.
 * #############################################################################
 */

/**
 * Handle incoming Socket.IO connections.
 */
function handleSocketConnection(socket: SocketClient) {
  log.debug(`Connection from SID:${socket.id} (${socket.conn.remoteAddress})`);

  socket.on('disconnect', () => {
    log.debug(`Disconnection from 'SID:${socket.id}' (${socket.conn.remoteAddress})`);
  });
}

/**
 * Configure accepted origin and CORS.
 */
const accepted_origin = isDev ? (
  'http://localhost:3000'
) : (
  'https://unknown.energy/cards-against-insanity'
);

const server = new SocketServer({ // TODO: enable WSS
  path: isDev ? '' : '/cards-against-insanity',
  serveClient: false,
  cors: {
    origin: accepted_origin,
  },
});

export {
  server,
  handleSocketConnection as listener,
};

import {
  server as httpServer,
  listener as httpListener,
  port,
} from './servers/http.js';
import {
  server as socketServer,
  listener as socketListener,
} from './servers/socket.js';

import { log } from './utils/logging.js';

/**
 * 
 * Initialize HTTP server.
 * #############################################################################
 */

log.debug('Intializing HTTP server');
httpServer.listen(port, httpListener);

/**
 * 
 * Initialize Socket.IO server.
 * #############################################################################
 */

log.debug('Intializing Socket.IO server');
socketServer.attach(httpServer);
socketServer.on('connection', socketListener);

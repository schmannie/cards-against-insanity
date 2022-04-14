import HTTP from 'http';
import * as s_io from 'socket.io';

import Routes from './routes.js';

import log from './utils/logging.js';

/**
 * Handle executed on HTTP server start.
 */
function handleListening() {
  const ctxLog = log.child({ namespace: 'httpServer' });
  ctxLog.info(`HTTP server listening on port '${http_port}' (took ${Date.now() - server_start_time}ms)`);
}

/**
 * Handle an incoming HTTP request.
 */
const handleHTTPRequest: HTTP.RequestListener = (req, res) => {
  const ctxLog = log.child({ namespace: 'http' });
  ctxLog.info(`HTTP request: ${req.method} ${req.url} from ${req.socket.remoteAddress}`);

  res.end("Hello, world!");
}

/**
 * 
 * Initialize HTTP server.
 * #############################################################################
 */

log.debug("Intializing HTTP + WS server...");
const server_start_time = Date.now();

const httpServer = HTTP.createServer(handleHTTPRequest); // TODO: enable HTTPS

/**
 * Configure accepted origin and CORS.
 */
const accepted_origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''; // TODO: add production client origin
const io = new s_io.Server(httpServer, {
  cors: {
    origin: accepted_origin,
  },
});

/**
 * Bind WebSocket Routes (see ./routes.js)
 */
Object.entries(Routes).forEach(([path, handler]) => {
  io.of(path).on('connection', handler);
});

/**
 * Configure port and listen.
 */
const http_port = process.env.NODE_ENV === 'development' ? 8080 : 80;
httpServer.listen(http_port, handleListening);

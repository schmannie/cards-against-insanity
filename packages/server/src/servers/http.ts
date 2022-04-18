import {
  createServer as createHTTPServer,
  RequestListener as HTTPRequestListener,
} from 'http';

import { isDev } from '../utils/isDev.js';
import { log } from '../utils/logging.js';

/**
 * Handle HTTP server activation.
 */
function handleListening() {
  log.info(`HTTP server listening on port '${port}' (took ${Date.now() - serverStartTime}ms)`);
}

/**
 * Handle incoming HTTP request.
 */
const handleHTTPRequest: HTTPRequestListener = (req, res) => {
  log.info(`HTTP request: ${req.method} ${req.url} from ${req.socket.remoteAddress}`);
  res.end();
}

/**
 * Configure port and server.
 */
const port = isDev ? 8080 : 80;
const serverStartTime = Date.now();
const server = createHTTPServer(handleHTTPRequest);

// TODO: enable HTTPS
export {
  server,
  handleListening as listener,
  port,
};

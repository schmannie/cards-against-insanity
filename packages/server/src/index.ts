import log from './utils/logging';

import { SHA256 } from 'crypto-js';
import HTTP from 'http';
import * as s_io from 'socket.io';

import {
  AuthMessageType,
  LoginRequestMessage,
  LoginSuccessMessage,
  LoginFailureMessage
} from 'cai-lib';

import {
  Players,
} from 'models';

/**
 * 
 * Begin handler declarations.
 * #############################################################################
 */

/**
 * Handle a new connection to the auth namespace.
 */
function handleAuthConnection(socket: s_io.Socket) {
  const ctxLog = log.child({ namespace: 'ws/auth' });
  ctxLog.debug(`Connection from SID:${socket.id} (${socket.conn.remoteAddress})`);

  /**
   * Handle a login request from the client.
   */
  socket.on(AuthMessageType.LOGIN_REQUEST, (message: string) => {
    ctxLog.debug(`Received login request from SID:${socket.id} (${socket.conn.remoteAddress})`);

    try {
      const payload = JSON.parse(message) as LoginRequestMessage;
      const login_time = Date.now();
      const uuid = SHA256(`${payload.name}${login_time}`).toString();

      players[uuid] = {
        name: payload.name,
        login_time
      };

      socket.data.login_id = uuid;
      socket.emit(AuthMessageType.LOGIN_SUCCESS, JSON.stringify({ id: uuid, name: payload.name, login_time } as LoginSuccessMessage));

      ctxLog.info(`Successfully logged in player '${players[uuid].name}'`);
    } catch (e) {
      const reason = 'Failed to parse login request (invalid JSON)';

      ctxLog.error(reason, (e as Error).message);
      socket.emit(AuthMessageType.LOGIN_FAILURE, JSON.stringify({ reason } as LoginFailureMessage));

      return;
    }
  });

  socket.on('disconnect', () => {
    ctxLog.debug(`Disconnection from 'SID:${socket.id}' (${socket.conn.remoteAddress})`);

    if (socket.data.login_id) {
      delete players[socket.data.login_id];
      ctxLog.info(`Deleted player '${players[socket.data.login_id].name}'`);
    }
  });
}

/**
 * Handle an incoming HTTP request.
 */
const handleHTTPRequest: HTTP.RequestListener = (req, res) => {
  const ctxLog = log.child({ namespace: 'http' });
  ctxLog.info(`HTTP request: ${req.method} ${req.url} from ${req.socket.remoteAddress}`);

  res.end("Hello, world!");
}

function handleListening() {
  const ctxLog = log.child({ namespace: 'httpServer' });
  ctxLog.info(`HTTP server listening on port '${http_port}' (took ${Date.now() - server_start_time}ms)`);
}

/**
 * 
 * Begin server startup.
 * #############################################################################
 */

log.debug("Intializing HTTP + WS server...");
const players: Players = {};
const server_start_time = Date.now();

const httpServer = HTTP.createServer(handleHTTPRequest); // TODO: enable HTTPS

const accepted_origin = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : ''; // TODO: add production client origin
const io = new s_io.Server(httpServer, {
  cors: {
    origin: accepted_origin,
  },
});

io.of('/auth').on('connection', handleAuthConnection);

const http_port = process.env.NODE_ENV === 'development' ? 8080 : 80;
httpServer.listen(http_port, handleListening);

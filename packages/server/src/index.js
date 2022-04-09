const log = require('./utils/logging');

const SHA256 = require('crypto-js/sha256');
const HTTP = require('http');
const { Server } = require('socket.io');

const {
  AuthMessageType,
  LoginSuccessMessage,
  LoginFailureMessage,
} = require('cai-lib');

const players = {};

log.debug("Intializing HTTP + WS server...");
const server_start_time = Date.now();

const httpServer = HTTP.createServer(handleHTTPRequest); // TODO: enable HTTPS

const accepted_origin = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : ''; // TODO: add production client origin
const io = new Server(httpServer, {
  cors: {
    origin: accepted_origin,
  },
});

io.of('/auth').on('connection', handleAuthConnection);

const http_port = process.env.NODE_ENV === 'development' ? 8080 : 80;
httpServer.listen(http_port, handleListening);

/**
 * Handle a new connection to the auth namespace.
 */
function handleAuthConnection(socket) {
  this.log = log.child({ namespace: 'ws/auth' });
  this.log.debug(`Connection from SID:${socket.id} (${socket.conn.remoteAddress})`);

  /**
   * Handle a login request from the client.
   */
  socket.on(AuthMessageType.LOGIN_REQUEST, (message) => {
    this.log.debug(`Received login request from SID:${socket.id} (${socket.conn.remoteAddress})`);

    try {
      message = JSON.parse(message);
    } catch (e) {
      const reason = 'Failed to parse login request (invalid JSON)';

      this.log.error(reason, e.message);
      socket.emit(AuthMessageType.LOGIN_FAILURE, JSON.stringify(new LoginFailureMessage(reason)));

      return;
    }

    const login_time = Date.now();
    const uuid = SHA256(`${message.name}${login_time}`).toString();

    players[uuid] = {
      name: message.name,
      login_time,
    };

    socket.data.login_id = uuid;
    socket.emit(AuthMessageType.LOGIN_SUCCESS, JSON.stringify(new LoginSuccessMessage(uuid, message.name, login_time)));

    this.log.info(`Successfully logged in player '${players[uuid].name}'`);
  });

  socket.on('disconnect', () => {
    this.log.debug(`Disconnection from 'SID:${socket.id}' (${socket.conn.remoteAddress})`);

    if (socket.data.login_id) {
      delete players[socket.data.login_id];
      this.log.info(`Deleted player '${players[socket.data.login_id].name}'`);
    }
  });
}

/**
 * Handle an incoming HTTP request.
 */
function handleHTTPRequest(req, res) {
  this.log = log.child({ namespace: 'http' });
  this.log.info(`HTTP request: ${req.method} ${req.url} from ${req.socket.remoteAddress}`);

  res.end("Hello, world!");
}

function handleListening() {
  this.log = log.child({ namespace: 'httpServer' });
  log.info(`HTTP server listening on port '${http_port}' (took ${Date.now() - server_start_time}ms)`);
}

import * as s_io from 'socket.io';
import { AuthMessageType } from 'cai-lib';

import authLoginHandler from './loginRequest';
import authDisconnectioHandler from './disconnection';

import globalLog from 'src/utils/logging';
const log = globalLog.child({ namespace: 'ws/auth' });

export default function (socket: s_io.Socket) {
  log.debug(`Connection from SID:${socket.id} (${socket.conn.remoteAddress})`);

  socket.on(AuthMessageType.LOGIN_REQUEST, (message) => authLoginHandler(message, socket, log));
  socket.on('disconnect', () => authDisconnectioHandler(socket, log));
}

import * as s_io from 'socket.io';
import { AuthMessageType } from '@cai/lib';

import authLoginHandler from './loginRequest.js';
import authDisconnectioHandler from './disconnection.js';

import globalLog from '../../utils/logging.js';
const log = globalLog.child({ namespace: 'ws/auth' });

export default function (socket: s_io.Socket) {
  log.debug(`Connection from SID:${socket.id} (${socket.conn.remoteAddress})`);

  socket.on(AuthMessageType.LOGIN_REQUEST, (message: string) => authLoginHandler(message, socket, log));
  socket.on('disconnect', () => authDisconnectioHandler(socket, log));
}
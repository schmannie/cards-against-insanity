import * as s_io from 'socket.io';
import {
  AuthMessageType,
  LoginRequestMessage,
  LoginSuccessMessage,
  LoginFailureMessage,
} from '@cai/lib';
import { Roarr } from 'roarr';
import { SHA256 } from 'crypto-js';

export default function (message: string, socket: s_io.Socket, log: typeof Roarr) {
  log.debug(`Connection from SID:${socket.id} (${socket.conn.remoteAddress})`);

  try {
    const payload = JSON.parse(message) as LoginRequestMessage;
    const login_time = Date.now();
    const uuid = SHA256(`${payload.name}${login_time}`).toString();

    // players[uuid] = {
    //   name: payload.name,
    //   login_time
    // };

    socket.data.login_id = uuid;
    socket.emit(AuthMessageType.LOGIN_SUCCESS, JSON.stringify({ id: uuid, name: payload.name, login_time } as LoginSuccessMessage));

    // log.info(`Successfully logged in player '${players[uuid].name}'`);
  } catch (e) {
    const reason = 'Failed to parse login request (invalid JSON)';

    log.error(reason, (e as Error).message);
    socket.emit(AuthMessageType.LOGIN_FAILURE, JSON.stringify({ reason } as LoginFailureMessage));

    return;
  }
}

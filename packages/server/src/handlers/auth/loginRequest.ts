import * as s_io from 'socket.io';
import {
  AuthMessageType,
  LoginRequestMessage,
  LoginSuccessMessage,
  LoginFailureMessage,
} from '@cai/lib';
import { Roarr } from 'roarr';
const CryptoJS = await import('crypto-js');

import { playersDB } from '../../db/index.js';

const { SHA256 } = CryptoJS.default;

export default async function (message: string, socket: s_io.Socket, log: typeof Roarr) {
  log.debug(`Received login request from SID:${socket.id} (${socket.conn.remoteAddress})`);

  try {
    const payload = JSON.parse(message) as LoginRequestMessage;
    const login_time = Date.now();
    const uuid = SHA256(`${payload.name}${login_time}`).toString();

    playersDB.chain
      .set(uuid, {
        name: payload.name,
        login_time
      })
      .value();

    socket.data.login_id = uuid;
    socket.emit(AuthMessageType.LOGIN_SUCCESS, JSON.stringify({ id: uuid, name: payload.name, login_time } as LoginSuccessMessage));

    const nameInDB = playersDB.chain
      .get(uuid)
      .get('name')
      .value();
    log.info(`Successfully logged in player '${nameInDB}'`);

    await playersDB.write();
  } catch (e) {
    log.error((e as Error).message);
    const reason = 'Failed to parse login request (invalid JSON)';
    socket.emit(AuthMessageType.LOGIN_FAILURE, JSON.stringify({ reason } as LoginFailureMessage));

    return;
  }
}

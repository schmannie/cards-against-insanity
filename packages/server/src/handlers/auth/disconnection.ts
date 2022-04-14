import * as s_io from 'socket.io';
import { Roarr } from 'roarr';

import { playersDB } from '../../db/index.js';

export default async function (socket: s_io.Socket, log: typeof Roarr) {
  log.debug(`Disconnection from 'SID:${socket.id}' (${socket.conn.remoteAddress})`);

  if (socket.data.login_id) {
    const cachedName = playersDB.data![socket.data.login_id].name;

    playersDB.chain
      .unset([socket.data.login_id])
      .value();
    await playersDB.write();
    
    log.info(`Deleted player '${cachedName}' from database`);
  }
}

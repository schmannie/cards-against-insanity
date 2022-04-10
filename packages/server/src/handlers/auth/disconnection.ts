import * as s_io from 'socket.io';
import { Roarr } from 'roarr';

export default function (socket: s_io.Socket, log: typeof Roarr) {
  log.debug(`Disconnection from 'SID:${socket.id}' (${socket.conn.remoteAddress})`);

  // if (socket.data.login_id) {
  //   delete players[socket.data.login_id];
  //   log.info(`Deleted player '${players[socket.data.login_id].name}'`);
  // }
}

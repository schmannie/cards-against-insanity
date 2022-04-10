import * as s_io from 'socket.io';

import authConnectionHandler from "./auth/connection";

export type ConnectionHandler = (socket: s_io.Socket) => void;
export { authConnectionHandler };

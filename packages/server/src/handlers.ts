import * as s_io from 'socket.io';

import authConnectionHandler from "./handlers/auth/connection.js";

export type ConnectionHandler = (socket: s_io.Socket) => void;
export { authConnectionHandler };

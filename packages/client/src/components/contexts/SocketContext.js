import { createContext } from 'react';
import io from 'socket.io-client';

// TODO: setup WSS
// TODO: add production socket.io server URL
const ws_url = process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:8080' : null;

export const socket = io(ws_url);
export const SocketContext = createContext(socket);

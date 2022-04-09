import { createContext } from 'react';
import {
  Socket,
  io
} from 'socket.io-client';

// TODO: setup WSS
class SocketManager {

  auth: Socket;

  constructor() {
    this.auth = this._createSocket(this._buildWS_url('auth'));
  }

  _createSocket(url: string): Socket {
    return io(url, {
      autoConnect: false,
    });
  }

  // TODO: add production socket.io server URL
  _buildWS_url(namespace: string): string {
    return (
      'ws://' +
        (process.env.NODE_ENV === 'development') ? (
        '127.0.0.1:8080'
      ) : (
        ''
      ) +
      '/' + namespace
    );
  }
}

export const sockets = new SocketManager();
export const SocketsContext = createContext(sockets);

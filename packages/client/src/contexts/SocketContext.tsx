import {
  Socket,
  io
} from 'socket.io-client';
import { createContext } from 'react';

import { isDev } from '../utils/isDev';

function buildSocketURL(namespace: string = ''): string {
  return (
    isDev ? (
      'ws://127.0.0.1:8080'
    ) : (
      'wss://unknown.energy/cards-against-insanity'
    ) + '/' + namespace
  );
}

function createSocket(url: string): Socket {
  return io(url, {
    autoConnect: false,
  });
}

export const socket = createSocket(buildSocketURL());
export const SocketContext = createContext(socket);

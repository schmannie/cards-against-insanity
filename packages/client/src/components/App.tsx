import {
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import { log } from '../utils/logging';

import { SocketContext } from '../contexts/SocketContext';
import './App/App.css';

function App() {

  const socket  = useContext(SocketContext);
  const [isSocketOpen, setSocketOpen] = useState(false);

  const handleSocketConnection = useCallback(() => {
    setSocketOpen(socket.connected);
    log.debug('Socket connected');
  }, [socket]);

  const handleSocketDisconnection = useCallback((reason: string) => {
    setSocketOpen(socket.connected);
    log.debug(`Socket disconnected: ${reason}`);
  }, [socket])

  const handleSocketError = useCallback((error: Error) => {
    setSocketOpen(socket.connected);
    log.error(error);
  }, [socket]);

  useEffect(() => {

    socket.on('connect', handleSocketConnection);
    socket.on('connect_error', handleSocketError);
    socket.on('disconnect', handleSocketDisconnection);

    if (socket.disconnected) {
      socket.connect();
    }

    return () => {

      socket.off('connect', handleSocketConnection);
      socket.off('connect_error', handleSocketError);
      socket.off('disconnect', handleSocketDisconnection);

      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [])

  return (
    <div id="content">
      <h1>Socket status: {isSocketOpen ? 'OPEN' : 'CLOSED'}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <a>Id voluptates deserunt pariatur corrupti fugiat nemo vel</a>, ad atque beatae. Suscipit possimus eligendi laboriosam sunt unde voluptatibus optio, magnam ut expedita!
      </p>
    </div>
  );
}

export default App;

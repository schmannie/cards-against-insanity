import {
  // useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { AuthMessageType } from 'cai-lib';

import './App.css';
import Auth from '../Auth';
import Sidebar from '../Sidebar';

import { SocketsContext } from 'contexts/SocketsContext';

import globalLog from 'utils/logging';
const log = globalLog.child({ namespace: 'AuthComponent' });

function App() {

  const sockets = useContext(SocketsContext);
  const isLoggedIn = false;

  const handleAuthConnection = useCallback(() => {
    log.debug('Successfully connected to auth socket');
  }, []);

  useEffect(() => {

    sockets.auth.on('connect', handleAuthConnection);

    sockets.auth.connect();

    return () => {

      sockets.auth.off('connect', handleAuthConnection);

      if (sockets.auth.connected) {
        sockets.auth.disconnect();
        log.debug('Gracefully disconnected from auth socket on \'App\' unmount');
      }
    }
  }, []);


  return (
    <section id="content">

      {/* TODO: Add background graphics */}

      {isLoggedIn ? (
        <Sidebar>
          {/* UserProfile */}
          {/* FriendsList */}
        </Sidebar>
      ) : (
        <Auth>
          <code>
            {JSON.stringify(Object.keys(AuthMessageType))}
          </code>
        </Auth>
      )}

    </section>
  );
}

export default App;

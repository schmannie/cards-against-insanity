import {
  // useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import {
  AuthMessageType,
  LoginSuccessMessage,
  LoginFailureMessage,
} from '@cai/lib';

import { SocketsContext } from '../contexts/SocketsContext';
import Auth from './Auth';
import Sidebar from './Sidebar';
import './App/App.css';

function App() {

  const sockets = useContext(SocketsContext);
  const isLoggedIn = false;

  const handleAuthConnection = useCallback(() => {
    console.debug('Successfully connected to auth socket');
  }, []);

  const handleLoginSuccess = useCallback((message: string) => {
    try {
      const payload = JSON.parse(message) as LoginSuccessMessage;
      console.debug(`Successfully logged in as: '${payload.name}'`);
    } catch (e) {
      console.error(`Login request failed: ${(e as Error).message}`);
    }
  }, []);

  const handleLoginFailure = useCallback((message: string) => {
    try {
      const payload = JSON.parse(message) as LoginFailureMessage;
      console.error(`Login request failed: ${payload.reason}`);
    } catch (e) {
      console.error(`Failed to parse failing login response: ${(e as Error).message}`);
    }
  }, []);

  useEffect(() => {

    sockets.auth.on('connect', handleAuthConnection);
    sockets.auth.on(AuthMessageType.LOGIN_SUCCESS, handleLoginSuccess);
    sockets.auth.on(AuthMessageType.LOGIN_FAILURE, handleLoginFailure);

    if (!sockets.auth.connected) {

      console.debug('Connecting to auth socket');
      sockets.auth.connect(); // TODO: send auth payload if present
    }

    return () => {

      sockets.auth.off('connect', handleAuthConnection);
      sockets.auth.off(AuthMessageType.LOGIN_SUCCESS, handleLoginSuccess);
      sockets.auth.off(AuthMessageType.LOGIN_FAILURE, handleLoginFailure);

      if (sockets.auth.connected) {

        sockets.auth.disconnect();
        console.debug('Gracefully disconnected from auth socket on \'App\' unmount');
      }
    }
  }, []);


  return (
    <div id="content">

      {/* TODO: Add background graphics */}

      {isLoggedIn ? (
        <Sidebar>
          {/* UserProfile */}
          {/* FriendsList */}
        </Sidebar>
      ) : (
        <Auth />
      )}

    </div>
  );
}

export default App;

import {
  useState,
  useContext,
  ChangeEventHandler,
} from 'react';

import {
  AuthMessageType,
  LoginRequestMessage,
} from '@cai/lib';

import { SocketsContext } from '../contexts/SocketsContext.tsx';
import './Auth/Auth.css';

import globalLog from '../utils/logging.tsx';
const log = globalLog.child({ namespace: 'Auth' });

/**
 * Auth component
 * 
 * - shows UI for logging in
 * - sends websocket messages to auth server
 */
const Auth = () => {

  const sockets = useContext(SocketsContext);
  const [name, setName] = useState('');

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleNameSubmit: ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (name.length < 3) return; // TODO: perform validation and show error

    log.debug(`Sending login request with name: '${name}'`);
    sockets.auth.emit(AuthMessageType.LOGIN_REQUEST, JSON.stringify({ name } as LoginRequestMessage));
  };

  return (
    <section id="auth">
      <form onSubmit={handleNameSubmit}>
        <input type="text" value={name} placeholder="Please select a name" onChange={handleNameChange} />
      </form>
    </section>
  );
}

export default Auth;

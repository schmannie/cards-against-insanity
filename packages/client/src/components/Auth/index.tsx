import {
  useState,
  useContext,
  ChangeEventHandler,
} from 'react';
import {
  AuthMessageType,
  LoginRequestMessage,
} from 'cai-lib';

import './Auth.css';

import { SocketsContext } from 'contexts/SocketsContext';

import globalLog from 'utils/logging';
const log = globalLog.child({ namespace: 'Auth' });

const Auth = () => {

  const sockets = useContext(SocketsContext);
  const [name, setName] = useState('');

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleNameSubmit: ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (name.length < 3) return; // TODO: perform validation and show error

    const message: LoginRequestMessage = { name };

    log.debug(`Sending login request with name: '${message.name}'...`);
    sockets.auth.emit(AuthMessageType.LOGIN_REQUEST, JSON.stringify(message));
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

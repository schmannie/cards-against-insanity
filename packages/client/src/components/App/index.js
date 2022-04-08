import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { AuthMessageType } from 'cai-lib';

import './App.css';

import Auth from '../Auth';
import Sidebar from '../Sidebar';

import { SocketContext } from '../contexts/SocketContext';

function App() {

  const isLoggedIn = false;

  // TODO: Add background graphics
  return (
    <section id="content">
      {isLoggedIn ? (
        <Sidebar>
          {/* UserProfile */}
          {/* FriendsList */}
        </Sidebar>
      ) : (
        <div>
          <code>{JSON.stringify(Object.keys(AuthMessageType))}</code>
        </div>
      )}
    </section>
  );
}

export default App;

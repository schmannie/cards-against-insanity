
import React from 'react';
import { createRoot } from 'react-dom/client';

import './utils/initEnv';
import log from './utils/logging';

import reportWebVitals from './utils/reportWebVitals';
import { SocketsContext, sockets } from './contexts/SocketsContext';
import App from './components/App';
import './index.css';

// log.info(raw('./note.txt')); // TODO: re-enable pretty ASCII art

const root = createRoot((document.getElementById('root'))!)

root.render(
  <React.StrictMode>
    <SocketsContext.Provider value={sockets}>
      <App />
    </SocketsContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(log.debug);

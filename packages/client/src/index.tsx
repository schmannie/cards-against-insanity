import React from 'react';
import { createRoot } from 'react-dom/client';
import raw from 'raw.macro';

import reportWebVitals from 'src/utils/reportWebVitals';
import { SocketsContext, sockets } from 'src/contexts/SocketsContext';
import App from 'src/components/App';
import '/index.css';

import 'src/utils/initEnv';
import log from 'src/utils/logging';

log.info(raw('./note.txt'));

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
reportWebVitals();

const React = await import('react');
const { createRoot } = await import('react-dom/client');

import reportWebVitals from './utils/reportWebVitals.js';
import { SocketsContext, sockets } from './contexts/SocketsContext.js';
import App from './components/App.js';
import './index.css';

import './utils/initEnv.js';
import log from './utils/logging.js';

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

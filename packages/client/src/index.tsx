import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import reportWebVitals from './utils/reportWebVitals';
import note from './note.txt';

import {
  socket,
  SocketContext
} from './contexts/SocketContext';
import App from './components/App';
import './globalStyles/index.css';

console.info(note);

const root = createRoot((document.getElementById('root'))!)

root.render(
  <StrictMode>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

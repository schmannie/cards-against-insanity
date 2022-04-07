import './utils/initEnv';
import log from './utils/logging';

import React from 'react';
import { createRoot } from 'react-dom/client';
import raw from 'raw.macro';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './components/App';

log.info(raw('./note.txt'));

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

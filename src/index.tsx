import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.scss"
import {Providers} from "./provider";
import "./locales/locales";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Providers>
        <App />
    </Providers>
  </React.StrictMode>
);
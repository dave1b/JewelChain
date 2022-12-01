import './index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'remixicon/fonts/remixicon.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { AuthProvider } from './hooks/use-auth';
import { ToastsProvider } from './hooks/use-toasts';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ToastsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastsProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

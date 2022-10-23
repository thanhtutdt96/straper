import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'contexts/AuthProvider';
import ReactDOM from 'react-dom/client';
import App from 'App';
import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes';
import reportWebVitals from './reportWebVitals';
import { ProviderMenu } from '../src/ui/main/useMain';

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProviderMenu>
      <App />
    </ProviderMenu>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

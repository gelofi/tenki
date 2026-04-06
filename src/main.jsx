import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // main CSS file
import App from './dom/App.jsx'; // import page

// this is the DOM builder
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
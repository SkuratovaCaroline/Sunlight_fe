// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { WebSocketProvider } from './context/WebSocketContext.jsx'; 

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </BrowserRouter> 
  </React.StrictMode>
);
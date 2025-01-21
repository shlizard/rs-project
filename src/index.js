import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./css/main.css";

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
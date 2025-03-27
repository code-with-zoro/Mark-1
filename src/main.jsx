// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
 // ✅ Corrected import
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* ✅ Fixed incorrect component usage */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

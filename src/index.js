import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Desactivar scroll restoration del browser antes de montar React
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Safety net: bfcache (back-forward cache) puede ignorar scrollRestoration
// en algunos browsers. Forzamos scroll al top cuando la página se restaura.
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);

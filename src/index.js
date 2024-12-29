import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component

// Create the root element to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // استيراد الـ Router هنا
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* الـ Router بيغلف الـ App هنا مرة واحدة */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
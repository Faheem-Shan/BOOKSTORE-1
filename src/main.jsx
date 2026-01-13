import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <AuthProvider>
        <CartProvider>
    <App />
      </CartProvider>
      </AuthProvider>
  </BrowserRouter>,
)

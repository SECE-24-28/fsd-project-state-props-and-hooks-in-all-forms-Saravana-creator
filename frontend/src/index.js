import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './router/AppRouter';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);

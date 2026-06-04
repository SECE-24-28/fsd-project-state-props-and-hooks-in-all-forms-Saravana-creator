import React from 'react';
import AppRouter from './router/AppRouter';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </ProductProvider>
  );
};

export default App;

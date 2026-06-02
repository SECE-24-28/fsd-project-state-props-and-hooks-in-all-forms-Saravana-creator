import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Faq from '../pages/Faq';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * AppLayout
 * ---------
 * Wraps all pages with Navbar + Footer, hiding them on the Admin page.
 * Navbar is self-contained (manages its own user state via sessionStorage).
 *
 * Props received via children (React pattern).
 */
const AppLayout = ({ children }) => {
  const location = useLocation();
  // Hide Navbar & Footer on the admin panel
  const isAdmin = location.pathname.toLowerCase() === '/admin';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>
      {!isAdmin && <Navbar />}
      <main style={{ flex: 1 }}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRouter;

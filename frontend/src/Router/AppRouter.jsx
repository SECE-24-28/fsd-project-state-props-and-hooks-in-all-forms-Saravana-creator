import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home          from '../pages/Home';
import Products      from '../pages/Products';
import Login         from '../pages/Login';
import Signup        from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import Profile       from '../pages/Profile';
import Admin         from '../pages/Admin';
import About         from '../pages/About';
import Contact       from '../pages/Contact';
import Faq           from '../pages/Faq';
import Privacy       from '../pages/Privacy';
import Terms         from '../pages/Terms';
import Cart          from '../pages/Cart';
import Checkout      from '../pages/Checkout';
import OrderSuccess  from '../pages/OrderSuccess';
import Navbar        from '../components/Navbar';
import Footer        from '../components/Footer';

// ── Auth helpers (read directly from sessionStorage — no context needed) ──────
function getActiveUser() {
  try {
    const raw = sessionStorage.getItem('eazeit_active_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── ProtectedRoute — redirects to /login if not authenticated ─────────────────
const ProtectedRoute = ({ children }) => {
  const user = getActiveUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return children;
};

// ── AdminRoute — redirects to / if not admin ──────────────────────────────────
const AdminRoute = ({ children }) => {
  const user = getActiveUser();
  if (!user) {
    return <Navigate to="/login?redirect=/admin" replace />;
  }
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// ── AppLayout — wraps pages with Navbar + Footer (hidden on /admin) ───────────
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdmin  = location.pathname.toLowerCase() === '/admin';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>
      {!isAdmin && <Navbar />}
      <main style={{ flex: 1 }}>{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
};

// ── AppRouter ─────────────────────────────────────────────────────────────────
const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Public routes */}
          <Route path="/"               element={<Home />} />
          <Route path="/products"       element={<Products />} />
          <Route path="/about"          element={<About />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/faq"            element={<Faq />} />
          <Route path="/privacy"        element={<Privacy />} />
          <Route path="/terms"          element={<Terms />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/signup"         element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart"           element={<Cart />} />

          {/* Protected routes — must be logged in */}
          <Route path="/profile"        element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/checkout"       element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/order-success/:orderId" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />

          {/* Admin-only route */}
          <Route path="/admin"          element={<AdminRoute><Admin /></AdminRoute>} />

          {/* Catch-all — redirect to home */}
          <Route path="*"              element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRouter;

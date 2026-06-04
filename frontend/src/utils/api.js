const API_BASE = 'http://localhost:5000/api';

/**
 * Retrieve token from session storage.
 */
export function getToken() {
  return sessionStorage.getItem('eazeit_auth_token') || '';
}

/**
 * Save token and user details to session storage.
 */
export function setAuthSession(token, user) {
  if (token) {
    sessionStorage.setItem('eazeit_auth_token', token);
  }
  sessionStorage.setItem('eazeit_active_user', JSON.stringify(user));
}

/**
 * Clear authentication session.
 */
export function clearAuthSession() {
  sessionStorage.removeItem('eazeit_auth_token');
  sessionStorage.removeItem('eazeit_active_user');
}

/**
 * Helper to normalize user object fields from snake_case/lowercase to camelCase
 */
function normalizeUser(user) {
  if (!user) return null;
  return {
    ...user,
    firstName: user.firstname || user.firstName || '',
    lastName: user.lastname || user.lastName || '',
    mobile: user.phone || user.mobile || '',
  };
}

/**
 * Custom fetch wrapper that automatically appends the JWT bearer token.
 */
async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
}

// ── Auth Endpoints ───────────────────────────────────────────────────────────

export async function apiSignUp(firstname, lastname, email, phone, password) {
  const data = await request('/users/signup', {
    method: 'POST',
    body: JSON.stringify({ firstname, lastname, email, phone, password }),
  });
  const normalized = normalizeUser(data.user);
  setAuthSession(data.token, normalized);
  return normalized;
}

export async function apiLogin(email, password) {
  const data = await request('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const normalized = normalizeUser(data.user);
  setAuthSession(data.token, normalized);
  return normalized;
}

export async function apiGetProfile(email) {
  const data = await request(`/users/profile/${encodeURIComponent(email)}`);
  return normalizeUser(data.user);
}

export async function apiUpdateProfile(email, profileData) {
  const payload = {
    firstname: profileData.firstName || profileData.firstname,
    lastname: profileData.lastName || profileData.lastname,
    phone: profileData.mobile || profileData.phone,
  };
  const data = await request(`/users/profile/${encodeURIComponent(email)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  const normalized = normalizeUser(data.user);
  // Update active user in session
  sessionStorage.setItem('eazeit_active_user', JSON.stringify(normalized));
  return normalized;
}

// ── Product Endpoints ────────────────────────────────────────────────────────

export async function apiGetProducts() {
  const data = await request('/products');
  return data.products;
}

export async function apiAddProduct(productData) {
  const data = await request('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
  return data.product;
}

export async function apiUpdateProduct(id, productData) {
  const data = await request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
  return data.product;
}

export async function apiDeleteProduct(id) {
  const data = await request(`/products/${id}`, {
    method: 'DELETE',
  });
  return data;
}

// ── Order Endpoints ──────────────────────────────────────────────────────────

export async function apiPlaceOrder(orderData) {
  const data = await request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
  return data.order;
}

export async function apiGetUserOrders(email) {
  const data = await request(`/orders/user/${encodeURIComponent(email)}`);
  return data.orders;
}

export async function apiGetOrderById(orderId) {
  const data = await request(`/orders/${orderId}`);
  return data.order;
}

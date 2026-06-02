# Annachi Kadai - E-Commerce Frontend

A complete beginner-friendly E-Commerce frontend application built with **React**, featuring state management with **Context API**, **React Hooks**, **Props**, **LocalStorage**, and **SessionStorage**.

---

## 📚 Table of Contents

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Installation & Setup](#-installation--setup)
6. [React Concepts Used](#-react-concepts-used)
7. [Storage Strategy](#-storage-strategy)
8. [Component & Page Breakdown](#-component--page-breakdown)
9. [Context API Explanation](#-context-api-explanation)
10. [Hooks Usage Guide](#-hooks-usage-guide)
11. [Props Flow](#-props-flow)
12. [Admin Credentials](#-admin-credentials)
13. [Future Enhancements](#-future-enhancements)

---

## 🎯 Project Overview

**Annachi Kadai** (Tamil for "Big Brother's Shop") is a fully functional e-commerce frontend for an online grocery store. It demonstrates:

- **React Hooks** (`useState`, `useEffect`, `useCallback`, `useMemo`, `useContext`)
- **Context API** for global state management (Cart, Products)
- **Props** for component communication
- **LocalStorage** for persistent data (users, orders, products, addresses)
- **SessionStorage** for temporary user sessions
- **React Router** for navigation

This is a **frontend-only** project with no backend — all data is stored in the browser.

---

## 🛒 Features

### User Features
- ✅ **Product Browsing** — View all products with filters (category, brand, price, search)
- ✅ **Shopping Cart** — Add, update quantity, remove items
- ✅ **User Authentication** — Login, Signup, Forgot Password (stored in localStorage)
- ✅ **Checkout Flow** — Multi-step checkout (address, review, payment, confirm)
- ✅ **Order History** — View past orders
- ✅ **Profile Management** — Edit name, mobile, view saved addresses
- ✅ **Toast Notifications** — Real-time feedback for user actions
- ✅ **Contact Form** — Send messages (stored in localStorage)
- ✅ **FAQ Page** — Accordion-style FAQs with hooks
- ✅ **Responsive Design** — Works on desktop, tablet, and mobile

### Admin Features
- ✅ **Admin Login** — Special admin account (`admin@eazeit.in` / `Admin@123`)
- ✅ **Product Management** — Add, Edit, Delete products
- ✅ **Dashboard** — View stats (total products, users, recent additions)
- ✅ **Separate Admin UI** — Full-screen admin panel (no navbar/footer)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19.2.6** | Frontend framework |
| **React Router 7.16.0** | Client-side routing |
| **Context API** | Global state management |
| **Tailwind CSS** | Utility-first styling |
| **LocalStorage** | Persistent data storage |
| **SessionStorage** | Temporary user session storage |

---

## 📁 Project Structure

```
Annachi_Kadai/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/              # Context providers
│   │   │   ├── CartContext.jsx
│   │   │   └── ProductContext.jsx
│   │   ├── data/                 # Static data & helpers
│   │   │   └── products.jsx
│   │   ├── pages/                # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Faq.jsx
│   │   │   ├── Privacy.jsx
│   │   │   └── Terms.jsx
│   │   ├── router/               # Routing config
│   │   │   └── AppRouter.jsx
│   │   ├── utils/                # Helper functions
│   │   │   ├── storage.js
│   │   │   ├── addresses.js
│   │   │   └── orders.js
│   │   ├── index.js              # App entry point
│   │   └── index.css             # Tailwind imports
│   ├── package.json
│   └── package-lock.json
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Annachi_Kadai/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## ⚛️ React Concepts Used

### 1. **React Hooks** (Beginner-Friendly Explanation)

Hooks are special functions that let you "hook into" React features. They let you use state and lifecycle methods in functional components.

#### `useState` — Managing Component State
```jsx
const [count, setCount] = useState(0);
// count: current value
// setCount: function to update count
// 0: initial value
```

**Example in the project:**
```jsx
// Login.jsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```

#### `useEffect` — Side Effects (Data Fetching, Subscriptions)
```jsx
useEffect(() => {
  // Code runs after component renders
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

**Example in the project:**
```jsx
// Profile.jsx
useEffect(() => {
  const userJSON = sessionStorage.getItem('eazeit_active_user');
  if (userJSON) {
    setUser(JSON.parse(userJSON));
  }
}, []);
```

#### `useContext` — Consuming Context
```jsx
const { cartItems, addToCart } = useCart();
```

**Example in the project:**
```jsx
// ProductCard.jsx
const { addToCart } = useCart();
```

#### `useMemo` — Memoize Expensive Calculations
```jsx
const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);
```

**Example in the project:**
```jsx
// CartContext.jsx
const cartTotal = useMemo(() => cartSubtotal + deliveryFee, [cartSubtotal, deliveryFee]);
```

#### `useCallback` — Memoize Functions
```jsx
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

**Example in the project:**
```jsx
// CartContext.jsx
const addToCart = useCallback((product, qty) => { ... }, []);
```

---

### 2. **Props** — Passing Data Between Components

Props (short for "properties") let you pass data from a parent component to a child component.

#### Example 1: ProductCard receives `product` prop
```jsx
// Products.jsx (Parent)
<ProductCard product={productData} />

// ProductCard.jsx (Child)
const ProductCard = ({ product }) => {
  return <h3>{product.name}</h3>;
};
```

#### Example 2: Navbar receives `user` and `handleLogout` props
```jsx
// AppRouter.jsx (Parent)
<Navbar user={user} handleLogout={handleLogout} />

// Navbar.jsx (Child)
const Navbar = ({ user, handleLogout }) => {
  return <button onClick={handleLogout}>Logout</button>;
};
```

---

### 3. **Context API** — Global State Management

Context provides a way to share data across the entire app without passing props manually at every level.

#### Why Use Context?
- Avoids "prop drilling" (passing props through many levels)
- Makes global state accessible anywhere in the app

#### How It Works
1. **Create Context** — `createContext()`
2. **Provide Context** — Wrap app with `<Provider>`
3. **Consume Context** — Use `useContext()` hook

**Example: CartContext**

```jsx
// 1. Create Context
const CartContext = createContext(null);

// 2. Provider Component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom Hook to Consume Context
export function useCart() {
  return useContext(CartContext);
}

// 4. Usage in Component
const { cartItems, addToCart } = useCart();
```

---

## 💾 Storage Strategy

### LocalStorage (Persistent Storage)

Data stored in localStorage **persists** even after the browser is closed.

| Key | Data Stored | Used In |
|-----|-------------|---------|
| `eazeit_users` | Array of registered users | Login, Signup, Profile |
| `eazeit_cart` | Shopping cart items | CartContext |
| `eazeit_orders` | User orders (grouped by email) | Checkout, Profile, OrderSuccess |
| `eazeit_addresses` | Saved delivery addresses | Checkout, Profile |
| `eazeit_admin_products` | Products added by admin | ProductContext, Admin |
| `eazeit_contact_messages` | Contact form submissions | Contact |

**Helper Functions (utils/storage.js):**
```javascript
// Get JSON from localStorage
getJSON(key, fallback);

// Set JSON to localStorage
setJSON(key, value);
```

**Example:**
```javascript
const users = getJSON('eazeit_users', []);
setJSON('eazeit_users', [...users, newUser]);
```

---

### SessionStorage (Temporary Storage)

Data stored in sessionStorage is **cleared** when the browser tab is closed.

| Key | Data Stored | Used In |
|-----|-------------|---------|
| `eazeit_active_user` | Currently logged-in user | Navbar, Profile, Checkout |

**Example:**
```javascript
// Store user on login
sessionStorage.setItem('eazeit_active_user', JSON.stringify(user));

// Get user
const userJSON = sessionStorage.getItem('eazeit_active_user');
const user = userJSON ? JSON.parse(userJSON) : null;

// Remove user on logout
sessionStorage.removeItem('eazeit_active_user');
```

---

## 🧩 Component & Page Breakdown

### Components (Reusable)

#### 1. **Navbar.jsx**
- **Purpose:** Top navigation bar
- **Hooks Used:** `useState`, `useEffect`, `useCart`
- **Props:** None (reads user from sessionStorage directly)
- **Features:**
  - Displays cart count (from CartContext)
  - Shows user name if logged in
  - Logout button
  - Mobile responsive menu

#### 2. **Footer.jsx**
- **Purpose:** Bottom footer with links
- **Hooks Used:** None
- **Props:** None

#### 3. **ProductCard.jsx**
- **Purpose:** Display individual product
- **Hooks Used:** `useCart`, `useNavigate`
- **Props:** `product`, `compact` (boolean)
- **Features:**
  - "Buy Now" button (adds to cart + redirects)
  - "Add to Cart" button (adds to cart + shows toast)

#### 4. **Toast.jsx**
- **Purpose:** Show notification messages
- **Hooks Used:** None (pure DOM manipulation)
- **Usage:** `showToast('Message', isError)`

---

### Pages (Routes)

#### 1. **Home.jsx**
- **Purpose:** Landing page
- **Hooks Used:** `useProducts`
- **Features:**
  - Hero section
  - Category showcase
  - Featured products (first 4 from ProductContext)
  - Why choose us section

#### 2. **Products.jsx**
- **Purpose:** Browse all products
- **Hooks Used:** `useState`, `useEffect`, `useMemo`, `useProducts`, `useSearchParams`
- **Features:**
  - Category filter
  - Brand filter
  - Price range filter
  - Search bar
  - Sort options (price, newest)
  - Active filter chips

#### 3. **Cart.jsx**
- **Purpose:** View shopping cart
- **Hooks Used:** `useCart`, `useNavigate`
- **Features:**
  - List all cart items
  - Update quantity (+/- buttons)
  - Remove item
  - Order summary (subtotal, delivery, total)
  - "Proceed to Checkout" button

#### 4. **Checkout.jsx**
- **Purpose:** Complete order
- **Hooks Used:** `useState`, `useEffect`, `useMemo`, `useCart`, `useNavigate`
- **Features:**
  - Multi-step process (4 steps)
  - Address selection + add new address
  - Order review
  - Payment method selection (UPI, Card, COD)
  - Place order button

#### 5. **OrderSuccess.jsx**
- **Purpose:** Order confirmation
- **Hooks Used:** `useState`, `useEffect`, `useParams`
- **Features:**
  - Displays order details
  - Links to order history and products

#### 6. **Login.jsx**
- **Purpose:** User login
- **Hooks Used:** `useState`, `useNavigate`
- **Features:**
  - Email + password fields
  - Show/hide password toggle
  - Admin login support
  - Stores user in sessionStorage

#### 7. **Signup.jsx**
- **Purpose:** User registration
- **Hooks Used:** `useState`, `useEffect`, `useNavigate`
- **Features:**
  - Form validation (name, email, mobile, password)
  - Password strength meter
  - Real-time error messages
  - Stores user in localStorage

#### 8. **ForgotPassword.jsx**
- **Purpose:** Reset password
- **Hooks Used:** `useState`, `useEffect`, `useNavigate`
- **Features:**
  - Two-step process
  - Email lookup
  - New password entry with strength meter

#### 9. **Profile.jsx**
- **Purpose:** User dashboard
- **Hooks Used:** `useState`, `useEffect`, `useNavigate`, `useSearchParams`
- **Features:**
  - Three tabs: Profile Edit, Orders, Addresses
  - Edit name/mobile (requires password)
  - View real order history (from localStorage)
  - View & delete saved addresses

#### 10. **Admin.jsx**
- **Purpose:** Admin panel
- **Hooks Used:** `useState`, `useEffect`, `useProducts`, `useNavigate`
- **Features:**
  - Dashboard (stats, recent products)
  - Add new product form
  - Manage products (edit/delete)
  - Full-screen layout (no navbar/footer)

#### 11. **Contact.jsx**
- **Purpose:** Contact form
- **Hooks Used:** `useState`
- **Features:**
  - Controlled form inputs
  - Saves messages to localStorage

#### 12. **Faq.jsx**
- **Purpose:** FAQ page
- **Hooks Used:** `useState`
- **Features:**
  - Accordion-style FAQs
  - Toggle open/close with hooks (no CSS hacks)

#### 13. **About.jsx, Privacy.jsx, Terms.jsx**
- **Purpose:** Static information pages
- **Hooks Used:** None

---

## 🌐 Context API Explanation

### CartContext.jsx

**Purpose:** Manage shopping cart globally

**State:**
- `cartItems` — Array of cart items

**Computed Values (useMemo):**
- `cartCount` — Total quantity of items
- `cartSubtotal` — Sum of (price × qty)
- `deliveryFee` — Rs. 40 or Free (if subtotal >= Rs. 299)
- `cartTotal` — Subtotal + Delivery Fee

**Functions (useCallback):**
- `addToCart(product, qty)` — Add product to cart
- `updateQty(productId, qty)` — Update item quantity
- `removeFromCart(productId)` — Remove item
- `clearCart()` — Empty cart (used after checkout)

**Usage:**
```jsx
const { cartItems, cartCount, addToCart, clearCart } = useCart();
```

---

### ProductContext.jsx

**Purpose:** Manage products globally (static + admin-added)

**State:**
- `adminProducts` — Products added by admin (from localStorage)

**Computed Values:**
- `products` — Static products + Admin products combined

**Functions (useCallback):**
- `addProduct(productData)` — Add new product
- `updateProduct(id, updates)` — Edit product
- `deleteProduct(id)` — Delete product

**Usage:**
```jsx
const { products, addProduct, deleteProduct } = useProducts();
```

---

## 📖 Hooks Usage Guide

### When to Use Each Hook

| Hook | Use Case | Example |
|------|----------|---------|
| `useState` | Store component-level data that changes | Form inputs, toggle states |
| `useEffect` | Run code after render (API calls, subscriptions) | Fetch user from sessionStorage on mount |
| `useContext` | Access global state (Context API) | Get cart items from CartContext |
| `useMemo` | Cache expensive calculations | Calculate cart total |
| `useCallback` | Cache functions to prevent re-renders | Cart functions (addToCart, removeFromCart) |
| `useParams` | Read URL parameters | Get orderId from `/order-success/:orderId` |
| `useNavigate` | Navigate programmatically | Redirect to login after logout |
| `useSearchParams` | Read/write URL query params | Get `?search=keyword` from URL |

---

## 🔄 Props Flow

### Example 1: Product Data Flow

```
ProductContext (Global State)
      ↓
   Products.jsx (filters/sorts products)
      ↓
   ProductCard.jsx (receives product prop)
      ↓
   CartContext (addToCart function)
```

### Example 2: User Authentication Flow

```
Login.jsx (user logs in)
      ↓
sessionStorage.setItem('eazeit_active_user', user)
      ↓
Navbar.jsx (reads from sessionStorage)
      ↓
Profile.jsx (reads from sessionStorage)
```

---

## 🔐 Admin Credentials

To access the Admin Panel:

- **Email:** `admin@eazeit.in`
- **Password:** `Admin@123`

**Admin Features:**
- Add, edit, delete products
- View dashboard statistics
- Manage product inventory

**Note:** Admin cannot place orders (e-commerce is for customers only).

---

## 🚀 Future Enhancements

- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Implement wishlist feature
- [ ] Add product reviews/ratings
- [ ] Integrate real payment gateway
- [ ] Add email notifications (mock)
- [ ] Implement order tracking
- [ ] Add image upload for products
- [ ] Create mobile app (React Native)
- [ ] Add dark mode toggle
- [ ] Implement advanced search (Algolia/Elasticsearch)

---

## 📝 Key Learnings for Beginners

### 1. **Component Architecture**
- Break UI into small, reusable components
- Use props to pass data down
- Use Context for global state

### 2. **State Management**
- Use `useState` for local state
- Use Context API for global state
- Avoid prop drilling with Context

### 3. **Side Effects**
- Use `useEffect` for data fetching
- Always specify dependencies array
- Clean up side effects (return function)

### 4. **Performance Optimization**
- Use `useMemo` for expensive calculations
- Use `useCallback` for function memoization
- Avoid unnecessary re-renders

### 5. **Storage Best Practices**
- Use localStorage for persistent data
- Use sessionStorage for temporary data
- Always handle JSON.parse errors (try/catch)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 📧 Contact

For any queries or feedback:
- **Email:** support@eazeit.in
- **GitHub:** [Your GitHub Profile]

---

**Made with ❤️ by Annachi Kadai Team**

*Happy Shopping! 🛒*

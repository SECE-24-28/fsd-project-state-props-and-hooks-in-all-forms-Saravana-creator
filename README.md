# Annachi Kadai - E-Commerce Frontend

An E-Commerce frontend application built with React, focusing on state management, props, and React hooks. This is a Full Stack Development course assignment.

## 🛒 Features

- **Product Catalog**: Browse and view available products.
- **Shopping Cart**: Add, update, and remove items from the cart. Managed centrally via `CartContext`.
- **Checkout Process**: Enter delivery details and finalize orders.
- **Order Success**: Confirmation page upon successful checkout.
- **User Authentication (Login)**: Simple mock login interface.
- **User Profile**: View user information and order history.
- **Contact Page**: Reach out for support or inquiries.
- **Toast Notifications**: Interactive feedback for user actions.

## 📁 Project Structure

The project code is primarily located in the `src` directory:

- `Components/` - Reusable UI components (e.g., `Navbar.js`, `Toast.js`).
- `Pages/` - Core views (e.g., `Cart.js`, `Checkout.js`, `Products.js`).
- `context/` - React Context definitions for global state (e.g., `CartContext.js`).
- `data/` - Static mock data for products (`products.js`).
- `Router/` - Application routing logic (`AppRouter.js`).
- `utils/` - Helper functions for managing local storage, addresses, and orders.

## 🚀 Getting Started

Since this is a standard React application:

1. **Install Dependencies** (Ensure you have a valid `package.json`):
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm start
   ```
   The app will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🛠️ Technologies Used
- React
- React Router (for navigation)
- Context API (for state management)

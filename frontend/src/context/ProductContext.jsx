import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getJSON, setJSON, STORAGE_KEYS } from '../utils/storage';

// ── Static / seed products ────────────────────────────────────────────────────
export const STATIC_PRODUCTS = [
  { id: 's1', name: 'Colgate Strong Teeth Toothpaste', category: 'Oral Care', brand: 'Colgate', price: 45, mrp: 50, unit: '200g + 160g Pack', badge: 'Best Seller', image: 'images/colgate.jpg' },
  { id: 's2', name: 'Colgate Total Advanced Whitening', category: 'Oral Care', brand: 'Colgate', price: 29, mrp: 30, unit: '150g Tube', badge: '', image: 'images/colgate.jpg' },
  { id: 's3', name: 'Colgate Cavity Protection Paste', category: 'Oral Care', brand: 'Colgate', price: 35, mrp: 36, unit: '100g Tube', badge: 'New', image: 'images/colgate.jpg' },
  { id: 's4', name: 'Harpic Power Plus Original', category: 'Household', brand: 'Harpic', price: 89, mrp: 95, unit: '500ml Bottle', badge: 'Popular', image: 'images/harpic.jpg' },
  { id: 's5', name: 'Harpic Sparkling Lemon Cleaner', category: 'Household', brand: 'Harpic', price: 79, mrp: 89, unit: '500ml Bottle', badge: '', image: 'images/harpic.jpg' },
  { id: 's6', name: 'Harpic White & Shine Bleach', category: 'Household', brand: 'Harpic', price: 129, mrp: 165, unit: '1 Litre Bottle', badge: '10X Action', image: 'images/harpic.jpg' },
  { id: 's7', name: 'Godrej No.1 Aloe Vera Soap', category: 'Bath & Body', brand: 'Godrej', price: 99, mrp: 140, unit: 'Pack of 4 x 100g', badge: 'Value Pack', image: 'images/godrej-soap.jpg' },
  { id: 's8', name: 'Godrej No.1 Sandal Soap', category: 'Bath & Body', brand: 'Godrej', price: 79, mrp: 110, unit: 'Pack of 3 x 100g', badge: '', image: 'images/godrej-soap.jpg' },
  { id: 's9', name: 'Tata Salt Iodised', category: 'Food & Snacks', brand: 'Others', price: 24, mrp: 30, unit: '1 kg Pack', badge: 'New', image: '' },
  { id: 's10', name: 'Aashirvaad Whole Wheat Atta', category: 'Food & Snacks', brand: 'Others', price: 249, mrp: 310, unit: '5 kg Bag', badge: '', image: '' },
];

const ProductContext = createContext(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function ProductProvider({ children }) {
  const [adminProducts, setAdminProducts] = useState(() =>
    getJSON(STORAGE_KEYS.ADMIN_PRODUCTS, [])
  );

  // Persist admin products whenever they change
  useEffect(() => {
    setJSON(STORAGE_KEYS.ADMIN_PRODUCTS, adminProducts);
  }, [adminProducts]);

  // Merged list: static first, then admin-added
  const products = [...STATIC_PRODUCTS, ...adminProducts];

  const addProduct = useCallback((productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      price: parseFloat(productData.price),
      mrp: parseFloat(productData.mrp) || 0,
      addedAt: new Date().toISOString(),
    };
    setAdminProducts((prev) => [...prev, newProduct]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setAdminProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...updates, price: parseFloat(updates.price), mrp: parseFloat(updates.mrp) || 0 }
          : p
      )
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setAdminProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = {
    products,
    adminProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within a ProductProvider');
  return ctx;
}

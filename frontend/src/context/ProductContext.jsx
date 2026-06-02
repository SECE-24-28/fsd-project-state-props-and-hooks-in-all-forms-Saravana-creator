import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getJSON, setJSON, STORAGE_KEYS } from '../utils/storage';
import { SEED_PRODUCTS } from '../assets';

const ProductContext = createContext(null);

const SEEDED_KEY = 'eazeit_products_seeded';

/**
 * Seed the 5 initial products into localStorage on first launch.
 * Uses a "seeded" flag so it only runs once.
 * After seeding, Admin has full control: add, edit, delete any product.
 */
function seedIfNeeded() {
  const alreadySeeded = localStorage.getItem(SEEDED_KEY);
  if (!alreadySeeded) {
    setJSON(STORAGE_KEYS.ADMIN_PRODUCTS, SEED_PRODUCTS);
    localStorage.setItem(SEEDED_KEY, 'true');
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function ProductProvider({ children }) {
  // Seed on mount (runs once ever per browser session)
  useEffect(() => {
    seedIfNeeded();
  }, []);

  // All products come from localStorage — Admin manages them all
  const [products, setProducts] = useState(() => {
    seedIfNeeded();
    return getJSON(STORAGE_KEYS.ADMIN_PRODUCTS, []);
  });

  // Persist whenever products change
  useEffect(() => {
    setJSON(STORAGE_KEYS.ADMIN_PRODUCTS, products);
  }, [products]);

  // ── CRUD operations exposed via context ───────────────────────────────────

  /** Add a new product (called from Admin → Add Product form) */
  const addProduct = useCallback((productData) => {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      price: parseFloat(productData.price),
      mrp: parseFloat(productData.mrp) || 0,
      addedAt: new Date().toISOString(),
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  }, []);

  /** Update an existing product by id (called from Admin → Edit modal) */
  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              price: parseFloat(updates.price),
              mrp: parseFloat(updates.mrp) || 0,
            }
          : p
      )
    );
  }, []);

  /** Delete a product by id (called from Admin → Manage Products) */
  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  /**
   * Reset products back to the original 5 seed products.
   * Useful for Admin to restore defaults.
   */
  const resetToSeed = useCallback(() => {
    setProducts(SEED_PRODUCTS);
  }, []);

  const value = {
    products,           // all products (admin-managed, persisted to localStorage)
    addProduct,
    updateProduct,
    deleteProduct,
    resetToSeed,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

// ── Custom Hook ───────────────────────────────────────────────────────────────
export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within a ProductProvider');
  return ctx;
}

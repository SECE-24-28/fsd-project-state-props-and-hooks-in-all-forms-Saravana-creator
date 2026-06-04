/**
 * src/assets/index.js
 * -------------------
 * Central barrel export for all product and UI images.
 * Import from this file anywhere in the project:
 *
 *   import { colgate, harpic, godrejSoap, goodknight, closeup } from '../assets';
 *
 * The public URL equivalents (used for seeded product image paths) are:
 *   'images/colgate.png', 'images/harpic.png', etc.
 */

import colgate    from './colgate.png';
import harpic     from './harpic.png';
import godrejSoap from './godrej-soap.png';
import goodknight from './goodknight.png';
import closeup    from './closeup.png';

export { colgate, harpic, godrejSoap, goodknight, closeup };

/**
 * SEED_PRODUCTS — the 5 initial products populated by the Admin system on first load.
 * These use the public /images/ path so they work after a production build too.
 *
 * The Admin panel can edit or delete any of these products.
 * No product is ever hardcoded in the UI — everything comes from ProductContext.
 */
export const SEED_PRODUCTS = [
  {
    id: 'seed-1',
    name: 'Colgate Strong Teeth Toothpaste',
    category: 'Oral Care',
    brand: 'Colgate',
    price: 45,
    mrp: 50,
    unit: '200g + 160g Pack',
    badge: 'Best Seller',
    image: 'images/colgate.png',
    addedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-2',
    name: 'Harpic Toilet Cleaner Range',
    category: 'Household',
    brand: 'Harpic',
    price: 89,
    mrp: 99,
    unit: '500ml Bottle',
    badge: 'Popular',
    image: 'images/harpic.png',
    addedAt: '2026-01-01T00:00:01.000Z',
  },
  {
    id: 'seed-3',
    name: 'Good Knight Gold Flash',
    category: 'Personal Care',
    brand: 'Good Knight',
    price: 149,
    mrp: 175,
    unit: 'Machine + Refill Pack',
    badge: 'New',
    image: 'images/goodknight.png',
    addedAt: '2026-01-01T00:00:02.000Z',
  },
  {
    id: 'seed-4',
    name: 'Godrej No.1 Aloe Vera Soap',
    category: 'Bath & Body',
    brand: 'Godrej',
    price: 99,
    mrp: 140,
    unit: 'Pack of 4 x 100g',
    badge: 'Value Pack',
    image: 'images/godrej-soap.png',
    addedAt: '2026-01-01T00:00:03.000Z',
  },
  {
    id: 'seed-5',
    name: 'Closeup Triple Fresh Toothpaste',
    category: 'Oral Care',
    brand: 'Closeup',
    price: 55,
    mrp: 65,
    unit: '80g Tube',
    badge: '',
    image: 'images/closeup.png',
    addedAt: '2026-01-01T00:00:04.000Z',
  },
];

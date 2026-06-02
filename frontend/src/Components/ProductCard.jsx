import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks';
import { showToast } from './Toast';

const CAT_EMOJI = {
  'Oral Care': '🦷',
  'Household': '🧹',
  'Bath & Body': '🧼',
  'Food & Snacks': '🍎',
  'Personal Care': '💊',
  'Beverages': '☕',
  'Dairy': '🥛',
  'Others': '📦',
};

/**
 * ProductCard – A reusable product card component.
 *
 * Props:
 *  - product  {object}  The product data object (id, name, category, brand, price, mrp, unit, badge, image)
 *  - compact  {boolean} If true, renders a slightly smaller/simpler card style (used on Home page)
 */
const ProductCard = ({ product, compact = false }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { user } = useAuth();

  const handleBuyNow = () => {
    addToCart(product, 1);
    showToast('Item added to cart!');
    if (!user) {
      navigate('/login?redirect=/cart');
    } else {
      navigate('/cart');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast(`"${product.name}" added to cart!`);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-teal-400 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-full">
      {/* Product Image */}
      <div className="relative w-full bg-slate-800 border-b border-slate-700 overflow-hidden flex items-center justify-center" style={{ height: compact ? '160px' : '192px' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
            <span className="text-4xl">{CAT_EMOJI[product.category] || '📦'}</span>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-teal-400 text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className={`flex-1 flex flex-col justify-between ${compact ? 'p-4' : 'p-5'}`}>
        <div>
          <div className="text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-1.5">
            {product.category}
          </div>
          <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug line-clamp-2">
            {product.name}
          </h3>
          <div className="text-xs text-slate-400 mb-4">{product.unit}</div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-teal-400">Rs. {product.price}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-slate-400 line-through">Rs. {product.mrp}</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold text-xs py-2 px-3 rounded-lg text-center transition-all duration-200 active:scale-95"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-transparent hover:bg-teal-400 text-teal-400 hover:text-slate-900 border border-teal-400/50 hover:border-teal-400 font-bold text-xs py-2 px-3 rounded-lg text-center transition-all duration-200 active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

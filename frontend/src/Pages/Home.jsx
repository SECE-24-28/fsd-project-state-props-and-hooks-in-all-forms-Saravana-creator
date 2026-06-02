import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

// Category showcase config (static display data)
const CATEGORY_SHOWCASES = [
  { label: 'Oral Care',    catKey: 'Oral Care',    image: 'images/colgate.jpg',    alt: 'Oral Care' },
  { label: 'Household',   catKey: 'Household',    image: 'images/harpic.jpg',     alt: 'Household Cleaners' },
  { label: 'Bath & Body', catKey: 'Bath & Body',  image: 'images/godrej-soap.jpg', alt: 'Bath and Body' },
  { label: 'Food & Snacks', catKey: 'Food & Snacks', image: '',                   alt: 'Food & Snacks', emoji: '🍎' },
];

const Home = () => {
  // ── Hooks ────────────────────────────────────────────────────────────────
  const { products } = useProducts();

  // Pick the first 4 products from the global list to feature on the home page
  const featuredProducts = products.slice(0, 4);

  // Compute dynamic category product counts
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
    {/*  ===== HERO SECTION =====  */}
    <section className="py-5 md:py-20 bg-slate-900">
        <div className="container-xl">
            <div className="row align-items-center justify-content-between gy-5">
                <div className="col-lg-6">
                    <div className="d-inline-block bg-teal-400/10 border border-teal-400/20 text-teal-400 fw-semibold text-xs px-3.5 py-1 rounded-pill text-uppercase tracking-wider mb-4">Now Delivering Near You</div>
                    <h1 className="font-serif font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-4">
                        Fresh Groceries,<br />
                        Delivered <span className="text-teal-400">Smarter</span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg mb-4 leading-relaxed">
                        Shop daily essentials, personal care, and household products from the comfort of your home. Quality guaranteed, delivered fast.
                    </p>
                    <div className="d-flex gap-3 flex-wrap">
                        <Link to="/products" className="btn bg-teal-400 hover:bg-teal-500 text-slate-900 fw-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-95 border-0">Shop Now</Link>
                        <Link to="/about" className="btn bg-transparent hover:bg-teal-400 text-teal-400 hover:text-slate-900 border-2 border-teal-400 fw-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 active:scale-95">Learn More</Link>
                    </div>
                    <div className="d-flex gap-4 mt-5 flex-wrap">
                        <div className="d-flex flex-column">
                            <span className="text-xs text-teal-400 fw-bold text-uppercase tracking-wider">Same Day Delivery</span>
                            <span className="text-[11px] text-slate-400 mt-1">Order before 2 PM</span>
                        </div>
                        <div className="d-flex flex-column border-start border-slate-700/60 ps-4">
                            <span className="text-xs text-teal-400 fw-bold text-uppercase tracking-wider">Excellent Quality</span>
                            <span className="text-[11px] text-slate-400 mt-1">100% genuine products</span>
                        </div>
                        <div className="d-flex flex-column border-start border-slate-700/60 ps-4">
                            <span className="text-xs text-teal-400 fw-bold text-uppercase tracking-wider">Easy Returns</span>
                            <span className="text-[11px] text-slate-400 mt-1">7-day return policy</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="rounded-xl border border-slate-700 bg-slate-800 overflow-hidden h-60 md:h-72 d-flex align-items-center justify-content-center">
                                <img src="images/colgate.jpg" alt="Colgate Strong Teeth Toothpaste" className="w-100 h-100 object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="rounded-xl border border-slate-700 bg-slate-800 overflow-hidden h-36 md:h-40 d-flex align-items-center justify-content-center">
                                <img src="images/harpic.jpg" alt="Harpic Toilet Cleaner" className="w-100 h-100 object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="rounded-xl border border-slate-700 bg-slate-800 overflow-hidden h-36 md:h-40 d-flex align-items-center justify-content-center">
                                <img src="images/godrej-soap.jpg" alt="Godrej No.1 Soap" className="w-100 h-100 object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*  ===== FEATURES BAR =====  */}
    <div className="bg-slate-800 border-top border-bottom border-slate-700 py-4">
        <div className="container-xl d-flex flex-wrap justify-content-around align-items-center gap-4">
            <div className="d-flex align-items-center gap-3">
                <div className="w-12 h-12 bg-teal-400/10 border border-teal-400/25 rounded-xl d-flex align-items-center justify-content-center text-teal-400 fs-4">&#128666;</div>
                <div className="d-flex flex-column">
                    <strong className="text-sm fw-bold text-white">Free Delivery</strong>
                    <span className="text-xs text-slate-400 mt-1">On orders above Rs. 299</span>
                </div>
            </div>
            <div className="d-flex align-items-center gap-3">
                <div className="w-12 h-12 bg-teal-400/10 border border-teal-400/25 rounded-xl d-flex align-items-center justify-content-center text-teal-400 fs-4">&#128274;</div>
                <div className="d-flex flex-column">
                    <strong className="text-sm fw-bold text-white">Secure Payments</strong>
                    <span className="text-xs text-slate-400 mt-1">UPI, Cards &amp; COD accepted</span>
                </div>
            </div>
            <div className="d-flex align-items-center gap-3">
                <div className="w-12 h-12 bg-teal-400/10 border border-teal-400/25 rounded-xl d-flex align-items-center justify-content-center text-teal-400 fs-4">&#10003;</div>
                <div className="d-flex flex-column">
                    <strong className="text-sm fw-bold text-white">Genuine Products</strong>
                    <span className="text-xs text-slate-400 mt-1">100% authentic &amp; quality checked</span>
                </div>
            </div>
            <div className="d-flex align-items-center gap-3">
                <div className="w-12 h-12 bg-teal-400/10 border border-teal-400/25 rounded-xl d-flex align-items-center justify-content-center text-teal-400 fs-4">&#8635;</div>
                <div className="d-flex flex-column">
                    <strong className="text-sm fw-bold text-white">Easy Returns</strong>
                    <span className="text-xs text-slate-400 mt-1">Hassle-free 7-day returns</span>
                </div>
            </div>
        </div>
    </div>

    {/*  ===== CATEGORIES =====  */}
    <section className="py-5 md:py-20 bg-slate-800">
        <div className="container-xl">
            <h2 className="font-serif font-extrabold fs-2 fs-md-1 text-white text-center mb-2">Shop By <span className="text-teal-400">Category</span></h2>
            <p className="text-slate-400 text-sm text-md-base text-center mb-5">Browse our wide range of everyday essentials</p>

            <div className="row g-4">
              {CATEGORY_SHOWCASES.map((cat) => (
                <div key={cat.catKey} className="col-sm-6 col-lg-3">
                    <Link to={`/products?category=${encodeURIComponent(cat.catKey)}`} className="d-block group bg-slate-800 border border-slate-700 rounded-xl p-4 p-md-5 text-center transition-all duration-300 hover:border-teal-400 hover:-translate-y-1 hover:shadow-xl text-decoration-none">
                        <div className="w-20 h-20 mx-auto mb-3 bg-slate-800 border-2 border-slate-700 rounded-circle overflow-hidden d-flex align-items-center justify-content-center transition-colors duration-300 group-hover:border-teal-400">
                            {cat.image ? (
                              <img src={cat.image} alt={cat.alt} className="w-100 h-100 object-cover" />
                            ) : (
                              <span className="text-teal-400 fs-1">{cat.emoji}</span>
                            )}
                        </div>
                        <div className="text-base fw-semibold text-white mb-1 group-hover:text-teal-400 transition-colors duration-200">{cat.label}</div>
                        {/* Dynamic count from ProductContext */}
                        <div className="text-xs text-slate-400">{categoryCounts[cat.catKey] || 0} Products</div>
                    </Link>
                </div>
              ))}
            </div>
        </div>
    </section>

    {/*  ===== FEATURED PRODUCTS SECTION =====  */}
    <section className="py-5 md:py-20 bg-slate-900">
        <div className="container-xl">
            <h2 className="font-serif font-extrabold fs-2 fs-md-1 text-white text-center mb-2">Featured <span className="text-teal-400">Products</span></h2>
            <p className="text-slate-400 text-sm text-md-base text-center mb-5">Handpicked essentials for your everyday needs</p>

            {/* Uses the ProductCard component – props: product, compact */}
            <div className="row g-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                  <ProductCard product={product} compact={true} />
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
                <Link to="/products" className="btn bg-transparent hover:bg-teal-400 text-teal-400 hover:text-slate-900 border-2 border-teal-400 fw-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 active:scale-95">View All Products</Link>
            </div>
        </div>
    </section>

    {/*  ===== WHY CHOOSE US =====  */}
    <section className="py-5 md:py-20 bg-slate-800">
        <div className="container-xl">
            <h2 className="font-serif font-extrabold fs-2 fs-md-1 text-white text-center mb-2">Why Choose <span className="text-teal-400">EAZEIT</span></h2>
            <p className="text-slate-400 text-sm text-md-base text-center mb-5">We make grocery shopping simple, affordable and reliable</p>
            
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card h-100 bg-slate-800 border-slate-700 rounded-xl p-4 p-md-5 text-center transition-all duration-300 hover:border-teal-400/50">
                        <div className="fs-1 font-serif font-extrabold text-teal-400 mb-3">{products.length}+</div>
                        <h3 className="fs-5 fw-bold text-white mb-2">Products Available</h3>
                        <p className="card-text text-sm text-slate-400 leading-relaxed">A wide selection of groceries, personal care, and household products all in one place.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 bg-slate-800 border-slate-700 rounded-xl p-4 p-md-5 text-center transition-all duration-300 hover:border-teal-400/50">
                        <div className="fs-1 font-serif font-extrabold text-teal-400 mb-3">24hrs</div>
                        <h3 className="fs-5 fw-bold text-white mb-2">Fast Delivery</h3>
                        <p className="card-text text-sm text-slate-400 leading-relaxed">We deliver your order within 24 hours or the same day for orders placed before 2 PM.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 bg-slate-800 border-slate-700 rounded-xl p-4 p-md-5 text-center transition-all duration-300 hover:border-teal-400/50">
                        <div className="fs-1 font-serif font-extrabold text-teal-400 mb-3">100%</div>
                        <h3 className="fs-5 fw-bold text-white mb-2">Quality Guaranteed</h3>
                        <p className="card-text text-sm text-slate-400 leading-relaxed">Every product is sourced directly from trusted brands and verified suppliers.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </>
  );
};
export default Home;
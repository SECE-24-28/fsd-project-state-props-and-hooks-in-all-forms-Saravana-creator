import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { showToast } from '../components/Toast';

const CAT_EMOJI = {
  'Oral Care': '🦷', 'Household': '🧹', 'Bath & Body': '🧼',
  'Food & Snacks': '🍎', 'Personal Care': '💊', 'Beverages': '☕', 'Dairy': '🥛', 'Others': '📦'
};

const CATEGORIES = ['Oral Care', 'Household', 'Bath & Body', 'Food & Snacks', 'Personal Care', 'Beverages', 'Dairy', 'Others'];

const EMPTY_FORM = { name: '', category: '', brand: '', price: '', mrp: '', unit: '', badge: '', image: '' };

const Admin = () => {
  const navigate = useNavigate();

  // ── Context hooks ─────────────────────────────────────────────────────────
  const { products, addProduct, updateProduct, deleteProduct, resetToSeed } = useProducts();

  // ── Local UI state ────────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [usersCount, setUsersCount] = useState(0);

  // Add form state
  const [addForm, setAddForm] = useState(EMPTY_FORM);

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  // ── Auth Guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const userJSON = sessionStorage.getItem('eazeit_active_user');
    if (!userJSON) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userJSON);
    if (user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  // ── Load user count ───────────────────────────────────────────────────────
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('eazeit_users')) || [];
    setUsersCount(storedUsers.length);
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleLogout = () => {
    sessionStorage.removeItem('eazeit_active_user');
    navigate('/login');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.category || !addForm.price) {
      showToast('Please fill in required fields (Name, Category, Price)', true);
      return;
    }
    // Uses addProduct from ProductContext – no direct localStorage access needed
    addProduct(addForm);
    showToast(`"${addForm.name}" added successfully!`);
    setAddForm(EMPTY_FORM);
    setActiveSection('dashboard');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this product?')) return;
    // Uses deleteProduct from ProductContext
    deleteProduct(id);
    showToast('Product deleted.');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Uses updateProduct from ProductContext
    updateProduct(editingId, editForm);
    showToast('Product updated successfully!');
    setEditingId(null);
  };

  const openEdit = (product) => {
    setEditForm({ ...product, price: String(product.price), mrp: String(product.mrp || '') });
    setEditingId(product.id);
  };

  const recentProducts = [...products].reverse().slice(0, 5);

  const titles = {
    'dashboard': 'Dashboard Overview',
    'add-product': 'Add New Product',
    'manage-products': 'Manage Products'
  };

  return (
    <div className="bg-slate-900 text-white font-sans antialiased h-screen overflow-hidden flex flex-col md:flex-row relative z-[9999] top-0 left-0 right-0 bottom-0 w-full fixed">
      
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700 shrink-0 z-20">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-500 rounded-md flex items-center justify-center font-serif font-extrabold text-lg text-slate-900">E</div>
          <span className="font-serif font-extrabold text-sm tracking-widest text-teal-400">ADMIN</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 flex flex-col gap-1">
          <span className="w-5 h-0.5 bg-white rounded"></span>
          <span className="w-5 h-0.5 bg-white rounded"></span>
          <span className="w-5 h-0.5 bg-white rounded"></span>
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-800 border-r border-slate-700 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col h-full`}>
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-lg flex items-center justify-center font-serif font-extrabold text-xl text-slate-900">E</div>
            <div className="flex flex-col leading-none">
              <span className="font-serif font-extrabold text-base tracking-widest text-teal-400">EAZEIT</span>
              <span className="text-[8px] text-slate-400 tracking-[0.2em] uppercase mt-0.5">Admin Panel</span>
            </div>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white">&#10005;</button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Menu</div>
          <nav className="flex flex-col gap-2">
            {[
              { key: 'dashboard', icon: '📊', label: 'Dashboard' },
              { key: 'add-product', icon: '➕', label: 'Add Product' },
              { key: 'manage-products', icon: '📦', label: 'Manage Products' },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => { setActiveSection(key); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors w-full text-left ${activeSection === key ? 'bg-teal-400/10 text-teal-400' : 'text-slate-400 hover:bg-teal-400/5 hover:text-white'}`}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </nav>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-8 mb-4">Account</div>
          <nav className="flex flex-col gap-2">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 rounded-lg font-medium text-sm transition-colors w-full text-left">
              <span>🚪</span> Logout
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-700 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-xs font-bold text-teal-400">AD</div>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-semibold text-white">Admin</span>
            <span className="text-[10px] text-slate-400">admin@eazeit.in</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-slate-900 overflow-hidden relative z-10">
        <header className="h-16 md:h-20 bg-slate-800 border-b border-slate-700 px-6 flex items-center justify-between shrink-0">
          <h1 className="font-serif font-bold text-lg md:text-xl text-white">{titles[activeSection]}</h1>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-xs text-slate-400 bg-slate-700 px-3 py-1 rounded-full">admin@eazeit.in</span>
            <button onClick={handleLogout} className="text-xs bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/30 px-3 py-1.5 rounded-lg font-semibold transition-all duration-200">Logout</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">

            {/* ── DASHBOARD SECTION ── */}
            {activeSection === 'dashboard' && (
              <div className="flex flex-col gap-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm">
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Products</div>
                    <div className="flex items-end justify-between">
                      {/* Uses products from ProductContext (all admin-managed) */}
                      <div className="text-3xl font-serif font-extrabold text-white">{products.length}</div>
                      <div className="text-teal-400 text-xs font-bold">Live</div>
                    </div>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm">
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Registered Users</div>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-serif font-extrabold text-white">{usersCount}</div>
                      <div className="text-teal-400 text-xs font-bold">Accounts</div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Banner */}
                <div className="bg-gradient-to-r from-teal-400/10 to-teal-500/5 border border-teal-400/20 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Quick Action</div>
                    <h2 className="text-lg font-bold text-white mb-1">Add a New Product</h2>
                    <p className="text-sm text-slate-400">Products you add here will appear live on the Products page for all shoppers.</p>
                  </div>
                  <button onClick={() => setActiveSection('add-product')} className="shrink-0 bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 active:scale-95">
                    + Add Product
                  </button>
                </div>

                {/* Recent Products Table */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                  <div className="p-5 border-b border-slate-700 flex items-center justify-between">
                    <h2 className="font-bold text-base text-white">Recently Added Products</h2>
                    <button onClick={() => setActiveSection('manage-products')} className="text-teal-400 hover:underline text-xs font-semibold">Manage All</button>
                  </div>
                  {recentProducts.length === 0 ? (
                    <div className="p-5 text-sm text-slate-400 text-center py-10">
                      No products added yet. <button onClick={() => setActiveSection('add-product')} className="text-teal-400 underline">Add your first product</button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase border-b border-slate-700">
                          <tr>
                            <th className="px-5 py-3">Product</th>
                            <th className="px-5 py-3">Category</th>
                            <th className="px-5 py-3">Price</th>
                            <th className="px-5 py-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/60">
                          {recentProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                              <td className="px-5 py-3 font-medium text-white">{p.name}</td>
                              <td className="px-5 py-3 text-slate-400">{p.category}</td>
                              <td className="px-5 py-3 text-teal-400 font-bold">Rs. {p.price}</td>
                              <td className="px-5 py-3 text-right">
                                <button onClick={() => setActiveSection('manage-products')} className="text-teal-400 hover:text-teal-300 text-xs font-semibold">Manage</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── ADD PRODUCT SECTION ── */}
            {activeSection === 'add-product' && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                  <h2 className="font-bold text-lg text-white">Add New Product</h2>
                  <p className="text-slate-400 text-sm mt-1">Fill in the details below. The product will appear on the Products page immediately.</p>
                </div>
                <form onSubmit={handleAddSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Product Name – full width */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Product Name *</label>
                    <input type="text" required value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400" />
                  </div>
                  {/* Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Category *</label>
                    <select required value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400">
                      <option value="">— Select Category —</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {/* Brand */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Brand</label>
                    <input type="text" value={addForm.brand} onChange={(e) => setAddForm({ ...addForm, brand: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400" />
                  </div>
                  {/* Price */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Price (Rs.) *</label>
                    <input type="number" min="0" step="0.01" required value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400" />
                  </div>
                  {/* MRP */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">MRP / Original Price (Rs.)</label>
                    <input type="number" min="0" step="0.01" value={addForm.mrp} onChange={(e) => setAddForm({ ...addForm, mrp: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400" />
                  </div>
                  {/* Unit */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Unit / Size</label>
                    <input type="text" value={addForm.unit} onChange={(e) => setAddForm({ ...addForm, unit: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400" />
                  </div>
                  {/* Badge */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Badge Label</label>
                    <input type="text" value={addForm.badge} onChange={(e) => setAddForm({ ...addForm, badge: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400" />
                  </div>
                  {/* Image URL – full width */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Product Image URL <span className="text-slate-500 font-normal normal-case">(optional)</span></label>
                    <input type="text" value={addForm.image} onChange={(e) => setAddForm({ ...addForm, image: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400" />
                  </div>
                  {/* Actions */}
                  <div className="md:col-span-2 flex gap-3 pt-2">
                    <button type="submit" className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold px-8 py-3 rounded-lg text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-teal-400/20">
                      ✓ Add Product
                    </button>
                    <button type="button" onClick={() => setAddForm(EMPTY_FORM)} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-200">
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── MANAGE PRODUCTS SECTION ── */}
            {activeSection === 'manage-products' && (
              <div className="flex flex-col gap-6">
                <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                  <div className="p-5 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-base text-white">Manage Products</h2>
                      <p className="text-xs text-slate-400 mt-0.5">All products listed here are admin-managed. Delete to remove from the store.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { if (window.confirm('Reset all products to the 5 original seed products?')) resetToSeed(); }}
                        className="shrink-0 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs px-3 py-2 rounded-lg transition-all duration-200 active:scale-95"
                      >
                        ↺ Reset Defaults
                      </button>
                      <button onClick={() => setActiveSection('add-product')} className="shrink-0 bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold text-xs px-4 py-2 rounded-lg transition-all duration-200 active:scale-95">
                        + Add New
                      </button>
                    </div>
                  </div>

                  {products.length === 0 ? (
                    <div className="p-10 text-center text-slate-400 text-sm">
                      No products added yet. <button onClick={() => setActiveSection('add-product')} className="text-teal-400 underline">Add your first product</button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-700/60">
                    {products.slice().reverse().map((p) => (
                        <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:bg-slate-700/20 transition-colors">
                          <div className="w-14 h-14 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden shrink-0 text-2xl">
                            {p.image ? (
                              <img src={p.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline'; }} />
                            ) : null}
                            <span style={{ display: p.image ? 'none' : 'inline' }}>{CAT_EMOJI[p.category] || '📦'}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white text-sm leading-snug">{p.name}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{p.category}{p.brand ? ` · ${p.brand}` : ''}{p.unit ? ` · ${p.unit}` : ''}</div>
                            {p.badge && <span className="inline-block mt-1 text-[10px] bg-teal-400/10 text-teal-400 border border-teal-400/20 px-2 py-0.5 rounded font-bold uppercase tracking-wide">{p.badge}</span>}
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-teal-400 font-bold text-base">Rs. {p.price}</div>
                            {p.mrp ? <div className="text-slate-500 text-xs line-through">Rs. {p.mrp}</div> : null}
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button onClick={() => openEdit(p)} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-3 py-1.5 rounded-lg transition-all">Edit</button>
                            <button onClick={() => handleDelete(p.id)} className="text-xs bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 font-semibold px-3 py-1.5 rounded-lg transition-all">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-20 md:hidden"></div>
      )}

      {/* ── Edit Modal ── */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-800 z-10">
              <h3 className="font-bold text-white">Edit Product</h3>
              <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-white text-xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Product Name *</label>
                <input type="text" required value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Category *</label>
                <select required value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Brand</label>
                <input type="text" value={editForm.brand} onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Price (Rs.) *</label>
                <input type="number" min="0" step="0.01" required value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">MRP (Rs.)</label>
                <input type="number" min="0" step="0.01" value={editForm.mrp} onChange={(e) => setEditForm({ ...editForm, mrp: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Unit / Size</label>
                <input type="text" value={editForm.unit} onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Badge</label>
                <input type="text" value={editForm.badge} onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Image URL</label>
                <input type="text" value={editForm.image} onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="sm:col-span-2 flex gap-3 pt-1">
                <button type="submit" className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold px-6 py-2.5 rounded-lg text-sm transition-all active:scale-95">Save Changes</button>
                <button type="button" onClick={() => setEditingId(null)} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold px-5 py-2.5 rounded-lg text-sm transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
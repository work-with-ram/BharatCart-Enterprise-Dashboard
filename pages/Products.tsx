
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  CheckSquare, 
  Square, 
  Trash2, 
  X, 
  Check,
  AlertCircle,
  Edit,
  Copy,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';

interface ProductsProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const Products: React.FC<ProductsProps> = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Ethnic Wear',
    price: '',
    stock: ''
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredProducts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleBulkStatusUpdate = (status: Product['status']) => {
    setProducts(prev => prev.map(p => 
      selectedIds.has(p.id) ? { ...p, status } : p
    ));
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.size} products?`)) {
      setProducts(prev => prev.filter(p => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
    }
  };

  const handleDeleteOne = (id: string) => {
    if (window.confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setActiveActionId(null);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `BC-SKU-${Math.floor(Math.random() * 10000)}`,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: 'Active',
      image: `https://images.unsplash.com/photo-${1600000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&w=400&q=80`
    };

    setProducts([product, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: 'Ethnic Wear', price: '', stock: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 relative min-h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-indigo-900">Inventory Catalog</h1>
          <p className="text-slate-500 text-sm font-medium">Managing {products.length} unique Indian products.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-black hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20 active:scale-95 text-sm uppercase tracking-widest"
        >
          <Plus size={18} />
          Add New Product
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search SKUs or Product Names..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-48">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-bold hover:bg-slate-50 outline-none appearance-none"
             >
              <option>All Categories</option>
              <option>Ethnic Wear</option>
              <option>Handicrafts</option>
              <option>Wellness</option>
              <option>Home Decor</option>
              <option>FMCG</option>
             </select>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] py-24 flex flex-col items-center justify-center text-center space-y-6">
           <div className="relative">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300">
                <ShoppingBag size={48} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 border-4 border-white shadow-sm">
                <Plus size={20} />
              </div>
           </div>
           <div>
             <h3 className="text-xl font-black text-indigo-950">Your Catalog is Empty</h3>
             <p className="text-slate-500 max-w-sm mx-auto font-medium mt-2">Start your BharatCart journey by listing your first indigenous product SKU.</p>
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-8 py-3 bg-indigo-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-950 transition-all active:scale-95"
           >
             Create My First Product
           </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-6 py-4 w-12">
                    <button onClick={toggleSelectAll} className="p-1 hover:bg-slate-200 rounded transition-colors text-indigo-900">
                      {selectedIds.size === filteredProducts.length && filteredProducts.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                  </th>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">MRP (₹)</th>
                  <th className="px-6 py-4">Stock Level</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className={`hover:bg-orange-50/20 transition-colors ${selectedIds.has(product.id) ? 'bg-orange-50/40' : ''}`}>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleSelect(product.id)} className={`p-1 rounded transition-colors ${selectedIds.has(product.id) ? 'text-orange-600' : 'text-slate-300'}`}>
                        {selectedIds.has(product.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-100" />
                        <div>
                          <p className="font-black text-slate-900 text-sm leading-tight">{product.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 text-[10px] font-black bg-slate-100 px-2.5 py-1 rounded-lg uppercase">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-indigo-900 text-sm italic">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32 space-y-1.5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                          <span className={product.stock === 0 ? 'text-rose-600' : 'text-indigo-900'}>{product.stock} Units</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${product.stock === 0 ? 'bg-rose-500' : product.stock < 10 ? 'bg-amber-500' : 'bg-indigo-900'}`}
                            style={{ width: `${Math.min((product.stock/150)*100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        product.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        product.status === 'Draft' ? 'bg-slate-100 text-slate-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setActiveActionId(activeActionId === product.id ? null : product.id)}
                        className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-indigo-900"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      {activeActionId === product.id && (
                        <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-left">
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">
                            <Edit size={14} /> Edit Listing
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">
                            <Copy size={14} /> Duplicate SKU
                          </button>
                          <button 
                            onClick={() => handleDeleteOne(product.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 size={14} /> Delete SKU
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-950 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-8 z-50 animate-in slide-in-from-bottom-10 duration-300 border border-indigo-900">
          <div className="flex items-center gap-3 pr-8 border-r border-indigo-800">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-black text-xs">{selectedIds.size}</div>
            <span className="text-sm font-bold tracking-tight">Products Selected</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleBulkStatusUpdate('Active')} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-xl transition-colors text-xs font-black uppercase tracking-widest text-emerald-400">
              <Check size={16} /> Activate
            </button>
            <button onClick={() => handleBulkStatusUpdate('Draft')} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-xl transition-colors text-xs font-black uppercase tracking-widest text-slate-400">
              <X size={16} /> Draft
            </button>
            <button onClick={handleBulkDelete} className="flex items-center gap-2 px-3 py-1.5 hover:bg-rose-500/20 rounded-xl transition-colors text-xs font-black uppercase tracking-widest text-rose-400">
              <Trash2 size={16} /> Remove
            </button>
          </div>
          <button onClick={() => setSelectedIds(new Set())} className="p-2 hover:bg-white/10 rounded-full text-slate-400">
            <X size={18} />
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 pb-0 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-indigo-950">Add Indian SKU</h2>
                <p className="text-slate-500 text-sm font-medium">List a new product to BharatCart inventory.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-8 space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Title</label>
                <input autoFocus required type="text" placeholder="e.g. Pashmina Wool Shawl" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-bold" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                  <input required type="number" placeholder="999" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-bold" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Stock</label>
                  <input required type="number" placeholder="50" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-bold" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Market Segment</label>
                <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-bold appearance-none" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                  <option>Ethnic Wear</option>
                  <option>Handicrafts</option>
                  <option>Wellness</option>
                  <option>Home Decor</option>
                  <option>FMCG</option>
                </select>
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <button type="submit" className="w-full py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20 active:scale-95 uppercase tracking-widest text-xs">Publish to Catalog</button>
                <p className="text-center text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1"><AlertCircle size={12} /> Product will go Live immediately as 'Active'</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

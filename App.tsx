
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { AIInsights } from './pages/AIInsights';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { Readme } from './pages/Readme';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_CUSTOMERS } from './constants';
import { Product, Order } from './types';
import { Customer } from './constants';
import { 
  Bell, 
  Search, 
  Menu, 
  X,
  User,
  LogOut,
  Settings as SettingsIcon,
  Sparkles,
  Globe,
  Lock,
  CreditCard,
  Smartphone,
  Check,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Package,
  Users,
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  FileText,
  UserCircle,
  BookOpen
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Notifications');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'order-alerts': true,
    'low-stock': true,
    'ai-insight': true,
    'gst-reminders': false,
    'security-logs': true,
    'vpa-alerts': true
  });

  const toggleSetting = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const sections = [
    { id: 'General', icon: Globe, label: 'Store Profile' },
    { id: 'Security', icon: Lock, label: 'Access' },
    { id: 'Billing', icon: CreditCard, label: 'GST & UPI' },
    { id: 'Notifications', icon: Bell, label: 'Alerts' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-indigo-950">System Preferences</h1>
          <p className="text-slate-500 font-medium">BharatCart Enterprise v2.4 Dashboard Configuration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide no-print">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex-shrink-0 flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-sm min-w-[140px] lg:min-w-0 ${
                  activeTab === section.id 
                    ? 'bg-indigo-900 text-white shadow-xl shadow-indigo-200 lg:translate-x-2' 
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <section.icon size={20} />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50/50 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                  {sections.find(s => s.id === activeTab)?.icon && React.createElement(sections.find(s => s.id === activeTab)!.icon, { size: 24 })}
                </div>
                <div>
                  <h3 className="text-xl font-black text-indigo-950">{activeTab}</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Enterprise Instance ID: BC-ENT-2401</p>
                </div>
              </div>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-indigo-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-950 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-100">
                <Check size={16} /> Save Changes
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'Notifications' && (
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Transactional Intelligence</h4>
                      <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Enable All</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: 'order-alerts', title: 'High-Value Order Alerts', desc: 'Critical alerts for transactions exceeding ₹50,000 INR threshold.', icon: Zap },
                        { id: 'low-stock', title: 'Inventory Warning (Smart Logic)', desc: 'Predictive inventory replenishment alerts powered by local analytics.', icon: ShoppingBag },
                      ].map((item) => (
                        <div key={item.id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer" onClick={() => toggleSetting(item.id)}>
                          <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0">
                            <div className={`p-3 rounded-2xl transition-colors ${toggles[item.id] ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}>
                              <item.icon size={20} />
                            </div>
                            <div className="flex-1">
                              <p className="font-black text-indigo-950 leading-tight">{item.title}</p>
                              <p className="text-xs text-slate-500 font-medium mt-1 md:max-w-md">{item.desc}</p>
                            </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative transition-all duration-300 flex-shrink-0 ${toggles[item.id] ? 'bg-emerald-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${toggles[item.id] ? 'right-1' : 'right-7'}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Security & Governance</h4>
                      <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Enable All</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: 'gst-reminders', title: 'GST Compliance Calendar', desc: 'Automated reminders for GSTR-1 and GSTR-3B monthly filing deadlines.', icon: FileText },
                        { id: 'security-logs', title: 'Admin Session Guard', desc: 'Instant mobile alerts for every successful login to this administrative hub.', icon: ShieldCheck },
                      ].map((item) => (
                        <div key={item.id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer" onClick={() => toggleSetting(item.id)}>
                          <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0">
                             <div className={`p-3 rounded-2xl transition-colors ${toggles[item.id] ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-400'}`}>
                              <item.icon size={20} />
                            </div>
                            <div className="flex-1">
                              <p className="font-black text-indigo-950 leading-tight">{item.title}</p>
                              <p className="text-xs text-slate-500 font-medium mt-1 md:max-w-md">{item.desc}</p>
                            </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative transition-all duration-300 flex-shrink-0 ${toggles[item.id] ? 'bg-emerald-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${toggles[item.id] ? 'right-1' : 'right-7'}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'General' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Store Legal Name</label>
                    <input type="text" defaultValue="BharatCart Marketplace Private Ltd" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
                    <input type="email" defaultValue="compliance@bharatcart.in" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Currency</label>
                    <input type="text" defaultValue="INR (₹) - Indian Rupee" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Timezone</label>
                    <input type="text" defaultValue="(GMT+05:30) Mumbai, New Delhi" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none" />
                  </div>
                </div>
              )}

              {activeTab === 'Billing' && (
                <div className="space-y-6">
                  <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-900 shadow-sm border border-indigo-50">
                      <Smartphone size={32} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="font-black text-indigo-900 text-lg">UPI Business Integration</h4>
                      <p className="text-indigo-700/70 text-sm font-medium">Your merchant VPA is active and linked to HDFC Enterprise Account.</p>
                    </div>
                    <button className="px-6 py-2.5 bg-white text-indigo-900 border border-indigo-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all">
                      Manage VPA
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">GSTIN Number</label>
                        <input type="text" defaultValue="27AAACB1234F1Z5" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SAC Code Default</label>
                        <input type="text" defaultValue="998311" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none" />
                      </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onMenuClick, onLogout, user }: { onMenuClick: () => void, onLogout: () => void, user: any }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 no-print">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 group focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search size={18} className="text-slate-400 group-focus-within:text-indigo-600" />
          <input 
            type="text" 
            placeholder="Search SKUs, Orders..." 
            className="bg-transparent border-none outline-none text-sm text-slate-700 w-64 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-colors group">
          <Bell size={20} className="text-slate-500 group-hover:text-indigo-900" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center text-white font-black border-2 border-white shadow-sm overflow-hidden text-sm uppercase">
               {user.ownerName?.charAt(0) || 'A'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-black text-indigo-950 leading-none">{user.ownerName}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Enterprise Admin</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 p-3 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
              <div className="px-4 py-4 border-b border-slate-50">
                <p className="text-sm font-black text-indigo-950">{user.ownerName}</p>
                <p className="text-xs text-slate-500 font-medium">{user.emailPrefix}@gmail.com</p>
                <div className="mt-2 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">Verified Merchant</div>
              </div>
              <div className="py-2">
                <Link to="/profile" onClick={() => setShowProfile(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                  <User size={18} className="text-slate-400" /> My Profile
                </Link>
                <Link to="/readme" onClick={() => setShowProfile(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                  <BookOpen size={18} className="text-slate-400" /> Documentation
                </Link>
                <Link to="/settings" onClick={() => setShowProfile(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                  <SettingsIcon size={18} className="text-slate-400" /> Preferences
                </Link>
              </div>
              <div className="pt-2 border-t border-slate-50">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ ownerName: '', businessName: '', emailPrefix: '' });
  
  // App-level state for products, orders, and customers
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleLogin = (userData: any, isDemo: boolean) => {
    setUser(userData);
    setIsAuthenticated(true);
    
    if (isDemo) {
      setProducts(MOCK_PRODUCTS);
      setOrders(MOCK_ORDERS);
      setCustomers(MOCK_CUSTOMERS);
    } else {
      setProducts([]);
      setOrders([]);
      setCustomers([]);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setProducts([]);
    setOrders([]);
    setCustomers([]);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar />

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white h-full animate-in slide-in-from-left duration-300 shadow-2xl overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="text-orange-400" size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-black tracking-tighter text-indigo-900 leading-none">BHARAT</span>
                      <span className="text-xs font-bold tracking-widest text-orange-600 leading-none uppercase">Cart</span>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>
                <div className="space-y-1">
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-4">Core Management</div>
                   <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 font-medium">
                     <LayoutDashboard size={20} /> Dashboard
                   </Link>
                   <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 font-medium">
                     <Package size={20} /> Products
                   </Link>
                   <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 font-medium">
                     <ShoppingCart size={20} /> Orders
                   </Link>
                   <Link to="/customers" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 font-medium">
                     <Users size={20} /> Customers
                   </Link>
                   <Link to="/analytics" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 font-medium">
                     <BarChart3 size={20} /> Analytics
                   </Link>
                   <div className="pt-6">
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-4">Smart Hub</div>
                     <Link to="/ai-insights" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 font-medium">
                       <Sparkles size={20} /> Smart Intelligence
                     </Link>
                     <Link to="/readme" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 font-medium">
                       <BookOpen size={20} /> Documentation
                     </Link>
                   </div>
                   <div className="pt-6">
                     <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 font-medium">
                       <SettingsIcon size={20} /> Settings
                     </Link>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 md:ml-64 flex flex-col min-w-0">
          <Navbar onMenuClick={() => setMobileMenuOpen(true)} onLogout={handleLogout} user={user} />
          
          <div className="p-4 md:p-10 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard products={products} orders={orders} customers={customers} userName={user.ownerName} />} />
              <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
              <Route path="/orders" element={<Orders orders={orders} />} />
              <Route path="/customers" element={<Customers customers={customers} setCustomers={setCustomers} />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ai-insights" element={<AIInsights products={products} orders={orders} />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/readme" element={<Readme />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          
          <footer className="mt-auto p-10 border-t border-slate-200 bg-white no-print">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center md:items-start gap-1">
                <p className="text-slate-900 text-sm font-black">BharatCart Enterprise OS</p>
                <p className="text-slate-400 text-xs font-medium">© 2024 BharatCart Ltd. All Rights Reserved.</p>
              </div>
              <div className="flex gap-8">
                <Link to="/readme" className="text-slate-500 hover:text-indigo-900 text-xs font-black uppercase tracking-widest transition-colors">Documentation</Link>
                <a href="#" className="text-slate-500 hover:text-indigo-900 text-xs font-black uppercase tracking-widest transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-500 hover:text-indigo-900 text-xs font-black uppercase tracking-widest transition-colors">API Status</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </Router>
  );
}

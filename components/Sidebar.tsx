
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Sparkles, 
  Settings,
  ChevronRight,
  ShoppingBag,
  BookOpen
} from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
        <span className="font-medium text-sm">{label}</span>
      </div>
      {isActive && <ChevronRight size={16} />}
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 hidden md:flex flex-col z-40">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center">
            <ShoppingBag className="text-orange-400" size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-indigo-900 leading-none">BHARAT</span>
            <span className="text-sm font-bold tracking-widest text-orange-600 leading-none">CART</span>
          </div>
        </div>

        <nav className="space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-4">Core Management</div>
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/products" icon={Package} label="Products" />
          <NavItem to="/orders" icon={ShoppingCart} label="Orders" />
          <NavItem to="/customers" icon={Users} label="Customers" />
          <NavItem to="/analytics" icon={BarChart3} label="Analytics" />
          
          <div className="pt-6">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-4">Merchant Hub</div>
            <NavItem to="/ai-insights" icon={Sparkles} label="Smart Intelligence" />
            <NavItem to="/readme" icon={BookOpen} label="Documentation" />
          </div>
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <NavItem to="/settings" icon={Settings} label="Settings" />
        <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="text-[10px] font-bold text-indigo-900 mb-2 uppercase tracking-tight">Enterprise Instance</p>
          <div className="h-2 w-full bg-indigo-200 rounded-full mb-2">
            <div className="h-full w-full bg-orange-500 rounded-full"></div>
          </div>
          <p className="text-[10px] text-indigo-700">Security: Hardened</p>
        </div>
      </div>
    </aside>
  );
};


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  MoreVertical,
  Banknote,
  Eye,
  FileText,
  Truck,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { StatCard } from '../components/StatCard';
import { Product, Order } from '../types';
import { Customer } from '../constants';

const COLORS = ['#4f46e5', '#f97316', '#10b981', '#ef4444'];

interface DashboardProps {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  userName: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ products, orders, customers, userName }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  // Calculate stats from dynamic data
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.amount, 0);
  const activeProductsCount = products.filter(p => p.status === 'Active').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-indigo-900">Namaste, {userName}</h1>
          <p className="text-slate-500">
            {products.length === 0 
              ? "Welcome! Let's get started by listing your first product." 
              : "Here is how BharatCart is performing today."}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/analytics')}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-bold hover:bg-slate-50 transition-colors text-sm"
          >
            Performance Report
          </button>
          <button 
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-100 text-sm flex items-center gap-2"
          >
            <Plus size={16} /> List New Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={`₹${totalRevenue.toLocaleString('en-IN')}`} 
          change={orders.length > 0 ? 12.5 : 0} 
          icon={Banknote} 
          iconColor="bg-indigo-600" 
        />
        <StatCard 
          label="Orders" 
          value={orders.length.toLocaleString('en-IN')} 
          change={orders.length > 0 ? 8.2 : 0} 
          icon={ShoppingBag} 
          iconColor="bg-orange-500" 
        />
        <StatCard 
          label="Verified Customers" 
          value={customers.length.toLocaleString('en-IN')} 
          change={customers.length > 0 ? 4.1 : 0} 
          icon={Users} 
          iconColor="bg-emerald-600" 
        />
        <StatCard 
          label="SKUs Active" 
          value={activeProductsCount.toString()} 
          change={products.length > 0 ? 2.4 : 0} 
          icon={Package} 
          iconColor="bg-indigo-900" 
        />
      </div>

      {orders.length === 0 ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-12 text-center space-y-4">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
             <ShoppingBag className="text-indigo-900" size={32} />
           </div>
           <h3 className="text-xl font-black text-indigo-950">No Sales Data Yet</h3>
           <p className="text-slate-500 max-w-sm mx-auto font-medium">Once you start receiving orders from your customers, real-time analytics and growth charts will appear here.</p>
           <button onClick={() => navigate('/products')} className="px-6 py-2.5 bg-indigo-900 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100">Add Your First Product</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Revenue Growth (INR)</h3>
              <select className="bg-slate-50 border-none text-sm font-medium text-slate-600 rounded-lg px-2 py-1 outline-none">
                <option>FY 2024-25</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[...Array(7)].map((_, i) => ({ name: `Day ${i+1}`, revenue: Math.random() * 50000 }))}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Trending Categories</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Ethnic', val: 55 },
                  { name: 'Decor', val: 22 },
                  { name: 'Gifts', val: 15 },
                  { name: 'Foods', val: 8 },
                ]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="val" radius={[6, 6, 0, 0]} barSize={35}>
                    {[0,1,2,3].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {orders.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Latest Shipments</h3>
            <button 
              onClick={() => navigate('/orders')}
              className="text-indigo-600 text-sm font-bold hover:underline"
            >
              Track All Orders
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">{order.id}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-slate-500">{order.date}</td>
                    <td className="px-6 py-4 font-black text-indigo-900">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Processing' ? 'bg-orange-100 text-orange-700' :
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === order.id ? null : order.id)}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      >
                        <MoreVertical size={16} className="text-slate-400" />
                      </button>
                      {activeMenu === order.id && (
                        <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">
                            <Eye size={14} /> View Details
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">
                            <FileText size={14} /> Invoice PDF
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg">
                            <Truck size={14} /> Track AWB
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
    </div>
  );
};

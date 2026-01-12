
import React from 'react';
import { Search, Download, Filter, Calendar, ShoppingCart } from 'lucide-react';
import { Order } from '../types';

interface OrdersProps {
  orders: Order[];
}

export const Orders: React.FC<OrdersProps> = ({ orders }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-indigo-900">Order Management</h1>
          <p className="text-slate-500 text-sm font-medium">Viewing {orders.length} customer transactions.</p>
        </div>
        <div className="flex gap-2">
          {orders.length > 0 && (
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-bold hover:bg-slate-50 transition-colors text-sm">
              <Download size={18} />
              Export CSV
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Pickup</p>
            <p className="text-xl font-black text-indigo-950">{orders.filter(o => o.status === 'Processing').length}</p>
          </div>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Calendar size={20} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Transit</p>
            <p className="text-xl font-black text-indigo-950">0</p>
          </div>
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Filter size={20} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed Today</p>
            <p className="text-xl font-black text-indigo-950">{orders.filter(o => o.status === 'Completed').length}</p>
          </div>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        {orders.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
              <ShoppingCart size={32} />
            </div>
            <div>
              <h3 className="text-lg font-black text-indigo-950">No Orders Found</h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">As soon as a customer purchases something, the transaction details will be logged here for tracking.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by order ID or customer..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-bold hover:bg-slate-50">
                  <Filter size={18} /> Filters
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Total (₹)</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-black text-indigo-950 text-sm">{order.id}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs font-bold uppercase">{order.date}</td>
                      <td className="px-6 py-4 font-black text-indigo-900 text-sm">₹{order.amount.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 text-xs font-black uppercase tracking-widest hover:underline">Track</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

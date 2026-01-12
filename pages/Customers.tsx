
import React, { useState } from 'react';
import { Search, Mail, Phone, MoreVertical, Star, Plus, X, User, ShieldCheck, UserCircle, Users } from 'lucide-react';
import { Customer } from '../constants';

interface CustomersProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

export const Customers: React.FC<CustomersProps> = ({ customers, setCustomers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    city: 'Mumbai'
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const customer: Customer = {
      id: `CUS-IND-${Math.floor(Math.random() * 1000)}`,
      name: newCustomer.name,
      email: newCustomer.email,
      orders: 0,
      totalSpent: 0,
      lastOrder: 'New Customer',
      avatar: ''
    };
    setCustomers([customer, ...customers]);
    setIsModalOpen(false);
    setNewCustomer({ name: '', email: '', city: 'Mumbai' });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-indigo-900">Customer Base</h1>
          <p className="text-slate-500 text-sm font-medium">Managing relationships with {customers.length} verified buyers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-indigo-900 text-white rounded-xl font-black hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-100 text-sm uppercase tracking-widest flex items-center gap-2"
        >
          <Plus size={18} />
          New Customer
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        {customers.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
              <Users size={32} />
            </div>
            <div>
              <h3 className="text-lg font-black text-indigo-950">No Customers Registered</h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">When you receive your first order or manually add a customer, they will appear in this database.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-indigo-950 text-white rounded-xl font-black text-xs uppercase tracking-widest">Manual Entry</button>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4 text-xs text-slate-500 font-black uppercase tracking-widest">
                <span className="hidden sm:inline">Active: <b className="text-indigo-900">100%</b></span>
              </div>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Customer Identity</th>
                    <th className="px-6 py-4">Tier</th>
                    <th className="px-6 py-4">Lifetime Orders</th>
                    <th className="px-6 py-4">LTV (₹)</th>
                    <th className="px-6 py-4">Last Order</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                            <UserCircle size={24} />
                          </div>
                          <div>
                            <p className="font-black text-indigo-950 text-sm">{customer.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {customer.orders > 10 ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <Star size={10} fill="currentColor" /> ELITE
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            MEMBER
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-black text-sm">{customer.orders}</td>
                      <td className="px-6 py-4 font-black text-indigo-900 text-sm italic">₹{customer.totalSpent.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs font-bold uppercase">{customer.lastOrder}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                            <Mail size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                            <Phone size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-indigo-900 hover:bg-slate-100 rounded-xl transition-all">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 pb-0 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-indigo-950">Register Customer</h2>
                <p className="text-slate-500 text-sm font-medium">Add a manual buyer entry to the database.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddCustomer} className="p-8 space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input autoFocus required type="text" placeholder="Arjun Sharma" className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-bold" value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input required type="email" placeholder="arjun@domain.in" className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-bold" value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location / Zone</label>
                <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-bold appearance-none" value={newCustomer.city} onChange={e => setNewCustomer({...newCustomer, city: e.target.value})}>
                  <option>Mumbai</option>
                  <option>Delhi NCR</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                  <option>Kolkata</option>
                </select>
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <button type="submit" className="w-full py-4 bg-indigo-900 text-white font-black rounded-2xl hover:bg-indigo-950 transition-all shadow-xl shadow-indigo-900/20 active:scale-95 uppercase tracking-widest text-xs">Create Member</button>
                <p className="text-center text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-tight"><ShieldCheck size={12} className="text-emerald-500" /> Auto-Verify Email Identity</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

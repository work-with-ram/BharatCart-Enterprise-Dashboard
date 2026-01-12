
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, Download, FileJson, Image as ImageIcon, Share2, Printer } from 'lucide-react';
import { REVENUE_DATA } from '../constants';

const PIE_DATA = [
  { name: 'Mobile App', value: 650 },
  { name: 'Web Store', value: 350 },
  { name: 'Instagram Shop', value: 200 },
];
const COLORS = ['#4f46e5', '#f97316', '#10b981'];

export const Analytics = () => {
  const analyticsRef = React.useRef<HTMLDivElement>(null);

  const exportToCSV = () => {
    const headers = ['Month', 'Revenue (INR)', 'Orders', 'Growth (%)'];
    const csvContent = [
      headers.join(','),
      ...REVENUE_DATA.map(row => `${row.name},${row.revenue},${row.orders},${row.growth}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BharatCart_Analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify({
      reportDate: new Date().toISOString(),
      platform: 'BharatCart Admin',
      metrics: REVENUE_DATA,
      channels: PIE_DATA
    }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BharatCart_Report.json`;
    link.click();
  };

  const captureMiniScreenshot = async () => {
    if (!analyticsRef.current) return;
    try {
      // @ts-ignore - html2canvas is loaded via CDN in index.html
      const canvas = await window.html2canvas(analyticsRef.current, {
        scale: 2,
        backgroundColor: '#f8fafc',
        logging: false,
        useCORS: true
      });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `BharatCart_Snap_${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error('Screenshot failed:', err);
      alert('Failed to capture screenshot. Browser might have blocked the operation.');
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div ref={analyticsRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-indigo-900 p-8 rounded-3xl text-white no-print">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Export Center</h1>
          <p className="text-indigo-200 mt-1">Generate performance snapshots and data feeds.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all font-black text-xs uppercase tracking-widest"
          >
            <Download size={16} /> Export CSV
          </button>
          <button 
            onClick={exportToJSON}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all font-black text-xs uppercase tracking-widest"
          >
            <FileJson size={16} /> Export JSON
          </button>
          <button 
            onClick={captureMiniScreenshot}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl transition-all font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-900/20"
          >
            <ImageIcon size={16} /> Capture View
          </button>
          <button 
            onClick={printReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-900 rounded-xl transition-all font-black text-xs uppercase tracking-widest"
          >
            <Printer size={16} /> Print PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-lg uppercase tracking-tight">
                <TrendingUp size={20} className="text-indigo-600" />
                Growth Trajectory
              </h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest opacity-60">Month-over-Month Growth %</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 900}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 900}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} 
                  formatter={(val) => [`${val}%`, 'Growth Rate']}
                />
                <Line type="monotone" dataKey="growth" stroke="#4f46e5" strokeWidth={5} dot={{r: 6, fill: '#4f46e5', strokeWidth: 3, stroke: '#fff'}} activeDot={{r: 10}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
           <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-lg uppercase tracking-tight">
                <Users size={20} className="text-orange-600" />
                Channel Composition
              </h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest opacity-60">Traffic Distribution</p>
            </div>
          </div>
          <div className="h-[300px] w-full flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-auto space-y-3">
              {PIE_DATA.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between md:justify-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="font-black text-indigo-900 text-sm">{Math.round((item.value/1200)*100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
           <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-xl uppercase tracking-tighter">
                <ShoppingBag size={24} className="text-emerald-600" />
                Revenue Performance Audit
              </h3>
              <p className="text-slate-500 text-sm font-black uppercase tracking-[0.2em] opacity-40">Financial Year 24-25 Baseline</p>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOrd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 900}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 900}} />
                <Tooltip 
                  formatter={(val) => `₹${val.toLocaleString('en-IN')}`}
                  contentStyle={{ borderRadius: '20px', border: 'none', padding: '20px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorOrd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Layers, 
  FileText, 
  Database, 
  Zap,
  ArrowRight,
  ShoppingBag,
  Lock
} from 'lucide-react';

export const Readme: React.FC = () => {
  const sections = [
    {
      title: "Core Infrastructure",
      icon: Cpu,
      desc: "BharatCart Enterprise OS is built on a distributed node architecture, ensuring high availability and low-latency performance for high-volume Indian marketplaces."
    },
    {
      title: "SQL Identity Registry",
      icon: Database,
      desc: "Our proprietary vault system ensures that only authorized merchant nodes can access enterprise-level administrative functions, protected by AES-256 encryption."
    },
    {
      title: "Predictive Logic",
      icon: Zap,
      desc: "Integrated logic engines analyze real-time transaction data to provide inventory alerts and growth strategies tailored for regional Indian trade dynamics."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Hero Section */}
      <div className="relative p-12 lg:p-20 bg-indigo-950 rounded-[3rem] text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20">
            <BookOpen size={40} className="text-orange-400" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter">BharatCart v2.4 <br/> Documentation</h1>
          <p className="text-indigo-200 text-lg lg:text-xl max-w-2xl font-medium">
            The definitive guide to the sovereign digital infrastructure for India's premier merchants and artisans.
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 group hover:translate-y-[-4px] transition-all">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-900 mb-6 group-hover:bg-indigo-900 group-hover:text-white transition-colors">
              <s.icon size={24} />
            </div>
            <h3 className="text-xl font-black text-indigo-950 mb-3">{s.title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Deep Dive Section */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-10 lg:p-16 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Protocol 01</span>
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">Sovereign Marketplace Control</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              BharatCart is not just a dashboard; it is an Operating System for commerce. We empower merchants to own their data and customer relationships. Our system bypasses generic global templates in favor of localized, high-performance logic engines designed specifically for the Indian rupee-based economy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl">
                <ShieldCheck className="text-emerald-600 mt-1" size={20} />
                <div>
                  <p className="font-black text-indigo-950 text-sm uppercase">Regulatory Ready</p>
                  <p className="text-xs text-slate-500 mt-1 font-bold">Built-in GST-compliance engines and HSN code mapping.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl">
                <Globe className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-black text-indigo-950 text-sm uppercase">Regional Scaling</p>
                  <p className="text-xs text-slate-500 mt-1 font-bold">Support for various Indian shipping corridors and logistics nodes.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Protocol 02</span>
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">Smart Advisor Module</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              The platform features an advanced predictive advisor that processes your SKU performance against real-time market trends. It identifies growth opportunities in categories like Ethnic Wear, Wellness, and Home Decor, providing actionable business intelligence without external dependency.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Automatic Inventory Replenishment logic based on sales velocity.",
                "Customer Tiering (Elite vs. Member) based on LTV analysis.",
                "Dynamic revenue growth mapping with Indian FY support."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
        
        <div className="bg-slate-50 p-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-6">
          <div className="flex items-center gap-4">
            <Lock className="text-slate-400" size={24} />
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Security Compliance</p>
              <p className="text-sm font-bold text-indigo-950">Enterprise Instance Identity: BC-OS-REL-2024</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-8 py-3 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95">
            System Status <ArrowRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Footer info */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm mb-2">
          <ShoppingBag className="text-indigo-900" size={24} />
        </div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em]">BharatCart Merchant Documentation v2.4</p>
      </div>
    </div>
  );
};

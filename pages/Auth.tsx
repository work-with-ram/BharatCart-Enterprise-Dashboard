
import React, { useState } from 'react';
import { 
  ShoppingBag, ArrowRight, Mail, Lock, User, 
  ShieldCheck, Briefcase, ChevronRight, CheckCircle2,
  Layers, MousePointer2, Layout, Database, ShieldAlert,
  Sparkles, TrendingUp, Globe
} from 'lucide-react';

interface AuthProps {
  onLogin: (userData: any, isDemo: boolean) => void;
}

// Simulated SQL Database Key
const SQL_DB_KEY = 'bharatcart_sql_registry_v1';

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Form states
  const [emailPrefix, setEmailPrefix] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');

  // SQL Simulation Logic
  const queryRegistry = () => {
    const data = localStorage.getItem(SQL_DB_KEY);
    return data ? JSON.parse(data) : [];
  };

  const insertUser = (user: any) => {
    const registry = queryRegistry();
    registry.push(user);
    localStorage.setItem(SQL_DB_KEY, JSON.stringify(registry));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const registry = queryRegistry();
      const generatedPrefix = businessName.toLowerCase().replace(/\s+/g, '').trim();
      
      // SQL Unique Constraint Check
      const exists = registry.find((u: any) => u.emailPrefix === generatedPrefix);
      if (exists) {
        setError('This Business Identity already exists in our SQL registry.');
        setLoading(false);
        return;
      }

      // SQL Insert Operation
      const newUser = {
        ownerName,
        businessName,
        emailPrefix: generatedPrefix,
        password: password 
      };
      
      insertUser(newUser);
      
      setSuccessMsg(`Node registered! Use "${generatedPrefix}" to login.`);
      setIsLogin(true);
      setLoading(false);
      setEmailPrefix(generatedPrefix);
      setPassword('');
    }, 1200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const registry = queryRegistry();
      const normalizedPrefix = emailPrefix.toLowerCase().trim();
      
      // 1. Check for official demo credentials (for testing)
      if (normalizedPrefix === 'demo' && password === 'demo@123') {
        onLogin({
          ownerName: 'Arjun Sharma',
          businessName: 'Sharma Handicrafts',
          emailPrefix: 'demo'
        }, true);
        return;
      }

      // 2. Strict SQL Query: SELECT * FROM Users WHERE prefix = ? AND pass = ?
      const userMatch = registry.find((u: any) => 
        u.emailPrefix === normalizedPrefix && u.password === password
      );

      if (userMatch) {
        onLogin({
          ownerName: userMatch.ownerName,
          businessName: userMatch.businessName,
          emailPrefix: userMatch.emailPrefix
        }, false);
      } else {
        // SECURITY: Access denied for random or incorrect inputs
        setError('Security Violation: Unauthorized credentials. Node access denied.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-inter selection:bg-indigo-900 selection:text-white">
      {/* Visual Section */}
      <div className="lg:w-[55%] bg-[#020617] p-10 lg:p-20 flex flex-col justify-between relative overflow-hidden transition-all duration-700">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[160px] transition-all duration-1000 ${isLogin ? 'bg-orange-600/10' : 'bg-indigo-600/10'}`}></div>
          <div className={`absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-1000 ${isLogin ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <ShoppingBag className="text-black" size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white leading-none">BHARAT</span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-indigo-400 leading-none mt-1 uppercase">Enterprise</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 py-12">
          {isLogin ? (
            /* Product/Platform Details for Sign In */
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[9px] font-black text-orange-400 uppercase tracking-widest mb-8">
                <Sparkles size={12} /> Enterprise Scale Assets
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8">
                Premiere <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-400">Marketplace.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium max-w-lg border-l-2 border-orange-600 pl-6">
                Launch your ethnic collections, handicrafts, and wellness products to a nationwide audience with BharatCart's industrial-grade infrastructure.
              </p>
            </div>
          ) : (
            /* Registry/Security Details for Sign Up */
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-8">
                <Database size={12} /> SQL Identity Vault Active
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8">
                Secured <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Registry.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium max-w-lg border-l-2 border-indigo-600 pl-6">
                Only verified node identities within the SQL registry are permitted entry. Random access is strictly prohibited.
              </p>
            </div>
          )}
        </div>

        <div className="relative z-10 flex items-center gap-8 text-slate-700 font-black uppercase tracking-[0.3em] text-[10px]">
          {isLogin ? (
            <>
              <span className="flex items-center gap-2"><TrendingUp size={14} /> AI Powered</span>
              <span className="flex items-center gap-2"><Globe size={14} /> Global Reach</span>
              <span className="flex items-center gap-2"><Layout size={14} /> Multi-Channel</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> AES-256</span>
              <span className="flex items-center gap-2"><Database size={14} /> SQL Vault</span>
              <span className="flex items-center gap-2"><ShieldAlert size={14} /> Verified</span>
            </>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:w-[45%] flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
          
          <div className="space-y-3">
            <h2 className="text-5xl font-black text-black tracking-tighter">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h2>
            <p className="text-slate-500 font-medium text-lg italic">
              {isLogin ? 'Authenticating node session...' : 'Initializing registry entry...'}
            </p>
          </div>

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-5 rounded-3xl text-xs font-black uppercase tracking-tight flex items-center gap-3 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="flex-shrink-0" size={20} />
              {successMsg}
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 p-5 rounded-3xl text-xs font-black uppercase tracking-tight flex items-center gap-3 animate-shake shadow-sm">
              <ShieldAlert className="flex-shrink-0" size={20} />
              {error}
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-6">
            {!isLogin ? (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Principal Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-black outline-none transition-all font-bold text-sm"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Enterprise Name</label>
                  <div className="relative">
                    <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required 
                      type="text" 
                      placeholder="Business Identity" 
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-black outline-none transition-all font-bold text-sm"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Node Identity</label>
                <div className="flex items-stretch border border-slate-200 rounded-2xl bg-slate-50 focus-within:border-black transition-all overflow-hidden">
                  <div className="flex items-center pl-5 pr-1">
                    <Mail className="text-slate-300" size={18} />
                  </div>
                  <input 
                    required 
                    type="text" 
                    placeholder="node-id" 
                    className="flex-1 bg-transparent py-4 outline-none font-bold text-sm"
                    value={emailPrefix}
                    onChange={(e) => setEmailPrefix(e.target.value)}
                  />
                  <div className="bg-slate-100 flex items-center px-4 font-black text-[9px] text-slate-400 border-l border-slate-200 lowercase">
                    @gmail.com
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Credentials</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-black outline-none transition-all font-bold text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Access Node' : 'Register Node'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccessMsg(null);
              }}
              className="text-[10px] font-black text-slate-400 hover:text-black transition-colors uppercase tracking-widest flex items-center justify-center mx-auto gap-2 group"
            >
              {isLogin ? "New enterprise? Register" : "Existing node? Login"}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="pt-10 flex flex-col items-center gap-4 text-[8px] font-black text-slate-200 uppercase tracking-[0.4em] border-t border-slate-50">
             <span>Protocol v2.4 Secured</span>
             <div className="flex gap-8 opacity-40">
               <Layers size={14} />
               <MousePointer2 size={14} />
               <Layout size={14} />
               <Database size={14} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

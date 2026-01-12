
import React, { useState } from 'react';
import { User, Mail, Shield, CreditCard, Save, Camera, FileText, CheckCircle2, MapPin, Phone, Building2, Fingerprint } from 'lucide-react';

interface ProfileProps {
  user: {
    ownerName: string;
    businessName: string;
    emailPrefix: string;
  };
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user.ownerName || '',
    email: user.emailPrefix ? `${user.emailPrefix}@gmail.com` : '',
    phone: '', 
    location: '',
    businessType: '',
    taxId: ''
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const InfoField = ({ label, value, icon: Icon, id, placeholder }: any) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Icon className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-indigo-400' : 'text-slate-300'}`} size={18} />
        <input
          disabled={!isEditing}
          type="text"
          placeholder={placeholder || 'Not Provided'}
          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-50 focus:border-black outline-none disabled:opacity-70 transition-all shadow-sm placeholder:text-slate-300 placeholder:font-medium"
          value={value}
          onChange={(e) => setProfile({ ...profile, [id]: e.target.value })}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-10">
        <div>
          <h1 className="text-5xl font-black text-indigo-950 tracking-tighter">My Profile</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">Manage your verified merchant identity.</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center justify-center gap-3 px-10 py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95"
        >
          {isEditing ? <><Save size={18} /> Save Details</> : <><User size={18} /> Edit Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Card */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-[#020617]"></div>
            <div className="relative z-10 pt-4">
              <div className="w-40 h-40 mx-auto rounded-[2.5rem] bg-white border-8 border-white shadow-2xl flex items-center justify-center text-indigo-950 group relative cursor-pointer">
                <div className="w-full h-full flex items-center justify-center text-5xl font-black bg-slate-50 rounded-[1.8rem]">
                  {profile.fullName?.charAt(0) || '?'}
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.8rem] flex flex-col items-center justify-center text-white text-[10px] font-black uppercase tracking-widest gap-2">
                  <Camera size={24} />
                </div>
              </div>
              <h2 className="mt-8 text-3xl font-black text-indigo-950 tracking-tighter">{profile.fullName || 'New Merchant'}</h2>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-100">
                <CheckCircle2 size={12} /> Verified Member
              </div>
              
              <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-black text-indigo-950">---</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Rating</p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <p className="text-3xl font-black text-indigo-950">0</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Sales</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-950 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-900/20">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="text-indigo-400" size={24} />
              <h3 className="font-black text-xs uppercase tracking-widest">Registry Status</h3>
            </div>
            <p className="text-indigo-200/70 text-sm font-medium leading-relaxed">
              Your identity is strictly stored in our isolated SQL Registry. 
            </p>
          </div>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-xl font-black text-indigo-950 mb-8 border-b border-slate-50 pb-6 uppercase tracking-tight">Node Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InfoField label="Full Name" id="fullName" value={profile.fullName} icon={User} />
              <InfoField label="Email Identity" id="email" value={profile.email} icon={Mail} />
              <InfoField label="Phone" id="phone" value={profile.phone} icon={Phone} placeholder="Pending entry..." />
              <InfoField label="Region" id="location" value={profile.location} icon={MapPin} placeholder="Not set..." />
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-xl font-black text-indigo-950 mb-8 border-b border-slate-50 pb-6 uppercase tracking-tight">Business Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InfoField label="Enterprise Entity" id="businessName" value={user.businessName} icon={Building2} />
              <InfoField label="Business Type" id="businessType" value={profile.businessType} icon={Fingerprint} placeholder="Specify type..." />
              <InfoField label="GSTIN" id="taxId" value={profile.taxId} icon={CreditCard} placeholder="Enter GSTIN" />
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
             <div className="flex flex-col items-center justify-center py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                <FileText className="text-slate-300 mb-4" size={40} />
                <p className="text-slate-900 font-black text-sm uppercase tracking-widest">No Documents Provided</p>
                <p className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">Upload Verification Assets</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

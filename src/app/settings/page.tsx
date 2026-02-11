"use client";

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Lock, Save, Camera } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        alert("Profil berhasil diperbarui!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors pb-20">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 px-6">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-600 dark:text-slate-400">
            <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-black text-lg uppercase tracking-tight">Pengaturan Akun</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center mb-10">
            <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-200 dark:shadow-none">
                    S
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md text-blue-600 hover:scale-110 transition">
                    <Camera className="w-4 h-4" />
                </button>
            </div>
            <h2 className="mt-4 font-black text-xl">Serena Putri</h2>
            <p className="text-sm text-slate-500">Member sejak Feb 2026</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-8 space-y-6">
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                        <input type="text" defaultValue="Serena Putri" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 font-bold transition border border-transparent focus:border-blue-600" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                            <input type="email" defaultValue="serena@example.com" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none font-bold transition border border-transparent opacity-60 cursor-not-allowed" disabled />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Telepon</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                            <input type="tel" defaultValue="+62 812345678" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 font-bold transition border border-transparent focus:border-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                    <button className="text-sm font-bold text-blue-600 flex items-center gap-2 hover:underline">
                        <Lock className="w-4 h-4" /> Ganti Kata Sandi
                    </button>
                </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-wide hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50"
                >
                    {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save className="w-4 h-4" />}
                    Simpan Perubahan
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

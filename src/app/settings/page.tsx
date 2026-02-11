"use client";

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Lock, Save, Camera, Trash2, AlertTriangle, X, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Placeholder generik (Bukan nama user)
  const [formData, setFormData] = useState({
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone: "81234567890"
  });

  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");

    // Validasi Nama (> 1 huruf)
    if (formData.name.trim().length <= 1) {
      setError("Nama lengkap harus lebih dari 1 huruf.");
      return;
    }

    // Validasi Telepon (Minimal 9 digit)
    if (formData.phone.length < 9) {
      setError("Nomor telepon tidak valid (min. 9 digit).");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        setShowModal(true); // Ganti alert dengan Modal
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors pb-20 relative">

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-2">Profil Diperbarui!</h3>
            <p className="text-slate-500 text-sm mb-6">Data perubahan Anda telah berhasil disimpan ke sistem kami.</p>
            <button onClick={() => setShowModal(false)} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold">
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Pengaturan Akun</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center mb-10">
            <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-200 dark:shadow-none">
                    {formData.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md text-blue-600 hover:scale-110 transition">
                    <Camera className="w-4 h-4" />
                </button>
            </div>
            <h2 className="mt-4 font-black text-xl">{formData.name}</h2>
            <p className="text-sm text-slate-500">Member SkyBus</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
            <div className="p-8 space-y-6">

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 text-sm p-4 rounded-xl font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {error}
                  </div>
                )}

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 font-bold transition border border-transparent focus:border-blue-600"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                            <input type="email" value={formData.email} disabled className="w-full pl-12 pr-4 py-3.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl font-bold text-slate-500 cursor-not-allowed border border-transparent" />
                        </div>
                        <button className="text-xs font-bold text-blue-600 mt-2 hover:underline ml-1">Ubah Email</button>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Telepon</label>
                        <div className="flex">
                            <div className="pl-4 pr-3 py-3.5 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 rounded-l-2xl font-bold text-slate-500 flex items-center text-sm">
                                +62
                            </div>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setFormData({...formData, phone: val});
                              }}
                              className="w-full pl-4 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-r-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 font-bold transition border border-transparent focus:border-blue-600"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Lock className="w-5 h-5" /></div>
                            <span className="font-bold text-sm">Ganti Kata Sandi</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition" />
                    </button>
                </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end border-t border-slate-100 dark:border-slate-800">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-wide hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save className="w-4 h-4" />}
                    Simpan Perubahan
                </button>
            </div>
        </div>

        {/* DELETE ACCOUNT SECTION */}
        <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-8 border border-red-100 dark:border-red-900/30">
            <h3 className="font-black text-lg text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                <Trash2 className="w-5 h-5" /> Area Berbahaya
            </h3>
            <p className="text-sm text-red-600/70 dark:text-red-400/70 mb-6 leading-relaxed">
                Menghapus akun Anda bersifat permanen. Semua riwayat tiket dan data tersimpan akan hilang dan tidak dapat dikembalikan.
            </p>
            <button className="bg-white dark:bg-slate-900 border-2 border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                Hapus Akun Saya
            </button>
        </div>

      </div>
    </div>
  );
}

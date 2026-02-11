"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft, User, Mail, Phone, Lock, Save, Camera, 
  Trash2, AlertTriangle, CheckCircle, ChevronRight, 
  CreditCard, Bell, ShieldCheck, BadgeCheck, Send 
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // State Data User
  const [formData, setFormData] = useState({
    name: "Budi Santoso",
    nik: "3273102938100001",
    email: "budi.santoso@example.com",
    phone: "081234567890",
    isEmailVerified: true,
    isPhoneVerified: false
  });

  // State Status Tombol Kirim Verifikasi
  const [verificationSent, setVerificationSent] = useState({
    email: false,
    phone: false
  });

  // State Notifikasi
  const [notifSettings, setNotifSettings] = useState({
    emailNotif: true,
    waNotif: true,
    promoNotif: false
  });

  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string, isNumeric: boolean = false) => {
    if (isNumeric) {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSendVerification = (type: 'email' | 'phone') => {
    // Simulasi kirim OTP
    setVerificationSent(prev => ({ ...prev, [type]: true }));
    // Di real app, disini panggil API send OTP
  };

  const handleSave = () => {
    setError("");

    if (formData.name.trim().length <= 1) {
      setError("Nama lengkap harus valid.");
      return;
    }
    if (formData.phone.length < 9) {
      setError("Nomor telepon tidak valid (min. 9 digit).");
      return;
    }
    if (formData.nik.length !== 16) {
        setError("NIK harus 16 digit angka.");
        return;
    }

    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        setShowModal(true);
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

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Pengaturan Akun</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-10">
            <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-200 dark:shadow-none">
                    {formData.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md text-blue-600 hover:scale-110 transition">
                    <Camera className="w-4 h-4" />
                </button>
            </div>
            <h2 className="mt-4 font-black text-xl">{formData.name}</h2>
            <p className="text-sm text-slate-500">Member SkyBus</p>
        </div>

        {/* Error Message */}
        {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm p-4 rounded-xl font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <AlertTriangle className="w-4 h-4" /> {error}
            </div>
        )}

        {/* FORM DATA DIRI */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold flex items-center gap-2"><User className="w-5 h-5 text-blue-600"/> Data Pribadi</h3>
            </div>
            
            <div className="p-8 space-y-6">
                {/* Nama */}
                <div>
                    <label htmlFor="name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 font-bold transition border border-transparent focus:border-blue-600"
                        />
                    </div>
                </div>

                {/* NIK */}
                <div>
                    <label htmlFor="nik" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">NIK (Nomor Induk Kependudukan)</label>
                    <div className="relative">
                        <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                        <input
                          id="nik"
                          type="text"
                          maxLength={16}
                          value={formData.nik}
                          onChange={(e) => handleInputChange('nik', e.target.value, true)} 
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 font-bold transition border border-transparent focus:border-blue-600"
                          placeholder="16 digit angka"
                        />
                    </div>
                </div>

                {/* Email (With Verification) */}
                <div>
                    <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                        <input 
                            id="email"
                            type="email" 
                            value={formData.email} 
                            onChange={(e) => handleInputChange('email', e.target.value)} 
                            className="w-full pl-12 pr-28 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold border border-transparent focus:border-blue-600 focus:outline-none" 
                        />
                        
                        {/* Verification Badge */}
                        <div className="absolute right-3 top-2.5">
                            {formData.isEmailVerified ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1.5 rounded-lg">
                                    <BadgeCheck className="w-3 h-3" /> Terverifikasi
                                </span>
                            ) : (
                                <button 
                                    onClick={() => handleSendVerification('email')}
                                    disabled={verificationSent.email}
                                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition ${verificationSent.email ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                                >
                                    {verificationSent.email ? 'Terkirim' : 'Kirim'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Telepon (With Verification) */}
                <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Telepon</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value, true)} 
                          className="w-full pl-12 pr-28 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold transition border border-transparent focus:border-blue-600 focus:outline-none"
                        />
                         {/* Verification Badge */}
                         <div className="absolute right-3 top-2.5">
                            {formData.isPhoneVerified ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1.5 rounded-lg">
                                    <BadgeCheck className="w-3 h-3" /> Terverifikasi
                                </span>
                            ) : (
                                <button 
                                    onClick={() => handleSendVerification('phone')}
                                    disabled={verificationSent.phone}
                                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition ${verificationSent.phone ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                                >
                                    {verificationSent.phone ? 'Terkirim' : 'Kirim'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* NOTIFIKASI */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold flex items-center gap-2"><Bell className="w-5 h-5 text-amber-500"/> Notifikasi</h3>
            </div>
            <div className="p-6 space-y-6">
                {/* ... (Toggle Notifikasi sama seperti sebelumnya) ... */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold text-sm">Notifikasi Email</p>
                        <p className="text-xs text-slate-500">Kirim tiket dan info perjalanan via email.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifSettings.emailNotif} onChange={()=>setNotifSettings({...notifSettings, emailNotif: !notifSettings.emailNotif})} aria-label="Aktifkan Notifikasi Email"/>
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold text-sm">Notifikasi WhatsApp</p>
                        <p className="text-xs text-slate-500">Update status pesanan via WhatsApp.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifSettings.waNotif} onChange={()=>setNotifSettings({...notifSettings, waNotif: !notifSettings.waNotif})} aria-label="Aktifkan Notifikasi WhatsApp"/>
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold text-sm">Info Promo</p>
                        <p className="text-xs text-slate-500">Berita diskon dan penawaran menarik.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifSettings.promoNotif} onChange={()=>setNotifSettings({...notifSettings, promoNotif: !notifSettings.promoNotif})} aria-label="Aktifkan Info Promo"/>
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
        </div>

        {/* Keamanan & Hapus */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
             <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                 <button className="w-full flex items-center justify-between hover:opacity-70 transition">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600"><Lock className="w-5 h-5" /></div>
                        <span className="font-bold text-sm">Ganti Kata Sandi</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                </button>
             </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end rounded-3xl border border-slate-200 dark:border-slate-700">
            <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-wide hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save className="w-4 h-4" />}
                Simpan Perubahan
            </button>
        </div>

        {/* DELETE ACCOUNT SECTION */}
        <div className="mt-10 bg-red-50 dark:bg-red-900/10 rounded-3xl p-8 border border-red-100 dark:border-red-900/30">
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

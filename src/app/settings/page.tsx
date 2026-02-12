"use client";

import React, { useState } from 'react';
import {
  ArrowLeft, User, Mail, Phone, Lock, Save, Camera,
  Trash2, AlertTriangle, CheckCircle, ChevronRight,
  CreditCard, Bell, X, Loader2, XCircle
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

  const initialData = {
    name: "Budi Santoso",
    nik: "3273102938100001",
    email: "budi.santoso@example.com",
    phone: "81234567890"
  };

  const [formData, setFormData] = useState(initialData);

  const [verificationSent, setVerificationSent] = useState({
    email: false,
    phone: false
  });

  const [notifSettings, setNotifSettings] = useState({
    emailNotif: true,
    waNotif: true,
    promoNotif: false
  });

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
  const isEmailChanged = formData.email !== initialData.email;
  const isPhoneChanged = formData.phone !== initialData.phone;

  const handleInputChange = (field: string, value: string, isNumeric: boolean = false) => {
    if (isNumeric) {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    if (field === 'email') setVerificationSent(prev => ({ ...prev, email: false }));
    if (field === 'phone') setVerificationSent(prev => ({ ...prev, phone: false }));
  };

  const handleSendVerification = (type: 'email' | 'phone') => {
    setVerificationSent(prev => ({ ...prev, [type]: true }));
  };

  const validateField = (field: string) => {
    if (field === 'name') return formData.name.trim().length > 1;
    if (field === 'phone') return formData.phone.length >= 9;
    if (field === 'nik') return formData.nik.length === 16;
    if (field === 'email') return /\S+@\S+\.\S+/.test(formData.email);
    return true;
  };

  const getInputClass = (isValid: boolean) => {
    return `w-full pl-12 pr-4 py-3.5 rounded-2xl font-bold transition focus:outline-none focus:ring-2 ${
      isValid
        ? 'bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-blue-600 focus:ring-blue-600/20'
        : 'bg-red-50 dark:bg-red-900/10 border border-red-500 focus:border-red-600 focus:ring-red-500/20 text-red-900 dark:text-red-100'
    }`;
  };

  const handleSave = () => {
    if (!validateField('name')) {
      setErrorModal({ isOpen: true, message: "Nama lengkap harus valid (minimal 2 karakter)." });
      return;
    }
    if (!validateField('phone')) {
      setErrorModal({ isOpen: true, message: "Nomor telepon tidak valid (minimal 9 digit)." });
      return;
    }
    if (!validateField('nik')) {
      setErrorModal({ isOpen: true, message: "NIK harus 16 digit angka." });
      return;
    }
    if (!validateField('email')) {
      setErrorModal({ isOpen: true, message: "Format email tidak valid." });
      return;
    }

    if ((isEmailChanged && !verificationSent.email) || (isPhoneChanged && !verificationSent.phone)) {
      setShowUnverifiedModal(true);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors pb-20 relative">

      {isSaving && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 border border-slate-100 dark:border-slate-800">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="font-bold text-slate-800 dark:text-white">Menyimpan Perubahan...</p>
          </div>
        </div>
      )}

      {errorModal.isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-center relative">
            <button onClick={() => setErrorModal({ ...errorModal, isOpen: false })} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
               <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <XCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-2">Validasi Gagal</h3>
            <p className="text-slate-500 text-sm mb-6">{errorModal.message}</p>
            <button onClick={() => setErrorModal({ ...errorModal, isOpen: false })} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold">
              Perbaiki Data
            </button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-2">Profil Diperbarui!</h3>
            <p className="text-slate-500 text-sm mb-6">Data perubahan Anda telah berhasil disimpan ke sistem kami.</p>
            <button onClick={() => setShowSuccessModal(false)} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold">
              Tutup
            </button>
          </div>
        </div>
      )}

      {showUnverifiedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-center relative">
            <button onClick={() => setShowUnverifiedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
               <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-2">Verifikasi Diperlukan</h3>
            <p className="text-slate-500 text-sm mb-6">Anda telah mengubah Email atau Nomor Telepon. Silakan tekan tombol "Kirim" untuk memverifikasi perubahan sebelum menyimpan.</p>
            <button onClick={() => setShowUnverifiedModal(false)} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold">
              Mengerti
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

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold flex items-center gap-2"><User className="w-5 h-5 text-blue-600"/> Data Pribadi</h3>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
              <div className="relative">
                <User className={`absolute left-4 top-3.5 w-5 h-5 ${validateField('name') ? 'text-slate-300' : 'text-red-400'}`} />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={getInputClass(validateField('name'))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="nik" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">NIK (Nomor Induk Kependudukan)</label>
              <div className="relative">
                <CreditCard className={`absolute left-4 top-3.5 w-5 h-5 ${validateField('nik') ? 'text-slate-300' : 'text-red-400'}`} />
                <input
                  id="nik"
                  type="text"
                  maxLength={16}
                  value={formData.nik}
                  onChange={(e) => handleInputChange('nik', e.target.value, true)}
                  className={getInputClass(validateField('nik'))}
                  placeholder="16 digit angka"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${validateField('email') ? 'text-slate-300' : 'text-red-400'}`} />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${getInputClass(validateField('email'))} pr-28`}
                />

                <div className="absolute right-3 top-2.5">
                  {isEmailChanged && (
                    <button
                      onClick={() => handleSendVerification('email')}
                      disabled={verificationSent.email}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition ${verificationSent.email ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                    >
                      {verificationSent.email ? 'Terkirim' : 'Kirim'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Telepon</label>
              <div className="flex relative">
                <span className={`px-4 py-3.5 border border-r-0 rounded-l-2xl text-sm font-bold flex items-center ${validateField('phone') ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-500' : 'bg-red-50 dark:bg-red-900/10 border-red-500 text-red-500'}`}>+62</span>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value, true)}
                  className={`w-full px-4 py-3.5 border rounded-r-2xl font-bold transition focus:outline-none focus:ring-2 ${
                    validateField('phone')
                      ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/20'
                      : 'bg-red-50 dark:bg-red-900/10 border-red-500 focus:border-red-600 focus:ring-red-500/20 text-red-900 dark:text-red-100'
                  }`}
                  placeholder="81234567890"
                />

                <div className="absolute right-3 top-2.5">
                  {isPhoneChanged && (
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

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold flex items-center gap-2"><Bell className="w-5 h-5 text-amber-500"/> Notifikasi</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Notifikasi Email</p>
                <p className="text-xs text-slate-500">Kirim tiket dan info perjalanan via email.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifSettings.emailNotif} onChange={()=>setNotifSettings({...notifSettings, emailNotif: !notifSettings.emailNotif})} aria-label="Aktifkan Notifikasi Email"/>
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Notifikasi WhatsApp</p>
                <p className="text-xs text-slate-500">Update status pesanan via WhatsApp.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifSettings.waNotif} onChange={()=>setNotifSettings({...notifSettings, waNotif: !notifSettings.waNotif})} aria-label="Aktifkan Notifikasi WhatsApp"/>
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Info Promo</p>
                <p className="text-xs text-slate-500">Berita diskon dan penawaran menarik.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifSettings.promoNotif} onChange={()=>setNotifSettings({...notifSettings, promoNotif: !notifSettings.promoNotif})} aria-label="Aktifkan Info Promo"/>
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

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
            disabled={!hasChanges || isSaving}
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-wide hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Perubahan
          </button>
        </div>

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

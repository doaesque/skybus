"use client";

import React, { useState } from 'react';
import { ArrowLeft, Bus, Building, User, Mail, CheckCircle, TrendingUp, Users, Wallet, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function MitraRegisterPage() {
  const [formData, setFormData] = useState({
    poName: '',
    picName: '',
    email: '',
    phone: '',
    fleetSize: '1 - 10 Bus'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = (field: string, value: string) => {
    if (field === 'poName') {
      if (!value.trim()) return "Nama Perusahaan (PO) wajib diisi";
      if (value.trim().length < 3) return "Nama PO minimal 3 karakter";
      return "";
    }
    if (field === 'picName') {
      if (!value.trim()) return "Nama Penanggung Jawab wajib diisi";
      if (value.trim().length < 3) return "Nama minimal 3 karakter";
      return "";
    }
    if (field === 'email') {
      if (!value.trim()) return "Email bisnis wajib diisi";
      if (!/\S+@\S+\.\S+/.test(value)) return "Format email tidak valid";
      return "";
    }
    if (field === 'phone') {
      if (!value.trim()) return "Nomor telepon wajib diisi";
      if (value.length < 9) return "Nomor telepon minimal 9 digit";
      return "";
    }
    return "";
  };

  const getFieldError = (field: string) => {
    // @ts-ignore
    return validate(field, formData[field]);
  };

  const isFieldInvalid = (field: string) => {
    return touched[field] && getFieldError(field) !== "";
  };

  const handleSubmit = () => {
    const allTouched = { poName: true, picName: true, email: true, phone: true };
    setTouched(allTouched);

    const poError = validate('poName', formData.poName);
    const picError = validate('picName', formData.picName);
    const emailError = validate('email', formData.email);
    const phoneError = validate('phone', formData.phone);

    if (poError || picError || emailError || phoneError) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormData({ poName: '', picName: '', email: '', phone: '', fleetSize: '1 - 10 Bus' });
    setTouched({});
  };

  const getBorderColor = (field: string) => {
    return isFieldInvalid(field)
      ? "border-red-500 focus:ring-red-500"
      : "border-transparent focus:ring-blue-500";
  };

  const ErrorBubble = ({ message }: { message: string }) => (
    <div className="absolute top-full left-0 mt-2 w-full z-10 animate-in fade-in slide-in-from-top-1">
      <div className="bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg relative">
        <div className="absolute -top-1.5 left-4 w-3 h-3 bg-red-500 rotate-45"></div>
        {message}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors relative">

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Pendaftaran Terkirim!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Terima kasih telah mendaftar. Tim kemitraan SkyBus akan menghubungi Anda melalui WhatsApp/Email dalam waktu 1x24 jam.
              </p>
              <button
                onClick={handleCloseModal}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-slate-200 transition shadow-lg"
              >
                Kembali ke Halaman
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Daftar Jadi Mitra</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">

        <div className="space-y-8">
          <div>
            <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 text-blue-600 dark:text-blue-400">
              <Bus className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">Gabung Jaringan <br /> SkyBus Indonesia</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Transformasikan bisnis transportasi Anda dengan teknologi kami. Jangkau lebih banyak penumpang dan kelola armada dengan mudah.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600"><TrendingUp className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg">Tingkatkan Okupansi</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Optimalkan kursi kosong dengan akses ke jutaan pengguna aktif harian.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg text-orange-600"><Users className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg">Dashboard Canggih</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Kelola jadwal, harga, dan laporan penjualan secara real-time lewat Admin Panel.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600"><Wallet className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg">Pencairan Cepat</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Sistem pembayaran otomatis yang transparan dan tepat waktu.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 h-fit">
          <h3 className="text-xl font-black mb-6">Formulir Pendaftaran</h3>

          <form className="space-y-6">
            <div className="relative">
              <label className={`block text-xs font-bold uppercase mb-2 ${isFieldInvalid('poName') ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Nama Perusahaan (PO)</label>
              <div className="relative">
                <Building className={`absolute left-4 top-3 w-5 h-5 ${isFieldInvalid('poName') ? 'text-red-500' : 'text-slate-400'}`} />
                <input
                  name="poName"
                  value={formData.poName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Contoh: PT. Sinar Jaya Group"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 transition text-slate-800 dark:text-white border ${getBorderColor('poName')}`}
                />
              </div>
              {isFieldInvalid('poName') && <ErrorBubble message={getFieldError('poName')} />}
            </div>

            <div className="relative">
              <label className={`block text-xs font-bold uppercase mb-2 ${isFieldInvalid('picName') ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Nama Penanggung Jawab</label>
              <div className="relative">
                <User className={`absolute left-4 top-3 w-5 h-5 ${isFieldInvalid('picName') ? 'text-red-500' : 'text-slate-400'}`} />
                <input
                  name="picName"
                  value={formData.picName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Nama Lengkap"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 transition text-slate-800 dark:text-white border ${getBorderColor('picName')}`}
                />
              </div>
              {isFieldInvalid('picName') && <ErrorBubble message={getFieldError('picName')} />}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <label className={`block text-xs font-bold uppercase mb-2 ${isFieldInvalid('email') ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Email Bisnis</label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-3 w-5 h-5 ${isFieldInvalid('email') ? 'text-red-500' : 'text-slate-400'}`} />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    placeholder="email@pt.com"
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 transition text-slate-800 dark:text-white border ${getBorderColor('email')}`}
                  />
                </div>
                {isFieldInvalid('email') && <ErrorBubble message={getFieldError('email')} />}
              </div>
              <div className="relative">
                <label className={`block text-xs font-bold uppercase mb-2 ${isFieldInvalid('phone') ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>No. Telepon / WA</label>
                <div className="relative flex">
                  <div className={`pl-4 pr-3 py-3 bg-slate-100 dark:bg-slate-800 rounded-l-xl font-bold border-r flex items-center ${isFieldInvalid('phone') ? 'text-red-500 border-red-500' : 'text-slate-500 border-slate-200 dark:border-slate-700'}`}>
                    +62
                  </div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="tel"
                    placeholder="812345678"
                    className={`w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-r-xl font-bold focus:outline-none focus:ring-2 transition text-slate-800 dark:text-white border ${getBorderColor('phone')}`}
                  />
                </div>
                {isFieldInvalid('phone') && <ErrorBubble message={getFieldError('phone')} />}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Jumlah Armada</label>
              <select name="fleetSize" value={formData.fleetSize} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-600 dark:text-slate-300 border border-transparent">
                <option>1 - 10 Bus</option>
                <option>11 - 50 Bus</option>
                <option>50+ Bus</option>
              </select>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                Tim kami akan memverifikasi legalitas perusahaan Anda dalam 2x24 jam kerja sebelum aktivasi akun.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide transition shadow-lg shadow-blue-200 dark:shadow-none flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Kirim Pendaftaran'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

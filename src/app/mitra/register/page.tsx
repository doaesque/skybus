"use client";

import React, { useState } from 'react';
import { ArrowLeft, Bus, Building, User, Mail, Phone, CheckCircle, TrendingUp, Users, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function MitraRegisterPage() {
  const [formData, setFormData] = useState({
    poName: '',
    picName: '',
    email: '',
    phone: '',
    fleetSize: '1 - 10 Bus'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.poName && formData.picName && formData.email && formData.phone;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Daftar Jadi Mitra</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">

        {/* Kolom Kiri: Value Proposition (Keuntungan) */}
        <div className="space-y-8">
            <div>
                <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 text-blue-600 dark:text-blue-400">
                    <Bus className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">Gabung Jaringan <br/> SkyBus Indonesia</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    Transformasikan bisnis transportasi Anda dengan teknologi kami. Jangkau lebih banyak penumpang dan kelola armada dengan mudah.
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex gap-4 items-start p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600"><TrendingUp className="w-6 h-6"/></div>
                    <div>
                        <h3 className="font-bold text-lg">Tingkatkan Okupansi</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Optimalkan kursi kosong dengan akses ke jutaan pengguna aktif harian.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg text-orange-600"><Users className="w-6 h-6"/></div>
                    <div>
                        <h3 className="font-bold text-lg">Dashboard Canggih</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Kelola jadwal, harga, dan laporan penjualan secara real-time lewat Admin Panel.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600"><Wallet className="w-6 h-6"/></div>
                    <div>
                        <h3 className="font-bold text-lg">Pencairan Cepat</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Sistem pembayaran otomatis yang transparan dan tepat waktu.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Kolom Kanan: Form Pendaftaran */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 h-fit">
            <h3 className="text-xl font-black mb-6">Formulir Pendaftaran</h3>
            <form className="space-y-5">
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Nama Perusahaan (PO)</label>
                    <div className="relative">
                        <Building className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                        <input name="poName" onChange={handleChange} type="text" placeholder="Contoh: PT. Sinar Jaya Group" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Nama Penanggung Jawab</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                        <input name="picName" onChange={handleChange} type="text" placeholder="Nama Lengkap" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Email Bisnis</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                            <input name="email" onChange={handleChange} type="email" placeholder="email@pt.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">No. Telepon / WA</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                            <input name="phone" onChange={handleChange} type="tel" placeholder="0812..." className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Jumlah Armada</label>
                    <select name="fleetSize" onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-600 dark:text-slate-300">
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
                    disabled={!isFormValid}
                    onClick={(e) => e.preventDefault()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide transition shadow-lg shadow-blue-200 dark:shadow-none disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
                >
                    {isFormValid ? 'Kirim Pendaftaran' : 'Lengkapi Data'}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}

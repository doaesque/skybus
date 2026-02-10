"use client";

import React from 'react';
import { ArrowLeft, Bus, Building, User, Mail, Phone, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MitraRegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 border-b dark:border-slate-800">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-black text-lg">Daftar Jadi Mitra</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 text-blue-600 dark:text-blue-400">
                <Bus className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black mb-4">Gabung Jaringan SkyBus</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                Tingkatkan okupansi armada Anda dengan menjangkau jutaan pengguna SkyBus setiap harinya.
            </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Nama Perusahaan (PO)</label>
                        <div className="relative">
                            <Building className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                            <input type="text" placeholder="Contoh: PT. Sinar Jaya Group" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Nama Penanggung Jawab</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                            <input type="text" placeholder="Nama Lengkap" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Email Bisnis</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                            <input type="email" placeholder="email@perusahaan.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Nomor Telepon / WA</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                            <input type="tel" placeholder="0812..." className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Jumlah Armada</label>
                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-600 dark:text-slate-300">
                        <option>1 - 10 Bus</option>
                        <option>11 - 50 Bus</option>
                        <option>50+ Bus</option>
                    </select>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                        Dengan mendaftar, Anda menyetujui Syarat & Ketentuan Kemitraan SkyBus. Tim kami akan menghubungi Anda dalam 2x24 jam untuk verifikasi dokumen.
                    </p>
                </div>

                <button type="button" onClick={(e) => e.preventDefault()} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide transition shadow-lg shadow-blue-200 dark:shadow-none">
                    Kirim Pendaftaran
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}
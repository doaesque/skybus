"use client";

import React from 'react';
import { ArrowLeft, Search, User, CreditCard, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function GuidePage() {
  const steps = [
    { icon: <Search className="w-6 h-6 text-white"/>, title: "1. Cari Rute", desc: "Masukkan kota asal, tujuan, dan tanggal keberangkatan di halaman utama." },
    { icon: <User className="w-6 h-6 text-white"/>, title: "2. Isi Data", desc: "Pilih bus yang sesuai, lalu isi data pemesan dan penumpang dengan benar." },
    { icon: <CreditCard className="w-6 h-6 text-white"/>, title: "3. Bayar", desc: "Pilih metode pembayaran (Transfer/E-Wallet) dan selesaikan sebelum waktu habis." },
    { icon: <CheckCircle className="w-6 h-6 text-white"/>, title: "4. Selesai", desc: "E-Ticket akan dikirim ke email dan tersedia di menu 'Cek Pesanan'." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Cara Pesan Tiket</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {steps.map((step, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-6 items-start hover:border-blue-500 transition group">
                <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-200 dark:shadow-none shrink-0 group-hover:scale-110 transition">
                    {step.icon}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
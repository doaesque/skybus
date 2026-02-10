"use client";

import React from 'react';
import { ArrowLeft, Search, User, CreditCard, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function GuidePage() {
  const steps = [
    { icon: <Search className="w-6 h-6 text-white"/>, title: "1. Cari Rute", desc: "Masukkan kota asal, tujuan, dan tanggal keberangkatan di halaman utama." },
    { icon: <User className="w-6 h-6 text-white"/>, title: "2. Isi Data", desc: "Pilih bus yang sesuai, lalu isi data pemesan dan penumpang dengan benar." },
    { icon: <CreditCard className="w-6 h-6 text-white"/>, title: "3. Bayar", desc: "Pilih metode pembayaran (Transfer/E-Wallet) dan selesaikan sebelum waktu habis." },
    { icon: <CheckCircle className="w-6 h-6 text-white"/>, title: "4. Selesai", desc: "E-Ticket akan dikirim ke email dan tersedia di menu 'Pesanan Saya'." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="font-black text-lg text-slate-800">Cara Pesan Tiket</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-6 items-start">
                <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-200 shrink-0">
                    {step.icon}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
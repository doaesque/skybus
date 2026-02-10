"use client";

import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Syarat & Ketentuan</h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 bg-white dark:bg-slate-900 my-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-100 dark:bg-slate-800 rounded-full text-amber-600"><FileText className="w-8 h-8"/></div>
            <h2 className="text-2xl font-black">Ketentuan Pengguna</h2>
        </div>
        
        <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>Selamat datang di SkyBus. Dengan mengakses aplikasi ini, Anda setuju untuk terikat oleh syarat dan ketentuan berikut:</p>
            
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">1. Pemesanan Tiket</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Tiket yang sudah dibeli bersifat valid sesuai tanggal dan jam yang tertera.</li>
                <li>SkyBus hanya bertindak sebagai agen/platform. Operasional bus adalah tanggung jawab penuh Mitra Operator (PO).</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">2. Pembatalan & Refund</h3>
            <p>Kebijakan refund bergantung pada masing-masing PO Bus. Permintaan refund harus diajukan minimal 24 jam sebelum keberangkatan.</p>

            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">3. Larangan</h3>
            <p>Pengguna dilarang melakukan pemesanan fiktif atau menggunakan data palsu.</p>
        </div>
      </div>
    </div>
  );
}
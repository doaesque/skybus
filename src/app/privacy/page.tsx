"use client";

import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Kebijakan Privasi</h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 bg-white dark:bg-slate-900 my-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-100 dark:bg-slate-800 rounded-full text-blue-600"><Shield className="w-8 h-8"/></div>
            <h2 className="text-2xl font-black">Komitmen Privasi Kami</h2>
        </div>
        
        <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p><strong>Terakhir Diperbarui:</strong> 10 Februari 2026</p>
            <p>SkyBus menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.</p>
            
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">1. Data yang Kami Kumpulkan</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Informasi Identitas: Nama, alamat email, nomor telepon.</li>
                <li>Informasi Transaksi: Detail pembayaran, riwayat perjalanan.</li>
                <li>Data Teknis: Alamat IP, tipe perangkat, data lokasi (jika diizinkan).</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">2. Penggunaan Data</h3>
            <p>Kami menggunakan data Anda untuk memproses pemesanan, mengirimkan E-Ticket, dan meningkatkan layanan pelanggan. Kami tidak menjual data Anda kepada pihak ketiga.</p>
        </div>
      </div>
    </div>
  );
}
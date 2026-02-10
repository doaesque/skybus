"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 p-8 md:p-16 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-8 font-bold text-sm transition">
            <ArrowLeft className="w-4 h-4 mr-2" /> KEMBALI KE BERANDA
        </Link>
        
        <div className="border-b pb-6 mb-8">
            <Shield className="w-12 h-12 text-slate-600 mb-4" />
            <h1 className="text-3xl md:text-4xl font-black uppercase text-slate-800">Kebijakan Privasi</h1>
            <p className="text-slate-500 mt-2">Terakhir diperbarui: 20 Oktober 2024</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-600">
            <p>Selamat datang di SkyBus. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda bagikan kepada kami.</p>
            
            <h3 className="text-xl font-bold text-slate-800">1. Pengumpulan Informasi</h3>
            <p>Kami mengumpulkan informasi yang Anda berikan secara langsung saat mendaftar akun, memesan tiket, atau menghubungi layanan pelanggan. Informasi ini meliputi nama lengkap, alamat email, nomor telepon, dan detail pembayaran.</p>

            <h3 className="text-xl font-bold text-slate-800">2. Penggunaan Informasi</h3>
            <p>Informasi yang kami kumpulkan digunakan untuk memproses pemesanan tiket, mengirimkan E-Tiket, memberikan update perjalanan, dan meningkatkan kualitas layanan aplikasi kami.</p>

            <h3 className="text-xl font-bold text-slate-800">3. Keamanan Data</h3>
            <p>Kami menggunakan enkripsi standar industri dan teknologi keamanan untuk melindungi data pribadi Anda dari akses yang tidak sah.</p>

            <h3 className="text-xl font-bold text-slate-800">4. Pihak Ketiga</h3>
            <p>Kami tidak akan menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Data hanya dibagikan kepada mitra operator bus untuk keperluan verifikasi tiket saat keberangkatan.</p>
        </div>
      </div>
    </div>
  );
}
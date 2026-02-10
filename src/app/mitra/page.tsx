"use client";

import React from 'react';
import { ArrowLeft, BarChart, Bus, CheckCircle, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function MitraLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      
      <nav className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center px-6">
        <Link href="/" className="text-2xl font-black italic tracking-tighter flex items-center gap-1">
           SkyBus<span className="text-amber-500">.</span> <span className="text-xs not-italic font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 px-2 py-0.5 rounded ml-2">Partner</span>
        </Link>
        <Link href="/mitra/register">
            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition">
                Gabung Sekarang
            </button>
        </Link>
      </nav>

      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
            Maksimalkan Potensi Armada <br/> <span className="text-blue-600">Bus Anda</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Bergabunglah dengan ribuan operator bus lainnya di platform digital terbesar Indonesia. Kelola jadwal, tiket, dan pendapatan dalam satu dashboard.
        </p>
        <div className="flex justify-center gap-4">
            <Link href="/mitra/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-200 dark:shadow-none">
                Daftar Gratis
            </Link>
            <Link href="/contact" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                Hubungi Sales
            </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-6">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black mb-3">Tingkatkan Pendapatan</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Akses ke jutaan pengguna aktif bulanan SkyBus yang siap memesan tiket perjalanan.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition duration-300">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <BarChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black mb-3">Analitik Real-Time</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Pantau performa penjualan, okupansi kursi, dan tren rute secara langsung.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition duration-300">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black mb-3">Pembayaran Aman</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Sistem pencairan dana otomatis dan transparan tanpa biaya tersembunyi.</p>
            </div>
        </div>
      </section>
    </div>
  );
}

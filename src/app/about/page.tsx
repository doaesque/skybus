"use client";

import React from 'react';
import { ArrowLeft, Target, Heart, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Tentang SkyBus</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Intro */}
        <section className="text-center space-y-6">
            <h2 className="text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight">Merevolusi Perjalanan Darat</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                SkyBus didirikan pada tahun 2026 dengan satu misi sederhana: Mengubah cara orang bepergian dengan bus menjadi lebih mudah, transparan, dan menyenangkan.
            </p>
        </section>

        {/* Values */}
        <section className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <Target className="w-10 h-10 text-red-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Visi Kami</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Menjadi platform transportasi nomor satu yang menghubungkan setiap kota di Indonesia.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <Heart className="w-10 h-10 text-pink-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Nilai Kami</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Mengutamakan kenyamanan pengguna, kejujuran harga, dan pelayanan sepenuh hati.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <Users className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Komunitas</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Membangun komunitas traveler yang saling berbagi informasi dan pengalaman.</p>
            </div>
        </section>

        {/* Story */}
        <section className="bg-blue-600 text-white p-8 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Mengapa SkyBus?</h3>
            <p className="opacity-90 leading-relaxed max-w-2xl mx-auto">
                Kami percaya bahwa setiap perjalanan memiliki cerita. Dengan teknologi terkini, kami memastikan cerita perjalanan Anda dimulai dengan langkah yang tepat—tanpa antri, tanpa calo, dan pasti dapat kursi.
            </p>
        </section>
      </div>
    </div>
  );
}
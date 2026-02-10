"use client";

import React from 'react';
import { ArrowLeft, Target, Heart, Users, Map } from 'lucide-react';
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
            <h2 className="text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight">Siapa Kami</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                SkyBus adalah platform pemesanan tiket bus online terdepan di Indonesia yang menghubungkan berbagai kota hanya dengan satu klik. Kami hadir untuk merevolusi industri transportasi darat dengan teknologi yang memudahkan jutaan pelanggan.
            </p>
        </section>

        {/* Credentials */}
        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold mb-4">Kredensial Kami</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                SkyBus merevolusi industri pemesanan tiket bus online dengan membawa bersama-sama lebih dari 100 operator bus meliputi ribuan rute di seluruh Indonesia. Dengan aplikasi yang mudah digunakan, hari ini SkyBus telah menjadi pilihan utama komunitas wisatawan bus.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-8">
                <div className="p-4">
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400">100+</div>
                    <div className="text-xs font-bold uppercase text-slate-500 mt-1">Operator Bus</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400">1 Juta+</div>
                    <div className="text-xs font-bold uppercase text-slate-500 mt-1">Tiket Terjual</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400">50+</div>
                    <div className="text-xs font-bold uppercase text-slate-500 mt-1">Kota Terhubung</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400">24/7</div>
                    <div className="text-xs font-bold uppercase text-slate-500 mt-1">Layanan Pelanggan</div>
                </div>
            </div>
        </section>

        {/* Why Us */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h3 className="text-2xl font-bold mb-4">Mengapa Memesan di SkyBus?</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    SkyBus menyediakan sistem pemesanan yang paling sederhana dan bebas repot. Pilih tujuan, lihat kursi, dan pesan hanya dalam beberapa klik! Pengalaman tidak berakhir di sana; kami memiliki tim layanan pelanggan khusus untuk menemani perjalanan Anda.
                </p>
            </div>
            <div className="grid gap-4">
                <div className="flex gap-4 items-start p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <Map className="w-6 h-6 text-blue-500 mt-1"/>
                    <div>
                        <h4 className="font-bold">Pilihan Rute Terluas</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Menjangkau pelosok nusantara.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <Heart className="w-6 h-6 text-pink-500 mt-1"/>
                    <div>
                        <h4 className="font-bold">Pelayanan Sepenuh Hati</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Kepuasan Anda prioritas kami.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Contact */}
        <section className="bg-blue-600 text-white p-8 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-6">Hubungi Kami</h3>
            <div className="flex flex-col md:flex-row justify-center gap-8 text-sm">
                <div>
                    <span className="block opacity-70 mb-1">Email</span>
                    <span className="font-bold text-lg">cs@skybus.id</span>
                </div>
                <div>
                    <span className="block opacity-70 mb-1">Telepon</span>
                    <span className="font-bold text-lg">+62 21 39706060</span>
                </div>
                <div>
                    <span className="block opacity-70 mb-1">WhatsApp</span>
                    <span className="font-bold text-lg">+62 853 1111 1010</span>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}

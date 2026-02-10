"use client";

import React from 'react';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      title: "5 Tips Anti Mabuk Perjalanan Saat Naik Bus Malam",
      category: "Tips Travel",
      date: "10 Feb 2026",
      author: "Admin SkyBus",
      image: "bg-blue-100 dark:bg-blue-900",
      excerpt: "Mabuk perjalanan bisa merusak liburan. Simak tips ampuh berikut agar perjalanan bus Anda tetap nyaman dan bugar."
    },
    {
      title: "Rekomendasi Kuliner di Rest Area Tol Trans Jawa",
      category: "Kuliner",
      date: "08 Feb 2026",
      author: "Siti Kuliner",
      image: "bg-orange-100 dark:bg-orange-900",
      excerpt: "Jangan cuma makan pop mie! Ini dia daftar warung makan legendaris di sepanjang jalur istirahat Trans Jawa."
    },
    {
      title: "Review Bus Sleeper PO Rosalia Indah: Mewah & Nyaman!",
      category: "Review Bus",
      date: "01 Feb 2026",
      author: "Budi Otobus",
      image: "bg-green-100 dark:bg-green-900",
      excerpt: "Penasaran rasanya tidur di hotel berjalan? Baca ulasan lengkap fasilitas first class Rosalia Indah di sini."
    },
    {
      title: "Jadwal dan Harga Tiket Mudik Lebaran 2026",
      category: "Info Terkini",
      date: "25 Jan 2026",
      author: "Admin SkyBus",
      image: "bg-purple-100 dark:bg-purple-900",
      excerpt: "Persiapkan mudik Anda lebih awal. Cek prediksi kenaikan harga tuslah dan jadwal pembukaan tiket."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 border-b dark:border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <h1 className="font-black text-lg">SkyBus Blog</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">Jurnal Perjalanan</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Inspirasi destinasi, tips perjalanan, dan berita terbaru seputar dunia transportasi darat Indonesia.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
            {posts.map((post, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition duration-300">
                    {/* Fake Image Placeholder */}
                    <div className={`h-64 ${post.image} w-full flex items-center justify-center text-slate-400/50 font-bold text-4xl uppercase tracking-widest`}>
                        Image
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider mb-4 text-slate-400">
                            <span className="text-blue-600 dark:text-blue-400">{post.category}</span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {post.date}</span>
                        </div>
                        
                        <h3 className="text-2xl font-black mb-4 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-tight">
                            {post.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 mt-auto">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center"><User className="w-4 h-4"/></div>
                                {post.author}
                            </div>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                Baca Selengkapnya <ArrowRight className="w-4 h-4"/>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
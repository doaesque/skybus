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
      excerpt: "Mabuk perjalanan bisa merusak liburan. Simak tips ampuh berikut agar perjalanan bus Anda tetap nyaman dan bugar selama perjalanan jauh."
    },
    {
      title: "Rekomendasi Kuliner di Rest Area Tol Trans Jawa",
      category: "Kuliner",
      date: "08 Feb 2026",
      author: "Siti Kuliner",
      image: "bg-orange-100 dark:bg-orange-900",
      excerpt: "Jangan cuma makan pop mie! Ini dia daftar warung makan legendaris di sepanjang jalur istirahat Trans Jawa yang wajib Anda coba."
    },
    {
      title: "Review Bus Sleeper PO Rosalia Indah: Mewah & Nyaman!",
      category: "Review Bus",
      date: "01 Feb 2026",
      author: "Budi Otobus",
      image: "bg-green-100 dark:bg-green-900",
      excerpt: "Penasaran rasanya tidur di hotel berjalan? Baca ulasan lengkap fasilitas first class Rosalia Indah di sini mulai dari kursi hingga servis makan."
    },
    {
      title: "Jadwal dan Harga Tiket Mudik Lebaran 2026",
      category: "Info Terkini",
      date: "25 Jan 2026",
      author: "Admin SkyBus",
      image: "bg-purple-100 dark:bg-purple-900",
      excerpt: "Persiapkan mudik Anda lebih awal. Cek prediksi kenaikan harga tuslah dan jadwal pembukaan tiket agar tidak kehabisan."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">SkyBus Blog</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">Jurnal Perjalanan</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Inspirasi destinasi, tips perjalanan, dan berita terbaru seputar dunia transportasi darat Indonesia.
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition duration-300">
              <div className={`h-48 md:h-auto md:w-1/3 ${post.image} flex items-center justify-center text-slate-400/50 font-bold text-2xl uppercase tracking-widest shrink-0`}>
                Image
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1 justify-center">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider mb-3 text-slate-400">
                  <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-black mb-3 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-tight">
                  {post.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-auto">
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center"><User className="w-3 h-3" /></div>
                  {post.author}
                  <span className="ml-auto flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all">Baca <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

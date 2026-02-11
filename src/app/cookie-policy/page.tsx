"use client";

import React from 'react';
import { ArrowLeft, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Kebijakan Kuki</h1>
      </div>

      <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-900 my-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-slate-800 rounded-full text-indigo-600"><Cookie className="w-8 h-8" /></div>
          <h2 className="text-2xl font-black">Kebijakan Penggunaan Kuki</h2>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
          <p>Ketentuan kebijakan kuki ini ("Kebijakan Kuki") dibuat oleh PT SkyBus Indonesia ("SkyBus"). Kebijakan ini berlaku saat Anda mengakses situs kami. Dengan menggunakan situs, Anda menyetujui penggunaan kuki sebagaimana dijelaskan di sini.</p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">1. Apa itu Kuki & Data Penargetan?</h3>
          <p>Situs kami menggunakan:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Piksel Pelacak:</strong> Untuk mengumpulkan informasi kunjungan pada halaman tertentu.</li>
            <li><strong>Kuki (Cookies):</strong> File kecil yang disimpan di peramban Anda untuk mengingat preferensi Anda.</li>
            <li><strong>Data Penargetan:</strong> Termasuk alamat IP, waktu kunjungan, dan barang yang dilihat, yang digunakan untuk menyediakan iklan yang relevan.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">2. Penggunaan Data Penargetan</h3>
          <p>Data ini digunakan untuk:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Menyediakan iklan yang ditargetkan di jaringan SkyBus atau mitra kami.</li>
            <li>Analisis kinerja layanan situs.</li>
            <li>Tujuan bisnis internal SkyBus (secara teragregasi/anonim).</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">3. Perubahan Kebijakan</h3>
          <p>SkyBus berhak memodifikasi Kebijakan Kuki ini kapan pun. Kami menyarankan Anda untuk memeriksa halaman ini secara berkala untuk mengetahui pembaruan terbaru.</p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">4. Batasan Tanggung Jawab</h3>
          <p>SkyBus tidak bertanggung jawab atas kerugian dalam bentuk apa pun yang timbul dari atau sehubungan dengan kebijakan kuki ini, di luar nilai transaksi terakhir yang dilakukan oleh pengguna di situs.</p>
        </div>
      </div>
    </div>
  );
}

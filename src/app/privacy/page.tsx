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

      <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-900 my-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 dark:bg-slate-800 rounded-full text-blue-600"><Shield className="w-8 h-8" /></div>
          <h2 className="text-2xl font-black">Kebijakan Privasi</h2>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
          <p>Ketentuan-ketentuan kebijakan privasi ini ("Kebijakan Privasi") dibuat oleh PT SkyBus Indonesia ("SkyBus" atau "kami") dan pengguna akhir/pelanggan ("Pengguna Akhir" atau "Anda"). Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi Data Pengguna Akhir.</p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">1. Sifat Data Pengguna Akhir</h3>
          <p>Pada saat Anda membuat reservasi melalui Situs, kami dapat meminta informasi termasuk:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Informasi Profil:</strong> Nama, kewarganegaraan, jenis kelamin, alamat surel, nomor telepon.</li>
            <li><strong>Informasi Keuangan:</strong> Rincian pembayaran dan riwayat transaksi.</li>
            <li><strong>Penggunaan Layanan:</strong> Informasi navigasi, alamat IP, jenis peramban, dan data lokasi jika menggunakan perangkat bergerak.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">2. Tujuan Penggunaan Data</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Layanan Pelanggan:</strong> Menyediakan dukungan terkait pemesanan Anda.</li>
            <li><strong>Administrasi Akun:</strong> Mengelola pemesanan, tawaran khusus, dan pengaturan pribadi.</li>
            <li><strong>Pemasaran:</strong> Mengirimkan berita produk, buletin, dan tawaran yang disesuaikan (Anda dapat berhenti berlangganan kapan saja).</li>
            <li><strong>Pencegahan Penipuan:</strong> Mendeteksi dan mencegah kegiatan ilegal.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">3. Berbagi Data dengan Pihak Ketiga</h3>
          <p>Kami dapat membagikan data Anda kepada:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Operator Bus:</strong> Untuk menyelesaikan pemesanan tiket Anda.</li>
            <li><strong>Penyedia Layanan Pembayaran:</strong> Untuk memproses transaksi secara aman.</li>
            <li><strong>Penyedia Analitik:</strong> Untuk meningkatkan kualitas layanan kami.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">4. Keamanan Data</h3>
          <p>Kami menggunakan sistem dan prosedur bisnis yang layak, serta pembatasan teknis dan fisik untuk melindungi Data Pengguna Akhir. Hanya personil berwenang yang diizinkan mengakses data tersebut untuk keperluan kerja.</p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">5. Hak Anda</h3>
          <p>Anda berhak meninjau data yang kami simpan tentang Anda. Anda dapat memohon ikhtisar atau penghapusan data dengan menghubungi kami di <span className="font-bold text-blue-600">cs@skybus.id</span>. Harap dicatat bahwa penghapusan data dapat membatasi akses Anda ke layanan pemesanan.</p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">6. Perubahan Kebijakan</h3>
          <p>SkyBus berhak memodifikasi Kebijakan Privasi ini kapan pun. Perubahan akan diunggah pada Situs dan kami menyarankan Anda untuk memeriksanya secara berkala.</p>
        </div>
      </div>
    </div>
  );
}

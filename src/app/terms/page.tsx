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

      <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-900 my-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-amber-100 dark:bg-slate-800 rounded-full text-amber-600"><FileText className="w-8 h-8" /></div>
          <h2 className="text-2xl font-black">Syarat dan Ketentuan Penggunaan</h2>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
          <p>Ketentuan-ketentuan dan syarat-syarat (secara bersama-sama, selanjutnya disebut sebagai "Ketentuan-ketentuan") ini mengatur akses Anda ke dan penggunaan situs web, www.skybus.id dan aplikasi-aplikasi perangkat bergerak yang menghubungkan ke atau merujuk Ketentuan-ketentuan ini ("Situs Web"). Lebih lanjut, Situs web dioperasikan oleh PT SkyBus Indonesia ("SkyBus").</p>

          <p>Harap membaca Ketentuan-ketentuan ini dengan saksama sebelum menggunakan Situs Web, yang merupakan suatu pasar daring. Lebih lanjut, untuk tujuan kejelasan, dengan ini dinyatakan bahwa Situs Web tidak terlibat dalam menyediakan layanan apa pun dengan sendirinya namun merupakan suatu platform, yang semata-mata menghubungkan bisnis ke para pelanggan.</p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">1. Penerimaan Ketentuan</h3>
          <p>HARAP DICATAT BAHWA PENGGUNAAN ANDA ATAS SITUS WEB DENGAN CARA APA PUN MENANDAKAN PENERIMAAN ANDA TERHADAP KETENTUAN-KETENTUAN KAMI. Dengan menyetujui Ketentuan-ketentuan ini, Anda juga menyetujui kebijakan-kebijakan lain Situs Web kami; termasuk namun tidak terbatas pada Kebijakan Privasi dan Kebijakan Kuki.</p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">2. Peran Situs Web</h3>
          <p>SkyBus bermaksud untuk menjelaskan bahwa Situs Web hanyalah suatu pasar daring yang semata-mata menghubungkan bisnis ke para pelanggan. Mengingat hal tersebut:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Situs Web hanyalah suatu pasar, yang semata-mata mencantumkan inventaris para operator lokal yang terdaftar di Situs Web, namun tidak memiliki produk/layanan-layanan itu sendiri.</li>
            <li>Setiap tanggung jawab sehubungan dengan produk yang dijual/layanan-layanan yang ditawarkan pada Situs Web adalah tanggung jawab 'penjual'/penyedia layanan (Operator Bus) dan bukan tanggung jawab SkyBus.</li>
            <li>Kontrak penjualan produk-produk/layanan-layanan pada Situs Web akan menjadi suatu kontrak bipartit semata-mata antara Anda dan 'para penjual' yang tercantum pada Situs Web.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">3. Akun Pengguna</h3>
          <p>SkyBus dapat menawarkan fasilitas membuka akun pengguna. Untuk menggunakan Situs Web, Anda menyetujui:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda.</li>
            <li>Anda harus memberi tahu kami dengan segera apabila Anda memiliki alasan apa pun yang meyakinkan bahwa kata sandi Anda telah diketahui oleh orang lain.</li>
            <li>Situs Web dapat digunakan hanya untuk tujuan-tujuan pribadi dan non-komersial.</li>
            <li>SkyBus berhak untuk menolak akses ke Situs Web atau mengakhiri akun kapan pun tanpa pemberitahuan apabila kami memiliki keyakinan yang wajar bahwa akun Anda tengah digunakan untuk tujuan-tujuan tidak sah.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">4. Kebijakan Pengangkutan & Pembatalan</h3>
          <p>Anda bertanggung jawab untuk memastikan tanggal, waktu, dan tujuan perjalanan Anda sudah benar sebelum memesan.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Operator bus memiliki hak untuk menolak Anda naik bus jika membawa barang terlarang, tidak dapat menunjukkan tanda pengenal yang berlaku, atau tiket diperoleh dengan curang.</li>
            <li>Anak-anak di bawah usia dua belas (12) tidak akan diterima untuk diangkut kecuali mereka didampingi oleh orang dewasa.</li>
            <li>Operator bus berhak membatasi pembatalan dan perubahan jadwal tiket tanpa pemberitahuan dalam situasi tertentu seperti musim liburan.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">5. Syarat Khusus Mitra Operator</h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-sm mb-2">Sinar Jaya Syarat dan Ketentuan</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Detail tiket harus sama dengan ID Card.</li>
              <li>Tiket tidak dapat dipindahtangankan.</li>
              <li>Penumpang wajib menunjukkan kartu identitas sah yang digunakan saat membeli tiket.</li>
              <li>Jika nama berbeda dengan e-tiket, penumpang dapat diturunkan atau dikenakan denda sebesar 20x harga tiket terjauh.</li>
            </ul>
            <h4 className="font-bold text-sm mt-4 mb-2">Jackal Holiday Syarat dan Ketentuan</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Jam keberangkatan dan durasi adalah estimasi menyesuaikan lalu lintas.</li>
              <li>Tiket yang sudah dibeli tidak dapat dibatalkan dan diubah jadwal.</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">6. Hukum yang Mengatur</h3>
          <p>Ketentuan-ketentuan ini diatur berdasarkan dan akan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa akan diselesaikan terlebih dahulu secara musyawarah atau melalui Badan Arbitrase Nasional Indonesia (BANI) di Jakarta.</p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-6">7. Kontak</h3>
          <p>Dalam hal keluhan konsumen, Pengguna dapat menghubungi SkyBus pada:</p>
          <ul className="list-none space-y-1 mt-2 font-medium">
            <li>Email: cs@skybus.id</li>
            <li>WhatsApp: +62 812-3456-7890</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

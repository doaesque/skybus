import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 p-8 md:p-16 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-8 font-bold text-sm transition">
            <ArrowLeft className="w-4 h-4 mr-2" /> KEMBALI KE BERANDA
        </Link>
        
        <div className="border-b pb-6 mb-8">
            <FileText className="w-12 h-12 text-slate-600 mb-4" />
            <h1 className="text-3xl md:text-4xl font-black uppercase text-slate-800">Syarat & Ketentuan</h1>
            <p className="text-slate-500 mt-2">Berlaku efektif mulai 20 Oktober 2024</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-600">
            <p>Dengan mengakses atau menggunakan layanan SkyBus, Anda dianggap telah menyetujui Syarat dan Ketentuan berikut ini.</p>
            
            <h3 className="text-xl font-bold text-slate-800">1. Ketentuan Pemesanan</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Pengguna wajib mengisi data penumpang sesuai dengan kartu identitas (KTP/SIM/Paspor) yang berlaku.</li>
                <li>Pemesanan tiket dianggap sah setelah pembayaran berhasil dikonfirmasi oleh sistem.</li>
                <li>E-Tiket akan dikirimkan ke email terdaftar dan tersedia di menu "Pesanan Saya".</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800">2. Pembatalan dan Refund</h3>
            <p>Kebijakan pembatalan tiket bergantung pada kebijakan masing-masing operator bus. SkyBus akan membantu proses pengajuan refund sesuai dengan ketentuan yang berlaku, namun biaya administrasi mungkin dikenakan.</p>

            <h3 className="text-xl font-bold text-slate-800">3. Larangan Pengguna</h3>
            <p>Pengguna dilarang melakukan tindakan curang, meretas sistem, atau menggunakan data palsu untuk melakukan pemesanan.</p>
        </div>
      </div>
    </div>
  );
}
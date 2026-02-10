import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 p-8 md:p-16 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-8 font-bold text-sm transition">
            <ArrowLeft className="w-4 h-4 mr-2" /> KEMBALI KE BERANDA
        </Link>
        
        <div className="border-b pb-6 mb-8">
            <AlertTriangle className="w-12 h-12 text-slate-600 mb-4" />
            <h1 className="text-3xl md:text-4xl font-black uppercase text-slate-800">Disclaimer</h1>
            <p className="text-slate-500 mt-2">Penyangkalan Tanggung Jawab</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-600">
            <h3 className="text-xl font-bold text-slate-800">1. Akurasi Informasi</h3>
            <p>SkyBus berupaya menyajikan jadwal dan harga tiket seakurat mungkin. Namun, perubahan jadwal mendadak akibat kondisi lalu lintas, cuaca, atau kebijakan operator bus berada di luar kendali kami.</p>

            <h3 className="text-xl font-bold text-slate-800">2. Batasan Tanggung Jawab</h3>
            <p>SkyBus bertindak sebagai agen pemesanan tiket online. Kami tidak bertanggung jawab atas kerugian fisik, kehilangan barang, atau keterlambatan yang disebabkan oleh operasional armada bus. Keluhan terkait layanan perjalanan dapat disampaikan langsung kepada operator bus terkait.</p>

            <h3 className="text-xl font-bold text-slate-800">3. Tautan Eksternal</h3>
            <p>Website ini mungkin berisi tautan ke situs web pihak ketiga. SkyBus tidak bertanggung jawab atas konten atau kebijakan privasi dari situs web tersebut.</p>
        </div>
      </div>
    </div>
  );
}
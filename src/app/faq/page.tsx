"use client";

import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    { q: "Bagaimana cara melakukan refund?", a: "Refund dapat dilakukan maksimal 24 jam sebelum keberangkatan melalui menu 'Pesanan Saya'. Pilih tiket, klik 'Ajukan Refund', dan dana akan kembali dalam 3-14 hari kerja." },
    { q: "Apakah bisa ganti jadwal (reschedule)?", a: "Bisa, reschedule tergantung kebijakan masing-masing PO Bus. Silakan cek detail tiket pada menu Pesanan Saya. Biaya admin mungkin berlaku." },
    { q: "Apa itu kode booking?", a: "Kode booking adalah kode unik (misal: TRX-123) yang digunakan untuk menukarkan tiket di terminal atau check-in online." },
    { q: "Apakah perlu cetak tiket?", a: "Tidak perlu. Cukup tunjukkan QR Code pada E-Ticket di HP Anda kepada petugas di titik keberangkatan." },
    { q: "Metode pembayaran apa saja yang tersedia?", a: "Kami menerima Transfer Bank (BCA, Mandiri, BRI, BNI), E-Wallet (GoPay, OVO, Dana), dan pembayaran gerai retail (Indomaret/Alfamart)." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Pertanyaan Umum (FAQ)</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
                <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <h3 className="font-bold text-sm">{faq.q}</h3>
                    {openIndex === idx ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
                {openIndex === idx && (
                    <div className="p-5 pt-0 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                        {faq.a}
                    </div>
                )}
            </div>
        ))}
      </div>
    </div>
  );
}
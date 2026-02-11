"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BUS_DATA, LOCATIONS_DETAIL } from '@/constants/data';
import { CheckCircle, Download, Home, Share2, MapPin, Calendar, Clock, Bus } from 'lucide-react';
import Link from 'next/link';
import QRCode from 'react-qr-code'; // Opsional: kalau blm install, ganti kotak biasa

function ETicketContent() {
  const searchParams = useSearchParams();
  const busId = searchParams.get('busId');
  const seats = searchParams.get('seats');
  const date = searchParams.get('date');
  const isNewSuccess = searchParams.get('status') === 'success'; // Cek apakah baru sukses bayar

  const bus = BUS_DATA.find(b => b.id === busId) || BUS_DATA[0]; // Fallback data if missing

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans py-10 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Notifikasi Sukses (Hanya muncul kalau baru bayar) */}
        {isNewSuccess && (
            <div className="text-center mb-8 animate-in slide-in-from-top-4 fade-in duration-700">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Pembayaran Berhasil!</h1>
                <p className="text-slate-500 text-sm">E-Tiket Anda telah terbit. Silakan simpan atau screenshot halaman ini.</p>
            </div>
        )}

        {/* E-Ticket Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
            {/* Top Section */}
            <div className="bg-blue-600 p-6 text-white text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Boarding Pass</h2>
                    <h1 className="text-3xl font-black">SKYBUS</h1>
                </div>
                {/* Decorative Circles */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* Ticket Details */}
            <div className="p-6 relative">
                {/* Punch Holes Effect */}
                <div className="absolute -left-3 top-0 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full"></div>
                <div className="absolute -right-3 top-0 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full"></div>

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Booking ID</p>
                        <p className="text-lg font-mono font-black text-slate-800 dark:text-white">SKY-{Math.floor(Math.random() * 10000)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase">Tanggal</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{date ? new Date(date).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}) : '12 Feb 2026'}</p>
                    </div>
                </div>

                {/* Route */}
                <div className="flex items-center gap-4 mb-6 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                    <div className="flex-1">
                        <p className="text-xs text-slate-400">Dari</p>
                        <p className="font-bold text-lg leading-tight">{bus.from}</p>
                        <p className="text-[10px] text-slate-500 truncate">{bus.departureTime}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Bus className="w-5 h-5 text-blue-600 mb-1" />
                        <div className="w-12 h-[1px] bg-slate-300 dark:bg-slate-600"></div>
                        <p className="text-[10px] text-slate-400 mt-1">{bus.duration}</p>
                    </div>
                    <div className="flex-1 text-right">
                        <p className="text-xs text-slate-400">Ke</p>
                        <p className="font-bold text-lg leading-tight">{bus.to}</p>
                        <p className="text-[10px] text-slate-500 truncate">{bus.arrivalTime}</p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Operator</p>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-slate-100 rounded-full"></div> {/* Logo Placeholder */}
                            <span className="text-sm font-bold">{bus.name}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Kursi</p>
                        <span className="text-sm font-black bg-blue-100 text-blue-700 px-2 py-1 rounded">{seats || '12A'}</span>
                    </div>
                </div>

                {/* QR Code Area */}
                <div className="flex flex-col items-center justify-center border-t border-dashed border-slate-200 dark:border-slate-800 pt-6">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                        {/* Jika tidak ada library QRCode, bisa pakai gambar dummy */}
                        <div className="w-32 h-32 bg-slate-900 flex items-center justify-center text-white text-xs text-center">
                             [QR CODE] <br/> SCAN ME
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-3 text-center">Tunjukkan QR Code ini kepada petugas<br/>saat check-in di {bus.fromDetail}.</p>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
            <Link href="/">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none transition flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" /> Kembali ke Beranda
                </button>
            </Link>
            <div className="grid grid-cols-2 gap-3">
                <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Simpan PDF
                </button>
                <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" /> Bagikan
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}

export default function ETicketPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
            <Suspense fallback={<div className="p-10 text-center">Memuat Tiket...</div>}>
                <ETicketContent />
            </Suspense>
        </div>
    );
}

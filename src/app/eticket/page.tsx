"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BUS_DATA } from '@/constants/data';
import { CheckCircle, Download, Home, Share2, Bus, Ticket } from 'lucide-react';
import Link from 'next/link';
import QRCode from 'react-qr-code'; 

function ETicketContent() {
  const searchParams = useSearchParams();
  const busId = searchParams.get('busId');
  const seats = searchParams.get('seats');
  const date = searchParams.get('date');
  const status = searchParams.get('status'); 
  const source = searchParams.get('source'); // 'payment' atau 'history'

  const bus = BUS_DATA.find(b => b.id === busId) || BUS_DATA[0]; 
  const isNewSuccess = status === 'success';

  // Logika tombol kembali
  const backLink = source === 'payment' ? '/' : '/my-tickets';
  const backText = source === 'payment' ? 'Kembali ke Beranda' : 'Kembali ke Tiket Saya';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans py-10 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Notifikasi Sukses */}
        {isNewSuccess && (
            <div className="text-center mb-8 animate-in slide-in-from-top-4 fade-in duration-700">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Transaksi Berhasil!</h1>
                <p className="text-slate-500 text-sm">Tiket elektronik Anda sudah siap digunakan.</p>
            </div>
        )}

        {/* E-Ticket Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative transform transition hover:scale-[1.01] duration-300">
            {/* Top Section */}
            <div className="bg-blue-600 p-6 text-white text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xs font-bold opacity-80 uppercase tracking-[0.2em] mb-1">Boarding Pass</h2>
                    <h1 className="text-3xl font-black italic">SKYBUS<span className="text-amber-400">.</span></h1>
                </div>
                {/* Decorative Circles */}
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Ticket Details */}
            <div className="p-6 relative">
                {/* Punch Holes Effect */}
                <div className="absolute -left-4 top-0 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full"></div>
                <div className="absolute -right-4 top-0 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full"></div>

                <div className="flex justify-between items-center mb-6 mt-2">
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Booking Code</p>
                        <p className="text-xl font-mono font-black text-slate-800 dark:text-white tracking-widest">SKY-{Math.floor(Math.random() * 8999) + 1000}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tanggal</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{date ? new Date(date).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}) : '12 Feb 2026'}</p>
                    </div>
                </div>

                {/* Route */}
                <div className="flex items-center gap-4 mb-6 bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Dari</p>
                        <p className="font-bold text-lg leading-tight text-slate-800 dark:text-white">{bus.from}</p>
                        <p className="text-[10px] text-slate-500 truncate">{bus.departureTime} WIB</p>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <Bus className="w-5 h-5 text-blue-600 mb-1" />
                        <div className="w-16 h-[2px] bg-slate-200 dark:bg-slate-600 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-slate-400 rounded-full"></div>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 font-bold">{bus.duration}</p>
                    </div>
                    <div className="flex-1 text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Ke</p>
                        <p className="font-bold text-lg leading-tight text-slate-800 dark:text-white">{bus.to}</p>
                        <p className="text-[10px] text-slate-500 truncate">{bus.arrivalTime} WIB</p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Operator</p>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">{bus.operator.substring(0,1)}</div>
                            <span className="text-sm font-bold truncate">{bus.name}</span>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Nomor Kursi</p>
                        <span className="text-lg font-black text-blue-600">{seats || '12A'}</span>
                    </div>
                </div>

                {/* QR Code Area */}
                <div className="flex flex-col items-center justify-center border-t border-dashed border-slate-200 dark:border-slate-800 pt-8">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                        <QRCode value={`SKYBUS-${busId}-${seats}`} size={120} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 text-center font-medium">Tunjukkan QR Code ini kepada petugas<br/>saat check-in di {bus.fromDetail}.</p>
                </div>
            </div>
        </div>

        {/* Action Buttons (Lebih Renggang) */}
        <div className="mt-8 space-y-4">
            <Link href={backLink} className="block">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none transition flex items-center justify-center gap-2 transform active:scale-95">
                    {source === 'payment' ? <Home className="w-5 h-5" /> : <Ticket className="w-5 h-5" />} 
                    {backText}
                </button>
            </Link>
            
            <div className="grid grid-cols-2 gap-4">
                <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3.5 rounded-xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition">
                    <Download className="w-4 h-4" /> Simpan PDF
                </button>
                <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3.5 rounded-xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition">
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

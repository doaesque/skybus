"use client";

import React from 'react';
import { CheckCircle, QrCode, MessageCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export default function EticketPage() {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Success Header */}
        <div className="bg-green-500 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10" 
                 style={{backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '20px 20px'}}></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Pembayaran Sukses!</h2>
                <p className="text-sm opacity-90 mt-1">Kode: <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">TRX-88921</span></p>
            </div>
        </div>

        {/* Ticket Details */}
        <div className="p-6 space-y-6">
            <div className="text-center">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-3">Tunjukkan Ke Petugas</div>
                <div className="bg-slate-100 p-6 inline-block rounded-2xl border-2 border-dashed border-slate-300">
                    <QrCode className="w-32 h-32 text-slate-800" />
                </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Penumpang</span>
                    <span className="font-bold text-slate-800">Budi Santoso</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Bus</span>
                    <span className="font-bold text-slate-800">SkyBus Executive</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Kursi</span>
                    <span className="font-bold text-slate-800">1A</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Jadwal</span>
                    <span className="font-bold text-slate-800">20 Okt 2026, 22.00</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-1 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition border border-green-200">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase">Kirim ke WA</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition border border-blue-200">
                    <Mail className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase">Kirim ke Email</span>
                </button>
            </div>
            
            <Link href="/" className="block">
                <button className="w-full text-slate-400 text-sm font-bold py-2 hover:text-slate-600 transition">
                    Kembali ke Beranda
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}
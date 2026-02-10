import React from 'react';
import { CheckCircle, Download, Home, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function EticketPage() {
  return (
    <div className="min-h-screen bg-slate-600 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Top Decoration */}
        <div className="bg-green-500 p-6 text-center text-white">
            <CheckCircle className="w-16 h-16 mx-auto mb-2 opacity-90" />
            <h2 className="text-2xl font-black uppercase tracking-wide">Pembayaran Berhasil!</h2>
            <p className="text-sm opacity-90">Kode Booking: <span className="font-mono font-bold bg-white/20 px-2 rounded">TRX-88921</span></p>
        </div>

        {/* Ticket Details */}
        <div className="p-6 space-y-6">
            <div className="text-center border-b pb-6 border-dashed border-slate-300">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-2">Scan Boarding Pass</div>
                <div className="bg-slate-100 p-4 inline-block rounded-lg">
                    <QrCode className="w-32 h-32 text-slate-800" />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Nama Penumpang</span>
                    <span className="font-bold text-slate-800">Budi Santoso</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Bus</span>
                    <span className="font-bold text-slate-800">Sinar Jaya (Executive)</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Jadwal</span>
                    <span className="font-bold text-slate-800">20 Okt 2024, 22.00</span>
                </div>
            </div>

            <button className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition">
                <Download className="w-4 h-4" /> Simpan E-Tiket (PDF)
            </button>
            
            <Link href="/" className="block">
                <button className="w-full text-slate-400 text-sm font-bold py-2 hover:text-slate-600">
                    Kembali ke Beranda
                </button>
            </Link>
        </div>

        {/* Ticket Cutout Effect (Visual Only) */}
        <div className="absolute top-[138px] -left-3 w-6 h-6 bg-slate-600 rounded-full"></div>
        <div className="absolute top-[138px] -right-3 w-6 h-6 bg-slate-600 rounded-full"></div>

      </div>
    </div>
  );
}

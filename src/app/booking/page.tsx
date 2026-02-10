"use client";

import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, User, CreditCard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();
  const [copyData, setCopyData] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4">
        <Link href="/search" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
            <h1 className="font-black text-lg text-slate-800">Pengisian Data</h1>
            <p className="text-xs text-slate-500">Jakarta → Bandung • 20 Okt 2024</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 grid gap-6">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between px-8 text-xs font-bold text-slate-400 mb-2">
            <div className="text-primary flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">1</div>
                <span>Data</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-200 mx-2"></div>
            <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">2</div>
                <span>Bayar</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-200 mx-2"></div>
            <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">3</div>
                <span>Tiket</span>
            </div>
        </div>

        {/* DATA PEMESAN */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Data Pemesan
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nama Lengkap</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-semibold focus:outline-none focus:border-primary transition" placeholder="Sesuai KTP" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">No. HP / WA</label>
                        <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-semibold focus:outline-none focus:border-primary transition" placeholder="0812..." />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Email</label>
                        <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-semibold focus:outline-none focus:border-primary transition" placeholder="email@..." />
                    </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg flex gap-3 items-start">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                        E-Ticket akan dikirim ke email dan WhatsApp di atas. Pastikan data benar.
                    </p>
                </div>
            </div>
        </div>

        {/* DATA PENUMPANG */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Data Penumpang 1
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="rounded text-primary focus:ring-primary"
                        checked={copyData}
                        onChange={(e) => setCopyData(e.target.checked)}
                    />
                    <span className="text-xs font-bold text-slate-500">Sama dengan Pemesan</span>
                </label>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nama Lengkap</label>
                    <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-semibold focus:outline-none focus:border-primary transition" 
                        placeholder="Sesuai KTP"
                        defaultValue={copyData ? "Budi Santoso" : ""}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nomor Kursi</label>
                    <div className="w-full bg-slate-100 border border-slate-200 rounded-lg p-3 text-sm font-bold text-slate-500">
                        1A (Executive)
                    </div>
                </div>
            </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 flex justify-between items-center z-50">
            <div>
                <div className="text-xs text-slate-500">Total Pembayaran</div>
                <div className="text-xl font-black text-primary">Rp 245.000</div>
            </div>
            <Link href="/payment">
                <button className="bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-amber-600 transition shadow-lg shadow-amber-200">
                    Lanjut Bayar
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
}
"use client";

import React from 'react';
import { Bus, Calendar, MapPin, ChevronRight, Navigation } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MyOrdersPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      <div className="bg-white p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="font-black text-lg text-slate-800">Pesanan Saya</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        
        {/* Active Order */}
        <div className="bg-white border border-primary/30 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                DIBAYAR
            </div>
            
            <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Bus className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-black text-slate-800 text-lg">Jakarta → Bandung</h3>
                    <div className="text-xs text-slate-500 font-bold mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Senin, 20 Okt 2024 • 22.00
                    </div>
                </div>
            </div>

            {/* SURVEY INSIGHT: Track Bus Button */}
            <div className="border-t border-slate-100 pt-4 flex gap-3">
                <Link href="/eticket" className="flex-1">
                    <button className="w-full py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                        Lihat E-Tiket
                    </button>
                </Link>
                <button className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition flex items-center justify-center gap-2 shadow-md shadow-blue-100">
                    <Navigation className="w-3 h-3" /> Lacak Bus
                </button>
            </div>
        </div>

        {/* Past Order */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 opacity-70 grayscale hover:grayscale-0 transition">
             <div className="absolute top-5 right-5 bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded">
                SELESAI
            </div>
            <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <Bus className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">Bandung → Jakarta</h3>
                    <p className="text-xs text-slate-500 mt-1">10 Sep 2024</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
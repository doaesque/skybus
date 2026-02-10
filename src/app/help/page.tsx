"use client";

import React from 'react';
import { ArrowLeft, Search, Phone, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-blue-600 dark:bg-slate-900 text-white p-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-black text-xl">Pusat Bantuan</h1>
        </div>
        <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Cari kendala Anda..." className="w-full pl-12 pr-4 py-3 rounded-xl text-slate-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
            <h3 className="font-bold mb-4">Topik Populer</h3>
            <div className="space-y-3">
                {["Cara reschedule tiket", "Refund dana tiket batal", "Metode pembayaran tersedia", "Lupa password akun"].map((topic, i) => (
                    <div key={i} className="p-3 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition text-sm font-medium flex justify-between items-center">
                        {topic} <ArrowLeft className="w-4 h-4 rotate-180 text-slate-300" />
                    </div>
                ))}
            </div>
        </div>

        <h3 className="font-bold mb-4 px-2">Hubungi Kami</h3>
        <div className="grid grid-cols-3 gap-4">
            <a href="#" className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 hover:border-blue-500 transition">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600"><MessageCircle className="w-5 h-5" /></div>
                <span className="text-xs font-bold">WhatsApp</span>
            </a>
            <a href="#" className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 hover:border-blue-500 transition">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600"><Phone className="w-5 h-5" /></div>
                <span className="text-xs font-bold">Call Center</span>
            </a>
            <a href="#" className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 hover:border-blue-500 transition">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600"><Mail className="w-5 h-5" /></div>
                <span className="text-xs font-bold">Email</span>
            </a>
        </div>
      </div>
    </div>
  );
}
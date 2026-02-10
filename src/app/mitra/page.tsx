"use client";

import React, { useState } from 'react';
import { ArrowLeft, Star, Bus, MapPin, Search, ChevronRight, Filter, ShieldCheck, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { PARTNER_DETAILED_DATA } from '@/constants/data';
import { motion } from 'framer-motion';

export default function MitraPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPartners = PARTNER_DETAILED_DATA.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 border-b dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                    <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </Link>
                <div>
                    <h1 className="font-black text-lg">Mitra Operator</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Partner resmi perjalanan SkyBus</p>
                </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Cari nama PO Bus..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* --- HERO BANNER MITRA --- */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-10 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black mb-2">Partner Terpercaya</h2>
                    <p className="opacity-90 text-sm max-w-lg leading-relaxed">
                        Kami bekerja sama dengan operator bus terbaik yang memiliki standar keselamatan tinggi dan rating kepuasan pelanggan di atas rata-rata.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <div className="text-center px-2">
                        <div className="text-2xl font-black">100+</div>
                        <div className="text-[10px] uppercase font-bold opacity-80">Operator</div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/30"></div>
                    <div className="text-center px-2">
                        <div className="text-2xl font-black">5.0</div>
                        <div className="text-[10px] uppercase font-bold opacity-80">Safety Score</div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- FILTER & SORT (Visual Only) --- */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold whitespace-nowrap shadow-md shadow-blue-200 dark:shadow-none">
                <Star className="w-3 h-3 fill-white" /> Paling Sering Diulas
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <ThumbsUp className="w-3 h-3" /> Rating Tertinggi
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <Bus className="w-3 h-3" /> Armada Terbanyak
            </button>
        </div>

        {/* --- PARTNER LIST --- */}
        <div className="space-y-6">
            {filteredPartners.map((partner) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={partner.id} 
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition group"
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        
                        {/* Logo / Initial Box */}
                        <div className={`w-16 h-16 md:w-20 md:h-20 ${partner.color} ${partner.code === 'HJ' ? 'text-slate-800' : 'text-white'} rounded-2xl flex items-center justify-center shrink-0 shadow-sm`}>
                            <span className="font-black text-2xl md:text-3xl tracking-tighter">{partner.code}</span>
                        </div>

                        {/* Main Info */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{partner.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bergabung sejak {partner.since} • {partner.fleets.join(", ")}</p>
                                </div>
                                
                                {/* RATING BADGE (Prioritas Utama) */}
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                        <span className="font-black text-lg text-amber-700 dark:text-amber-500">{partner.rating}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 font-medium">{partner.reviews} Ulasan</span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                                "{partner.desc}"
                            </p>

                            {/* Top Routes */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {partner.routes.map((rute, idx) => (
                                    <div key={idx} className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full">
                                        <MapPin className="w-3 h-3 text-blue-500" /> {rute}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 gap-2">
                            <Link href="/search" className="w-full">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-200 dark:shadow-none whitespace-nowrap flex items-center justify-center gap-2">
                                    Cari Tiket <ChevronRight className="w-4 h-4" />
                                </button>
                            </Link>
                            <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-sm transition">
                                Profil PO
                            </button>
                        </div>

                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
}
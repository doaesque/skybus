"use client";

import React, { useState } from 'react';
import { ArrowLeft, Copy, Tag, Check, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { PROMO_DATA } from '@/constants/data';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans pb-20 transition-colors">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Promo Spesial</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">Spesial Tahun 2026</span>
                <h2 className="text-3xl font-black mt-4 mb-2">Diskon Awal Tahun</h2>
                <p className="text-blue-100 text-sm max-w-sm mb-6">Nikmati perjalanan hemat ke seluruh rute di Pulau Jawa.</p>
                <div className="bg-white text-slate-900 px-6 py-3 rounded-xl inline-flex items-center gap-3 font-mono font-bold text-lg border-2 border-dashed border-slate-300">
                    SKYNEW26
                    <Copy className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => handleCopy(999, 'SKYNEW26')} />
                </div>
            </div>
        </div>

        {/* List */}
        <div className="grid gap-4">
            {PROMO_DATA.map((promo) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={promo.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition relative group overflow-hidden">
                    <div className={`absolute left-0 top-0 w-2 h-full ${promo.color}`}></div>
                    <div className="flex justify-between items-start pl-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">{promo.discount} OFF</span>
                            </div>
                            <h3 className="font-bold text-lg">{promo.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">{promo.desc}</p>
                            <div className="flex gap-4 text-[10px] text-slate-400 font-medium">
                                <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> s.d. {promo.validUntil}</div>
                                <div className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {promo.minTrans}</div>
                            </div>
                        </div>
                        <button onClick={() => handleCopy(promo.id, promo.code)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-mono text-sm font-bold flex items-center gap-2 transition">
                            {copiedId === promo.id ? <><Check className="w-4 h-4 text-green-500" /> Salin</> : <>{promo.code} <Copy className="w-3 h-3" /></>}
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
      <AnimatePresence>
        {copiedId !== null && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-xl flex items-center gap-2 z-50 text-sm font-bold">
                <Check className="w-4 h-4 text-green-400 dark:text-green-600" /> Kode berhasil disalin!
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
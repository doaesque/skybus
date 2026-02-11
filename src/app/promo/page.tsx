"use client";

import React, { useState } from 'react';
import { ArrowLeft, Ticket, Calendar, Clock, Copy, Check, FileText } from 'lucide-react';
import Link from 'next/link';
import { PROMO_DATA } from '@/constants/data';

export default function PromoPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors relative">

      {/* --- MODAL S&K --- */}
      {showTerms && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setShowTerms(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Escape') setShowTerms(false); }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800 cursor-default flex flex-col max-h-[85vh]"
            role="document"
            tabIndex={-1}
          >
            <div className="p-8 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-500">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Syarat & Ketentuan</h3>
              </div>
            </div>

            {/* SCROLLABLE CONTENT DENGAN CUSTOM SCROLLBAR */}
            <div className="px-8 overflow-y-auto 
              scrollbar-thin 
              scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 
              scrollbar-track-transparent
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-slate-200
              dark:[&::-webkit-scrollbar-thumb]:bg-slate-700
              [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pr-2">
                <p>Penggunaan kode promo SkyBus tunduk pada aturan berikut:</p>
                <ol className="list-decimal pl-5 space-y-3 marker:font-bold marker:text-slate-400">
                  <li>Promo hanya berlaku untuk pemesanan tiket bus & shuttle melalui website resmi SkyBus Indonesia.</li>
                  <li>Satu kode promo hanya dapat digunakan satu kali per akun selama periode promo berlangsung, kecuali dinyatakan lain.</li>
                  <li>Kode promo tidak dapat digabungkan dengan voucher lain atau promosi cashback bank.</li>
                  <li>SkyBus berhak membatalkan transaksi jika ditemukan indikasi kecurangan.</li>
                  <li>Nilai diskon tidak dapat diuangkan dan non-refundable jika tiket dibatalkan.</li>
                  <li>Kuota promo harian terbatas.</li>
                  <li>SkyBus berhak mengubah syarat dan ketentuan sewaktu-waktu tanpa pemberitahuan sebelumnya.</li>
                </ol>
              </div>
            </div>

            <div className="p-8 pt-6 shrink-0 border-t border-slate-100 dark:border-slate-800 mt-2">
              <button
                onClick={() => setShowTerms(false)}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition shadow-lg"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Promo Spesial</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Hemat Lebih Banyak!</h2>
          <p className="text-slate-500 dark:text-slate-400">Gunakan kode promo di bawah saat checkout.</p>
        </div>

        <div className="grid gap-6">
          {PROMO_DATA.map((promo) => (
            <div key={promo.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden group hover:shadow-lg transition duration-300 relative">
              
              {/* Ikon Tiket Background (Top Right) */}
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Ticket className="w-24 h-24 rotate-12" />
              </div>

              <div className="p-6 relative z-10">
                {/* Badge Section - Sejajar di Kiri */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {promo.type}
                  </span>
                  {promo.limited && (
                    <span className="text-red-500 text-[10px] font-bold flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> Terbatas
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{promo.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  {promo.desc}
                </p>

                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-400 font-bold mb-1">Kode Promo</span>
                    <span className="text-lg font-black font-mono text-slate-800 dark:text-white tracking-wider">{promo.code}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(promo.id, promo.code)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-lg shadow-blue-200 dark:shadow-none"
                  >
                    {copiedId === promo.id ? (
                      <> <Check className="w-3 h-3" /> Disalin </>
                    ) : (
                      <> <Copy className="w-3 h-3" /> Salin </>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar className="w-3 h-3" /> Berlaku s.d. {promo.validUntil}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setShowTerms(true)}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 underline decoration-slate-300 hover:decoration-blue-600 transition underline-offset-4"
          >
            Lihat Syarat & Ketentuan Umum Promo
          </button>
        </div>

      </div>
    </div>
  );
}

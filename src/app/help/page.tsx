"use client";

import React from 'react';
import { ArrowLeft, Search, Phone, Mail, MessageCircle, HelpCircle, FileText, CreditCard, User } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const topics = [
    { icon: <CreditCard className="w-6 h-6" />, label: "Pembayaran & Refund" },
    { icon: <User className="w-6 h-6" />, label: "Akun Saya" },
    { icon: <FileText className="w-6 h-6" />, label: "Cara Pesan" },
    { icon: <HelpCircle className="w-6 h-6" />, label: "Pertanyaan Umum" },
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-blue-600 dark:bg-slate-900 pb-16 pt-8 px-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-black text-2xl text-white">Pusat Bantuan</h1>
          </div>

          <h2 className="text-white/90 text-lg mb-6 font-medium">Apa yang bisa kami bantu?</h2>

          <div className="relative">
            <Search className="absolute left-5 top-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kendala Anda (contoh: refund, reschedule)..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl text-slate-800 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-10 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((topic, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-1 transition cursor-pointer group">
              <div className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-700 p-3 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                {topic.icon}
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{topic.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="font-black text-lg mb-6">Pertanyaan Populer</h3>
          <div className="space-y-4">
            {["Cara reschedule tiket yang sudah dibeli", "Berapa lama proses refund dana?", "Metode pembayaran apa saja yang tersedia?", "Saya lupa password akun"].map((topic, i) => (
              <div key={i} className="group flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{topic}</span>
                <ArrowLeft className="w-4 h-4 rotate-180 text-slate-300 group-hover:text-blue-600 transition" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black text-lg mb-6 px-2">Masih Butuh Bantuan?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="#" onClick={handleContactClick} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-green-500 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600"><MessageCircle className="w-6 h-6" /></div>
              <div className="text-center">
                <span className="block font-bold text-sm">WhatsApp</span>
                <span className="text-xs text-slate-500">Respon Cepat</span>
              </div>
            </a>
            <a href="#" onClick={handleContactClick} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-blue-500 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600"><Phone className="w-6 h-6" /></div>
              <div className="text-center">
                <span className="block font-bold text-sm">Call Center</span>
                <span className="text-xs text-slate-500">24 Jam</span>
              </div>
            </a>
            <a href="#" onClick={handleContactClick} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-orange-500 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600"><Mail className="w-6 h-6" /></div>
              <div className="text-center">
                <span className="block font-bold text-sm">Email</span>
                <span className="text-xs text-slate-500">1x24 Jam</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

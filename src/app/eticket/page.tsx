"use client";

import React, { useRef, useState } from 'react';
import { 
  ArrowLeft, Download, Share2, MapPin, User, Bus, QrCode, ShieldCheck, X, CheckCircle 
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const ActionModal = ({ isOpen, title, message, onClose }: { isOpen: boolean; title: string; message: string; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
        </button>
        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-black mb-2 text-slate-800 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold transition hover:opacity-90">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default function ETicketPage() {
  const searchParams = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '' });

  const ticketData = {
    id: searchParams.get('id') || 'SKY-8829301',
    busName: "Sinar Jaya Suite Class",
    date: "10 Feb 2026",
    time: "07:00",
    origin: "Jakarta (Pulo Gebang)",
    destination: "Yogyakarta (Giwangan)",
    seat: "1A",
    passenger: "Budi Santoso",
    bookingCode: "SJ-JKT-YOG-001",
    class: "Sleeper Class",
    plateNumber: "B 7789 TGA"
  };

  const handleDownload = () => {
    setModalState({
      isOpen: true,
      title: "Mengunduh...",
      message: "E-Ticket sedang diproses dan akan tersimpan di perangkat Anda."
    });
  };

  const handleShare = () => {
    setModalState({
      isOpen: true,
      title: "Link Disalin",
      message: "Tautan E-Ticket berhasil disalin ke clipboard."
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors pb-20">
      
      <ActionModal 
        isOpen={modalState.isOpen} 
        title={modalState.title} 
        message={modalState.message} 
        onClose={() => setModalState({ ...modalState, isOpen: false })} 
      />

      <div className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/my-tickets" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Link>
          <h1 className="text-lg font-black text-slate-900 dark:text-white">E-Ticket</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Tiket Perjalanan</h2>
          <p className="text-sm text-slate-500">Tunjukkan QR Code ini kepada petugas.</p>
        </div>

        <div ref={ticketRef} className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800">
          <div className="bg-blue-600 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Kode Booking</p>
                <h2 className="text-3xl font-black tracking-wide">{ticketData.bookingCode}</h2>
              </div>
              <Bus className="w-8 h-8 text-white/80" />
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 border-b border-dashed border-slate-200 dark:border-slate-700 pb-6">
              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                <Image src="/img/sinar-jaya.png" width={40} height={40} alt="Logo Bus" className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{ticketData.busName}</h3>
                <div className="flex gap-2 text-xs mt-1 text-slate-500">
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-bold">{ticketData.class}</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold">{ticketData.plateNumber}</span>
                </div>
              </div>
            </div>

            <div className="relative pl-6 space-y-8 mb-8">
              <div className="absolute left-[7px] top-2 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
              
              <div className="relative z-10">
                <div className="absolute -left-[24px] top-1 w-4 h-4 bg-white dark:bg-slate-900 border-4 border-blue-500 rounded-full"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Berangkat</p>
                    <p className="font-bold text-slate-800 dark:text-white text-sm mt-0.5">{ticketData.origin}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-blue-600">{ticketData.time}</p>
                    <p className="text-xs text-slate-400 font-bold">{ticketData.date}</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="absolute -left-[24px] top-1 w-4 h-4 bg-blue-500 border-4 border-white dark:border-slate-900 rounded-full shadow-md"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Tiba</p>
                    <p className="font-bold text-slate-800 dark:text-white text-sm mt-0.5">{ticketData.destination}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-slate-400">14:30</p>
                    <p className="text-xs text-slate-400 font-bold">{ticketData.date}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-6">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">Data Pemesan</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Nama</p>
                  <p className="font-bold text-sm truncate">{ticketData.passenger}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Kursi</p>
                  <p className="font-black text-sm text-blue-600">{ticketData.seat}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              <div className="bg-white p-3 rounded-xl border-2 border-slate-100 mb-3">
                 <QrCode className="w-32 h-32 text-slate-900" />
              </div>
              <p className="text-xs font-bold text-slate-400 text-center">Scan QR ini di loket untuk check-in</p>
            </div>
          </div>

          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full"></div>
          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full"></div>
          <div className="absolute left-4 right-4 top-1/2 h-px border-t-2 border-dashed border-slate-200 dark:border-slate-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button 
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            <Download className="w-4 h-4" /> Unduh PDF
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none"
          >
            <Share2 className="w-4 h-4" /> Bagikan
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-green-600 text-xs font-bold bg-green-50 dark:bg-green-900/20 py-2 px-4 rounded-full w-fit mx-auto border border-green-100 dark:border-green-800">
           <ShieldCheck className="w-4 h-4" /> Transaksi Terverifikasi & Aman
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState, Suspense } from 'react';
import { 
  ArrowLeft, Download, Share2, MapPin, User, Bus, QrCode, ShieldCheck, Check, Loader2 
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { BUS_DATA } from '../../constants/data'; // Mengambil data dari modul yang sudah ada

function ETicketContent() {
  const searchParams = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);
  
  // State untuk feedback button tanpa popup
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  // Ambil ID dari URL
  const ticketId = searchParams.get('id');
  
  // Cari data bus yang sesuai dari constants/data.ts, fallback ke data pertama jika tidak ketemu
  const busInfo = BUS_DATA.find(b => b.id === ticketId) || BUS_DATA[1]; // Fallback ke Sinar Jaya Suite Class (index 1) agar terlihat bagus

  // Gabungkan data statis (mockup) dengan data real dari constants
  const ticketData = {
    bookingCode: "SKY-" + (ticketId ? ticketId.toUpperCase() : "8829301"),
    busName: busInfo.name,
    operator: busInfo.operator,
    class: busInfo.type,
    plateNumber: "B 7789 TGA", // Data mockup
    seat: "1A", // Data mockup
    passenger: "Budi Santoso", // Data mockup (ideally from localStorage/User Context)
    date: "10 Feb 2026",
    time: busInfo.departureTime,
    arrivalTime: busInfo.arrivalTime,
    origin: busInfo.fromDetail || busInfo.from,
    destination: busInfo.toDetail || busInfo.to,
    image: busInfo.image
  };

  const handleDownload = () => {
    if (downloadStatus !== 'idle') return;
    
    setDownloadStatus('loading');
    // Simulasi proses download
    setTimeout(() => {
      setDownloadStatus('success');
      // Reset status setelah 2 detik
      setTimeout(() => setDownloadStatus('idle'), 2000);
    }, 1500);
  };

  const handleShare = () => {
    // Copy URL ke clipboard
    navigator.clipboard.writeText(window.location.href);
    setShareStatus('copied');
    // Reset status setelah 2 detik
    setTimeout(() => setShareStatus('idle'), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Header disamakan dengan /about (Rata Kiri) */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/my-tickets" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">E-Ticket</h1>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Tiket Perjalanan</h2>
          <p className="text-sm text-slate-500">Tunjukkan QR Code ini kepada petugas.</p>
        </div>

        <div ref={ticketRef} className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 transition-colors">
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
                <Image src={ticketData.image} width={40} height={40} alt="Logo Bus" className="object-contain" />
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
                    <p className="font-black text-lg text-slate-400">{ticketData.arrivalTime}</p>
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
            disabled={downloadStatus !== 'idle'}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              downloadStatus === 'success' 
                ? 'bg-green-600 text-white' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {downloadStatus === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : downloadStatus === 'success' ? (
              <>
                <Check className="w-4 h-4" /> Tersimpan
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Unduh PDF
              </>
            )}
          </button>

          <button 
            onClick={handleShare}
            disabled={shareStatus === 'copied'}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              shareStatus === 'copied'
                ? 'bg-green-600 text-white shadow-none'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none'
            }`}
          >
             {shareStatus === 'copied' ? (
              <>
                <Check className="w-4 h-4" /> Disalin
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" /> Bagikan
              </>
            )}
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-green-600 text-xs font-bold bg-green-50 dark:bg-green-900/20 py-2 px-4 rounded-full w-fit mx-auto border border-green-100 dark:border-green-800">
           <ShieldCheck className="w-4 h-4" /> Transaksi Terverifikasi & Aman
        </div>
      </div>
    </div>
  );
}

export default function ETicketPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 text-slate-500 font-sans">Memuat Tiket...</div>}>
      <ETicketContent />
    </Suspense>
  );
}

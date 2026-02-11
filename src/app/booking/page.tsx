"use client";

import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Bus, User, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  // Mock Data
  const seats = Array.from({ length: 20 }, (_, i) => ({
    id: `A${i + 1}`,
    status: i % 3 === 0 ? 'booked' : 'available'
  }));

  const handleBook = () => {
    if (!selectedSeat) {
        alert("Pilih kursi terlebih dahulu!");
        return;
    }
    // Redirect ke payment
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/ticket" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
            <h1 className="font-black text-lg leading-tight">Pilih Kursi</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Jakarta - Bandung • 20 Feb 2026</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2 items-center text-sm font-bold">
                    <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div> Terisi
                </div>
                <div className="flex gap-2 items-center text-sm font-bold">
                    <div className="w-4 h-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded"></div> Kosong
                </div>
                <div className="flex gap-2 items-center text-sm font-bold">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div> Pilihan
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 justify-items-center">
                <div className="col-span-4 text-center text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 py-2 rounded w-full">Depan (Supir)</div>
                {seats.map((seat) => (
                    <button
                        key={seat.id}
                        disabled={seat.status === 'booked'}
                        onClick={() => setSelectedSeat(seat.id)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold transition
                            ${seat.status === 'booked' 
                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                                : selectedSeat === seat.id 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' 
                                    : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-blue-500'
                            }
                        `}
                    >
                        {seat.id}
                    </button>
                ))}
            </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 p-6 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="max-w-xl mx-auto flex justify-between items-center">
                <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">Total Harga</span>
                    <span className="block text-xl font-black text-blue-600 dark:text-blue-400">Rp 85.000</span>
                </div>
                <button 
                    onClick={handleBook}
                    disabled={!selectedSeat}
                    className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Lanjut Bayar
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

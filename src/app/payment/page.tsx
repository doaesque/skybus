"use client";

import React, { useState } from 'react';
import { ArrowLeft, Clock, Copy, CheckCircle, CreditCard, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'va' | 'ewallet' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if (!method) return;
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        router.push('/ticket');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/booking" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Pembayaran</h1>
      </div>

      <div className="max-w-xl mx-auto px-6 py-8 space-y-6">

        {/* Timer */}
        <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 p-4 rounded-xl flex items-center justify-between font-bold text-sm border border-orange-100 dark:border-orange-900/30">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> Selesaikan dalam</span>
            <span className="font-mono text-lg">59:42</span>
        </div>

        {/* Ringkasan */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-black text-lg mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">Ringkasan Pesanan</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Tiket Bus (1x)</span>
                    <span className="text-slate-900 dark:text-white font-bold">Rp 85.000</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Biaya Layanan</span>
                    <span className="text-slate-900 dark:text-white font-bold">Rp 2.500</span>
                </div>
                <div className="flex justify-between text-slate-900 dark:text-white pt-4 border-t border-slate-100 dark:border-slate-800 font-black text-lg">
                    <span>Total Bayar</span>
                    <span className="text-blue-600 dark:text-blue-400">Rp 87.500</span>
                </div>
            </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-widest">Pilih Metode</h3>

            <div
                onClick={() => setMethod('va')}
                className={`bg-white dark:bg-slate-900 p-4 rounded-xl border cursor-pointer transition flex items-center gap-4 ${method === 'va' ? 'border-blue-600 ring-1 ring-blue-600 bg-blue-50 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-800 hover:border-blue-400'}`}
            >
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><CreditCard className="w-6 h-6"/></div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm">Virtual Account</h4>
                    <p className="text-xs text-slate-500">BCA, Mandiri, BNI, BRI</p>
                </div>
                {method === 'va' && <CheckCircle className="w-5 h-5 text-blue-600"/>}
            </div>

            <div
                onClick={() => setMethod('ewallet')}
                className={`bg-white dark:bg-slate-900 p-4 rounded-xl border cursor-pointer transition flex items-center gap-4 ${method === 'ewallet' ? 'border-blue-600 ring-1 ring-blue-600 bg-blue-50 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-800 hover:border-blue-400'}`}
            >
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><Wallet className="w-6 h-6"/></div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm">E-Wallet / QRIS</h4>
                    <p className="text-xs text-slate-500">GoPay, OVO, Dana, ShopeePay</p>
                </div>
                {method === 'ewallet' && <CheckCircle className="w-5 h-5 text-blue-600"/>}
            </div>
        </div>

        <button
            onClick={handlePayment}
            disabled={!method || isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide transition shadow-lg shadow-blue-200 dark:shadow-none flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
            {isProcessing ? "Memproses..." : "Bayar Sekarang"}
        </button>

      </div>
    </div>
  );
}

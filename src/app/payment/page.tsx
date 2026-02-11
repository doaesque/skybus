"use client";

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BUS_DATA } from '@/constants/data';
import { CreditCard, CheckCircle, ArrowLeft, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const busId = searchParams.get('busId');
  const seats = searchParams.get('seats');
  const totalPrice = parseInt(searchParams.get('totalPrice') || '0');
  const date = searchParams.get('date');
  const pax = searchParams.get('pax');
  
  const bus = BUS_DATA.find(b => b.id === busId);
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bus) return null;

  const handlePayment = () => {
    if (!selectedMethod) {
        alert("Mohon pilih metode pembayaran.");
        return;
    }

    setIsProcessing(true);

    // Simulasi delay pembayaran
    setTimeout(() => {
        setIsProcessing(false);
        // Redirect ke E-Ticket dengan membawa data (Simulasi)
        // Di real app, data ini didapat dari database berdasarkan booking ID
        const params = new URLSearchParams();
        params.set('busId', busId!);
        params.set('seats', seats || '');
        params.set('date', date || '');
        params.set('status', 'success'); // Flag sukses baru bayar
        
        router.push(`/eticket?${params.toString()}`);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 font-sans min-h-screen pb-24">
       {/* Header */}
       <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition"><ArrowLeft className="w-5 h-5"/></button>
            <h1 className="text-2xl font-black">Pembayaran</h1>
       </div>

       {/* Rincian Pesanan */}
       <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6">
           <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Rincian Perjalanan</h3>
           <div className="space-y-4 text-sm">
               <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                   <span className="text-slate-500">Armada</span>
                   <div className="text-right">
                       <span className="font-bold block">{bus.name}</span>
                       <span className="text-xs text-slate-400">{bus.type}</span>
                   </div>
               </div>
               <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                   <span className="text-slate-500">Jadwal</span>
                   <div className="text-right">
                       <span className="font-bold block">{date ? new Date(date).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long'}) : '-'}</span>
                       <span className="text-xs text-slate-400">{bus.departureTime} WIB</span>
                   </div>
               </div>
               <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                   <span className="text-slate-500">Kursi ({pax} Org)</span>
                   <span className="font-bold text-blue-600">{seats}</span>
               </div>
               <div className="flex justify-between items-center pt-2">
                   <span className="font-bold text-lg">Total Tagihan</span>
                   <span className="font-black text-2xl text-blue-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
               </div>
           </div>
       </div>

       {/* Metode Pembayaran */}
       <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
           <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-500"/> Pilih Metode Pembayaran</h3>
           
           <div className="space-y-3">
               {[
                   {id: 'qris', label: 'QRIS (Gopay/Ovo/Dana)'},
                   {id: 'va_bca', label: 'BCA Virtual Account'},
                   {id: 'va_mandiri', label: 'Mandiri Virtual Account'},
                   {id: 'cc', label: 'Kartu Kredit / Debit'},
                   {id: 'retail', label: 'Indomaret / Alfamart'}
               ].map((method) => (
                   <label key={method.id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${selectedMethod === method.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                       <input
                            type="radio" 
                            name="payment" 
                            className="w-5 h-5 accent-blue-600"
                            checked={selectedMethod === method.id}
                            onChange={() => setSelectedMethod(method.id)}
                       />
                       <span className="font-medium">{method.label}</span>
                   </label>
               ))}
           </div>
       </div>

       {/* Bottom Bar */}
       <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-50">
           <div className="max-w-3xl mx-auto">
               <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                   {isProcessing ? (
                       <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</>
                   ) : (
                       <><Lock className="w-5 h-5" /> Bayar Sekarang</>
                   )}
               </button>
           </div>
       </div>
    </div>
  );
}

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
            <Suspense fallback={<div className="p-10 text-center">Memuat Pembayaran...</div>}>
                <PaymentContent />
            </Suspense>
        </div>
    );
}

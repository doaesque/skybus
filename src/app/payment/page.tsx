import React from 'react';
import { CreditCard, Wallet, Banknote, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-slate-800 pb-20">
      {/* Navbar Simple */}
      <div className="bg-white p-4 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-sm font-bold text-slate-500">
           <span>Pesan</span> <ArrowRight className="w-4 h-4" />
           <span>Bayar</span> <ArrowRight className="w-4 h-4" />
           <span className="text-slate-300">Selesai</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 grid gap-6">
        
        {/* Timer Alert */}
        <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg flex items-center gap-3 text-sm font-bold">
            <Clock className="w-5 h-5" />
            Selesaikan pembayaran dalam 00:59:45
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 font-bold text-lg">Pilih Metode Pembayaran</div>
          
          {/* Option 1: Virtual Account */}
          <label className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition">
             <input type="radio" name="payment" className="w-5 h-5 text-slate-600 focus:ring-slate-500" defaultChecked />
             <div className="ml-4 flex-1">
                 <div className="font-bold text-slate-800 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-slate-500" /> Virtual Account
                 </div>
                 <div className="text-xs text-slate-500 mt-1">BCA, Mandiri, BNI, BRIVA</div>
             </div>
          </label>

          {/* Option 2: E-Wallet */}
          <label className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition">
             <input type="radio" name="payment" className="w-5 h-5 text-slate-600 focus:ring-slate-500" />
             <div className="ml-4 flex-1">
                 <div className="font-bold text-slate-800 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-slate-500" /> E-Wallet
                 </div>
                 <div className="text-xs text-slate-500 mt-1">GoPay, OVO, Dana, ShopeePay</div>
             </div>
          </label>

          {/* Option 3: Retail */}
          <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition">
             <input type="radio" name="payment" className="w-5 h-5 text-slate-600 focus:ring-slate-500" />
             <div className="ml-4 flex-1">
                 <div className="font-bold text-slate-800 flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-slate-500" /> Minimarket
                 </div>
                 <div className="text-xs text-slate-500 mt-1">Indomaret, Alfamart</div>
             </div>
          </label>
        </div>

        {/* Summary & Button */}
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-slate-500">Total Tagihan</span>
                <span className="font-bold text-xl text-slate-800">Rp 245.000</span>
            </div>
            <Link href="/eticket">
                <button className="w-full bg-slate-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-black transition flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> BAYAR SEKARANG
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
}
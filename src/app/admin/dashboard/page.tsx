"use client";

import React from 'react';
import { Users, Bus, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <>
        <header className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Halo, Administrator</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Pantau performa platform SkyBus secara real-time.</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full flex items-center gap-1 border border-green-200 dark:border-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> System Online
                </span>
            </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:-translate-y-1 transition">
                <div className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Total Pendapatan</div>
                <div className="text-2xl font-black text-slate-800 dark:text-white">Rp 1.2M</div>
                <div className="absolute right-4 top-6 bg-blue-50 dark:bg-slate-800 p-2 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition"><TrendingUp className="w-5 h-5"/></div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:-translate-y-1 transition">
                <div className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Tiket Terjual</div>
                <div className="text-2xl font-black text-slate-800 dark:text-white">12.450</div>
                <div className="absolute right-4 top-6 bg-amber-50 dark:bg-slate-800 p-2 rounded-lg text-amber-500 group-hover:scale-110 transition"><CreditCard className="w-5 h-5"/></div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:-translate-y-1 transition">
                <div className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">User Baru</div>
                <div className="text-2xl font-black text-slate-800 dark:text-white">845</div>
                <div className="absolute right-4 top-6 bg-purple-50 dark:bg-slate-800 p-2 rounded-lg text-purple-500 group-hover:scale-110 transition"><Users className="w-5 h-5"/></div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:-translate-y-1 transition">
                <div className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Mitra Aktif</div>
                <div className="text-2xl font-black text-slate-800 dark:text-white">42</div>
                <div className="absolute right-4 top-6 bg-green-50 dark:bg-slate-800 p-2 rounded-lg text-green-500 group-hover:scale-110 transition"><Bus className="w-5 h-5"/></div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-800 dark:text-white flex justify-between items-center">
                    <span>Transaksi Terbaru</span>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Lihat Semua</button>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">ID Booking</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Mitra</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">TRX-00{i}</td>
                                <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">User {i}</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">PO. Sinar Jaya</td>
                                <td className="px-6 py-4"><span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-[10px] font-bold uppercase border border-green-200 dark:border-green-800">Sukses</span></td>
                                <td className="px-6 py-4 font-bold text-right text-slate-800 dark:text-white">Rp 245.000</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* System Alerts / Issues */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <div className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500"/> Laporan Kendala
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 items-start p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800/30">
                            <div className="w-2 h-2 mt-2 bg-red-500 rounded-full shrink-0 animate-pulse"></div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Gagal Pembayaran (BCA)</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">User ID: 8821 melaporkan timeout saat VA.</p>
                                <div className="text-[9px] text-slate-400 mt-2 font-mono">10 menit yang lalu</div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition py-2 border border-slate-200 dark:border-slate-700 rounded-lg">Lihat Semua Laporan</button>
            </div>
        </div>
    </>
  );
}
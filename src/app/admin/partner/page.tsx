"use client";

import React from 'react';
import { LayoutDashboard, Bus, Calendar, DollarSign, LogOut, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { MITRA_STATS } from '@/constants/data';

export default function PartnerAdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex text-slate-800 dark:text-slate-100 transition-colors">
        
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white hidden md:block fixed h-full border-r border-slate-800 z-50">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-black italic">SkyBus<span className="text-blue-500">.</span> <span className="text-xs font-normal text-slate-400 not-italic block mt-1">Partner Center</span></h1>
            </div>
            <nav className="p-4 space-y-2">
                <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg text-sm font-bold shadow-md shadow-blue-900/20"><LayoutDashboard className="w-4 h-4"/> Dashboard</a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-bold transition"><Bus className="w-4 h-4"/> Manajemen Armada</a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-bold transition"><Calendar className="w-4 h-4"/> Jadwal & Rute</a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-bold transition"><DollarSign className="w-4 h-4"/> Laporan Keuangan</a>
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                <Link href="/login">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-400 text-sm font-bold w-full hover:bg-slate-800 rounded-lg transition"><LogOut className="w-4 h-4"/> Keluar</button>
                </Link>
            </div>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 flex-1 p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">PO. Sinar Jaya</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Dashboard Operasional Partner</p>
                </div>
                <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg shadow-blue-200 dark:shadow-none transition">
                    <PlusCircle className="w-4 h-4" /> Tambah Jadwal Baru
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 group hover:-translate-y-1 transition">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Total Pendapatan (Hari Ini)</div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white">{MITRA_STATS.totalRevenue}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 group hover:-translate-y-1 transition">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Penumpang Terangkut</div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white">{MITRA_STATS.totalPassengers}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 group hover:-translate-y-1 transition">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Armada Aktif</div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white">{MITRA_STATS.activeFleets}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 group hover:-translate-y-1 transition">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Okupansi Rata-rata</div>
                    <div className="text-2xl font-black text-green-600 dark:text-green-400">{MITRA_STATS.occupancyRate}</div>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-800 dark:text-white">Transaksi Terbaru</div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">ID Booking</th>
                            <th className="px-6 py-3">Penumpang</th>
                            <th className="px-6 py-3">Rute</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Harga</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">TRX-8892{i}</td>
                                <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">Budi Santoso</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">Jakarta <span className="text-slate-400">→</span> Bandung</td>
                                <td className="px-6 py-4"><span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-[10px] font-bold uppercase border border-green-200 dark:border-green-800">Lunas</span></td>
                                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">Rp 245.000</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    </div>
  );
}
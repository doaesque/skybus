"use client";

import React from 'react';
import { LayoutDashboard, Bus, Calendar, DollarSign, Users, LogOut, PlusCircle } from 'lucide-react';
import { MITRA_STATS } from '@/constants/data';

export default function MitraPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
        
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white hidden md:block fixed h-full">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-black italic">SkyBus<span className="text-primary">.</span> <span className="text-xs font-normal text-slate-400 not-italic block mt-1">Partner Center</span></h1>
            </div>
            <nav className="p-4 space-y-2">
                <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg text-sm font-bold"><LayoutDashboard className="w-4 h-4"/> Dashboard</a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-bold transition"><Bus className="w-4 h-4"/> Manajemen Armada</a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-bold transition"><Calendar className="w-4 h-4"/> Jadwal & Rute</a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-bold transition"><DollarSign className="w-4 h-4"/> Laporan Keuangan</a>
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-4 py-3 text-red-400 text-sm font-bold w-full hover:bg-slate-800 rounded-lg"><LogOut className="w-4 h-4"/> Keluar</button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 flex-1 p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Selamat Datang, PO. Sinar Jaya</h2>
                    <p className="text-slate-500 text-sm">Berikut adalah ringkasan operasional hari ini.</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary-dark shadow-lg shadow-blue-200">
                    <PlusCircle className="w-4 h-4" /> Tambah Jadwal Baru
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">Total Pendapatan (Hari Ini)</div>
                    <div className="text-2xl font-black text-slate-800">{MITRA_STATS.totalRevenue}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">Penumpang Terangkut</div>
                    <div className="text-2xl font-black text-slate-800">{MITRA_STATS.totalPassengers}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">Armada Aktif</div>
                    <div className="text-2xl font-black text-slate-800">{MITRA_STATS.activeFleets}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">Okupansi Rata-rata</div>
                    <div className="text-2xl font-black text-green-600">{MITRA_STATS.occupancyRate}</div>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 font-bold text-slate-800">Transaksi Terbaru</div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">ID Booking</th>
                            <th className="px-6 py-3">Penumpang</th>
                            <th className="px-6 py-3">Rute</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Harga</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-xs">TRX-8892{i}</td>
                                <td className="px-6 py-4 font-bold text-slate-700">Budi Santoso</td>
                                <td className="px-6 py-4">Jakarta <span className="text-slate-300">→</span> Bandung</td>
                                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Lunas</span></td>
                                <td className="px-6 py-4 font-bold">Rp 245.000</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    </div>
  );
}
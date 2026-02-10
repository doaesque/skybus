"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Bus, Calendar, DollarSign, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Cek Role di LocalStorage
    const role = localStorage.getItem("userRole");
    if (role !== "mitra") {
      router.push("/login"); // Redirect jika bukan mitra
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Tahan rendering sampai authorized
  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Sidebar Mitra */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block fixed h-full border-r border-slate-800 z-50">
        <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-black italic">SkyBus<span className="text-blue-500">.</span> <span className="text-xs font-normal text-slate-400 not-italic block mt-1">Partner Center</span></h1>
        </div>
        <nav className="p-4 space-y-2">
            <Link href="/admin/partner" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname === '/admin/partner' ? 'bg-blue-600' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <LayoutDashboard className="w-4 h-4"/> Dashboard
            </Link>
            <Link href="/admin/partner/fleets" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname.includes('fleets') ? 'bg-blue-600' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <Bus className="w-4 h-4"/> Manajemen Armada
            </Link>
            <Link href="/admin/partner/schedules" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname.includes('schedules') ? 'bg-blue-600' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <Calendar className="w-4 h-4"/> Jadwal & Rute
            </Link>
            <Link href="/admin/partner/finance" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname.includes('finance') ? 'bg-blue-600' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <DollarSign className="w-4 h-4"/> Laporan Keuangan
            </Link>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
            <Link href="/login">
                <button className="flex items-center gap-3 px-4 py-3 text-red-400 text-sm font-bold w-full hover:bg-slate-800 rounded-lg transition">
                    <LogOut className="w-4 h-4"/> Keluar
                </button>
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
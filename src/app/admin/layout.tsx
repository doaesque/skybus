"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Bus, CreditCard, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- CEK KEAMANAN ---
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    // Jika akses folder /admin/partner, biarkan layout partner yang menangani (skip check)
    if (pathname.includes('/admin/partner')) {
        setIsAuthorized(true); 
        return;
    }

    if (role !== "admin") {
      router.push("/login"); // Tendang jika bukan admin
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  // Jangan render apapun jika mengakses area partner (karena punya layout sendiri)
  if (pathname.includes('/admin/partner')) {
      return <>{children}</>;
  }

  if (!isAuthorized) return null; // Tahan rendering sampai lolos cek

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex text-slate-800 dark:text-slate-100 transition-colors">
      {/* Sidebar Super Admin */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block fixed h-full border-r border-slate-800 z-50">
        <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-black italic">SkyBus<span className="text-blue-500">.</span> <span className="text-xs font-normal text-slate-400 not-italic block mt-1">Super Admin</span></h1>
        </div>
        <nav className="p-4 space-y-2">
            <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname === '/admin/dashboard' ? 'bg-blue-600 shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><LayoutDashboard className="w-4 h-4"/> Dashboard</Link>
            <Link href="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname === '/admin/users' ? 'bg-blue-600 shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Users className="w-4 h-4"/> Data Pengguna</Link>
            <Link href="/admin/mitra-list" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname === '/admin/mitra-list' ? 'bg-blue-600 shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Bus className="w-4 h-4"/> Kelola Mitra</Link>
            <Link href="/admin/transactions" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname === '/admin/transactions' ? 'bg-blue-600 shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><CreditCard className="w-4 h-4"/> Transaksi</Link>
            <Link href="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${pathname === '/admin/settings' ? 'bg-blue-600 shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Settings className="w-4 h-4"/> Pengaturan</Link>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
            <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="flex items-center gap-3 px-4 py-3 text-red-400 text-sm font-bold w-full hover:bg-slate-800 rounded-lg transition"><LogOut className="w-4 h-4"/> Keluar</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Facebook, Apple, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* Navbar Simple */}
      <div className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full space-y-8">
            <div className="text-center">
                <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h2 className="text-3xl font-black text-slate-900">Selamat Datang</h2>
                <p className="mt-2 text-slate-500">Masuk untuk mengelola tiket perjalananmu.</p>
            </div>

            <div className="space-y-4">
                 {/* Social Login */}
                <button className="w-full flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-3" alt="Google" />
                    Lanjut dengan Google
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-white text-slate-400 font-bold">Atau login manual</span></div>
            </div>

            <form className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                        <input type="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-primary focus:bg-white transition" placeholder="nama@email.com" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                required 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-primary focus:bg-white transition" 
                                placeholder="••••••••" 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                        <span className="font-bold text-slate-600">Ingat Saya</span>
                    </label>
                    <a href="#" className="font-bold text-primary hover:underline">Lupa Password?</a>
                </div>

                <Link href="/">
                    <button type="button" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-black transition shadow-lg">
                        MASUK
                    </button>
                </Link>
            </form>
            
            <p className="text-center text-sm text-slate-500">
                Belum punya akun? <Link href="/signup" className="font-bold text-primary hover:underline">Daftar Sekarang</Link>
            </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi Login
    setTimeout(() => {
        setIsLoading(false);
        // Simpan token dummy agar dianggap login (opsional)
        // localStorage.setItem("userRole", "user");
        router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans transition-colors">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">

        <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-black italic tracking-tighter inline-block mb-2">
                SkyBus<span className="text-blue-600">.</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Selamat datang kembali!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Email</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 dark:text-white"
                        required
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Kata Sandi</label>
                    <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">Lupa Sandi?</Link>
                </div>
                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 dark:text-white"
                        required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex justify-center items-center"
            >
                {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : 'Masuk'}
            </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Belum punya akun? <Link href="/signup" className="text-blue-600 font-bold hover:underline">Daftar Sekarang</Link>
        </div>
      </div>
    </div>
  );
}

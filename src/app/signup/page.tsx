"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormFilled = formData.name && formData.email && formData.phone && formData.password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid(formData.email)) {
        alert("Email tidak valid. Pastikan mengandung '@' dan '.'");
        return;
    }

    setIsLoading(true);
    // Simulasi delay request
    setTimeout(() => {
        setIsLoading(false);
        router.push('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans transition-colors">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">

        <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-black italic tracking-tighter inline-block mb-2">
                SkyBus<span className="text-blue-600">.</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Buat akun baru untuk mulai perjalanan Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Nama Lengkap</label>
                <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input name="name" onChange={handleChange} type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 dark:text-white" required />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Email</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input name="email" onChange={handleChange} type="email" placeholder="name@example.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 dark:text-white" required />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Nomor Telepon</label>
                <div className="relative flex">
                    <div className="pl-4 pr-3 py-3 bg-slate-100 dark:bg-slate-800 rounded-l-xl font-bold text-slate-500 border-r border-slate-200 dark:border-slate-700 flex items-center">
                        +62
                    </div>
                    <input name="phone" onChange={handleChange} type="tel" placeholder="812345678" className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-r-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 dark:text-white" required />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Kata Sandi</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input name="password" onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 dark:text-white" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" required />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                    Saya menyetujui <Link href="/terms" target="_blank" className="text-blue-600 font-bold hover:underline">Syarat & Ketentuan</Link> serta <Link href="/privacy" target="_blank" className="text-blue-600 font-bold hover:underline">Kebijakan Privasi</Link> SkyBus.
                </p>
            </div>

            <button
                type="submit"
                disabled={!isFormFilled || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex justify-center items-center"
            >
                {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : 'Daftar Akun'}
            </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Sudah punya akun? <Link href="/login" className="text-blue-600 font-bold hover:underline">Masuk Sekarang</Link>
        </div>
      </div>
    </div>
  );
}

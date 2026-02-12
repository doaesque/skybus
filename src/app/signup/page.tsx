"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormFilled = formData.name && formData.email && formData.phone && formData.password;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isEmailValid(formData.email)) {
      setError("Email tidak valid. Pastikan mengandung '@' dan '.'");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Simulasi sukses signup & auto-login
      localStorage.setItem("userRole", "user");
      localStorage.setItem("skybus_session", "skb_user_new_" + Date.now()); // Create fresh session

      setLoading(false);

      // Redirect logic: Back to ticket if requested, else login or home
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push('/login'); // Standard flow
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <div className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-md -skew-x-12 shadow-lg shadow-amber-500/40"></div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">Buat Akun Baru</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Bergabung dan nikmati kemudahan memesan tiket.</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl flex items-center gap-2 text-sm font-bold animate-pulse">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Nama Lengkap</label>
                <input name="name" type="text" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition dark:text-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Email</label>
                <input name="email" type="email" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition dark:text-white" placeholder="nama@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Nomor Telepon</label>
                <div className="flex">
                  <span className="px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-800 rounded-l-xl text-sm font-bold text-slate-500 flex items-center">+62</span>
                  <input name="phone" type="tel" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-r-xl text-sm font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition dark:text-white" placeholder="812345678" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Password</label>
                <div className="relative">
                  <input name="password" type={showPassword ? "text" : "password"} required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition dark:text-white" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 mt-1">
              <input type="checkbox" className="mt-1.2 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" required />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                Saya menyetujui <Link href="/terms" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Syarat & Ketentuan</Link> serta <Link href="/privacy" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Kebijakan Privasi</Link>.
              </p>
            </div>

            <button type="submit" disabled={loading || !isFormFilled} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-slate-200 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center gap-2 items-center">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "DAFTAR"}
            </button>
          </form>

          <div className="text-center text-sm font-bold text-slate-500 dark:text-slate-400">
            Sudah punya akun? <Link href={redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login"} className="text-blue-600 dark:text-blue-400 hover:underline">Masuk Saja</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}

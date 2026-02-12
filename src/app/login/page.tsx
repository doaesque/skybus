"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      // 1. Cek di daftar user hasil signup (skybus_users)
      const storedUsersJSON = localStorage.getItem("skybus_users");
      let foundUser = null;

      if (storedUsersJSON) {
        try {
          const storedUsers = JSON.parse(storedUsersJSON);
          if (Array.isArray(storedUsers)) {
            // Cari user yang email & passwordnya cocok
            foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
          }
        } catch (err) {
          console.error("Error parsing users", err);
        }
      }

      // 2. Jika ketemu user dari signup
      if (foundUser) {
        localStorage.setItem("userRole", foundUser.role || "user");
        localStorage.setItem("skybus_session", "skb_user_" + Date.now());
        
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push("/");
        }
        return;
      }

      // 3. Fallback: Cek akun demo (Hardcoded)
      if (email === "admin@skybus.id" && password === "admin123") {
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("skybus_session", "skb_admin_secure_8823_hash");
        router.push("/admin/dashboard");
      } else if (email === "mitra@sinarjaya.com" && password === "mitra123") {
        localStorage.setItem("userRole", "mitra");
        localStorage.setItem("skybus_session", "skb_mitra_v2_9988_token");
        router.push("/admin/partner");
      } else if (email === "user@gmail.com" && password === "user123") {
        localStorage.setItem("userRole", "user");
        localStorage.setItem("skybus_session", "skb_user_v1_xy77_access");
        
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push("/");
        }
      } else {
        // Jika semua gagal
        setError("Email atau password salah!");
        setLoading(false);
      }
    }, 1000);
  };

  const autoFill = (role: 'admin' | 'mitra' | 'user') => {
    if (role === 'admin') { setEmail("admin@skybus.id"); setPassword("admin123"); }
    if (role === 'mitra') { setEmail("mitra@sinarjaya.com"); setPassword("mitra123"); }
    if (role === 'user') { setEmail("user@gmail.com"); setPassword("user123"); }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors relative">
      <div className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </div>

      <button
        onClick={() => setShowDemo(!showDemo)}
        className="absolute top-0 right-0 w-16 h-16 opacity-0 cursor-default"
        title="Toggle Demo Accounts"
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-md -skew-x-12 shadow-lg shadow-amber-500/40"></div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">Selamat Datang</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Masuk untuk mengelola perjalananmu.</p>
          </div>

          {showDemo && (
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs animate-in fade-in slide-in-from-top-2">
              <p className="font-bold mb-2 text-slate-400 uppercase tracking-widest">Demo Accounts</p>
              <div className="grid grid-cols-3 gap-2">
                <button type="button" onClick={() => autoFill('admin')} className="px-2 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded hover:border-blue-500 transition text-slate-600 dark:text-slate-300">Admin</button>
                <button type="button" onClick={() => autoFill('mitra')} className="px-2 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded hover:border-blue-500 transition text-slate-600 dark:text-slate-300">Mitra</button>
                <button type="button" onClick={() => autoFill('user')} className="px-2 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded hover:border-blue-500 transition text-slate-600 dark:text-slate-300">User</button>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl flex items-center gap-2 text-sm font-bold animate-pulse">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition dark:text-white" placeholder="nama@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition dark:text-white" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-slate-200 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "MEMPROSES..." : "MASUK"}
            </button>
          </form>

          <div className="text-center text-sm font-bold text-slate-500 dark:text-slate-400">
            Belum punya akun? <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Daftar Sekarang</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

"use client";

import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const existingUsers = localStorage.getItem("skybus_users");
    if (!existingUsers) {
      const demoAccounts = [
        { name: "Admin Skybus", email: "admin@skybus.id", password: "admin123", role: "admin", phone: "081234567890" },
        { name: "Mitra Sinar Jaya", email: "mitra@sinarjaya.com", password: "mitra123", role: "mitra", phone: "081234567891" },
        { name: "User Demo", email: "user@gmail.com", password: "user123", role: "user", phone: "081234567892" }
      ];
      localStorage.setItem("skybus_users", JSON.stringify(demoAccounts));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    let newErrors = { email: "", password: "" };
    let hasError = false;

    if (!email.trim()) {
      newErrors.email = "Email wajib diisi";
      hasError = true;
    }
    if (!password.trim()) {
      newErrors.password = "Kata sandi wajib diisi";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const storedUsersJSON = localStorage.getItem("skybus_users");
      let foundUser = null;

      if (storedUsersJSON) {
        try {
          const storedUsers = JSON.parse(storedUsersJSON);
          if (Array.isArray(storedUsers)) {
            foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (foundUser) {
        localStorage.setItem("userRole", foundUser.role || "user");
        localStorage.setItem("skybus_session", "skb_" + foundUser.role + "_" + Date.now());

        if (foundUser.role === "admin") {
          router.push("/admin/dashboard");
        } else if (foundUser.role === "mitra") {
          router.push("/admin/partner");
        } else {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push("/");
          }
        }
      } else {
        setErrors({
          email: "Email atau password tidak ditemukan",
          password: "Email atau password tidak ditemukan"
        });
        setLoading(false);
      }
    }, 1000);
  };

  const autoFill = (role: 'admin' | 'mitra' | 'user') => {
    setErrors({ email: "", password: "" });
    if (role === 'admin') { setEmail("admin@skybus.id"); setPassword("admin123"); }
    if (role === 'mitra') { setEmail("mitra@sinarjaya.com"); setPassword("mitra123"); }
    if (role === 'user') { setEmail("user@gmail.com"); setPassword("user123"); }
  };

  const ErrorBubble = ({ message }: { message: string }) => (
    <div className="absolute top-full left-0 mt-2 w-full z-10 animate-in fade-in slide-in-from-top-1">
      <div className="bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg relative">
        <div className="absolute -top-1.5 left-4 w-3 h-3 bg-red-500 rotate-45"></div>
        {message}
      </div>
    </div>
  );

  const getInputClass = (isError: boolean) => {
    return `w-full px-4 py-3 rounded-xl text-sm font-semibold focus:outline-none transition dark:text-white ${
      isError
        ? "bg-red-50 dark:bg-red-900/10 border border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
        : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500"
    }`;
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

          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div className="space-y-6">
              <div className="relative">
                <label className={`block text-xs font-bold uppercase mb-1 ${errors.email ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if(errors.email) setErrors({...errors, email: ""});
                  }}
                  className={getInputClass(!!errors.email)}
                  placeholder="nama@email.com"
                />
                {errors.email && <ErrorBubble message={errors.email} />}
              </div>

              <div className="relative">
                <label className={`block text-xs font-bold uppercase mb-1 ${errors.password ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if(errors.password) setErrors({...errors, password: ""});
                    }}
                    className={getInputClass(!!errors.password)}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <ErrorBubble message={errors.password} />}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Ingat Saya</span>
                </label>
                <Link href="#" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Lupa Kata Sandi?
                </Link>
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

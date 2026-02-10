"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ChevronDown, Info } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  // Logika validasi password ( Checklist di bawah input )
  const hasMinLength = password.length >= 8;
  const hasUpperLowerCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 font-sans text-slate-800">
      
      {/* Header Link (Top Right) */}
      <div className="absolute top-8 right-8 text-right hidden md:block">
        <p className="text-sm text-slate-500">
          Sudah punya akun? <Link href="/login" className="font-bold text-slate-800 hover:underline">Masuk</Link>
        </p>
        <a href="#" className="text-xs text-slate-400 block mt-1">Lupa user ID atau password?</a>
      </div>

      {/* Logo Section */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-slate-300 rounded-full mx-auto mb-2 flex items-center justify-center font-black text-white text-xs">
          LOGO
        </div>
        <h2 className="text-xl font-bold tracking-widest">SKYBUS</h2>
      </div>

      {/* Form Card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-10 relative">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Buat Akun</h2>
          <p className="mt-2 text-sm text-slate-500">
            Bergabunglah dengan SkyBus untuk menikmati kemudahan perjalanan antar kota dengan harga terbaik.
          </p>
        </div>

        <form className="space-y-6">
          {/* Email Field */}
          <div className="relative group">
            <label htmlFor="email" className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <input 
                id="email" 
                type="email" 
                required 
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
              />
              <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-slate-400" />
            </div>
            
            {/* Tooltip (Sesuai Gambar) */}
            <div className="absolute -right-4 top-0 translate-x-full hidden lg:block w-48 p-3 bg-slate-800 text-white text-[10px] rounded-lg shadow-xl">
               <div className="absolute left-0 top-4 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
               Kami akan menggunakan email Anda sebagai User ID akun SkyBus Anda.
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Nomor Telepon
            </label>
            <input 
              id="phone" 
              type="tel" 
              required 
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            />
            <p className="mt-2 text-[10px] text-slate-400 leading-relaxed">
              Kami sangat menyarankan untuk menambahkan nomor telepon. Ini akan membantu verifikasi akun dan menjaga keamanan akun Anda.
            </p>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-end mb-1">
              <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                {showPassword ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>
            <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            />
          </div>

          {/* Password Validation Checklist (Sesuai Gambar) */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-1">
            <div className="flex items-center gap-2 text-[10px] font-medium transition">
              <div className={`w-1.5 h-1.5 rounded-full ${hasMinLength ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`}></div>
              <span className={hasMinLength ? 'text-slate-800' : 'text-slate-400'}>Minimal 8 karakter</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium transition">
              <div className={`w-1.5 h-1.5 rounded-full ${hasUpperLowerCase ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`}></div>
              <span className={hasUpperLowerCase ? 'text-slate-800' : 'text-slate-400'}>Huruf besar & kecil (Aa)</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium transition">
              <div className={`w-1.5 h-1.5 rounded-full ${hasNumber ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`}></div>
              <span className={hasNumber ? 'text-slate-800' : 'text-slate-400'}>Gunakan angka (123)</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium transition">
              <div className={`w-1.5 h-1.5 rounded-full ${hasSymbol ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`}></div>
              <span className={hasSymbol ? 'text-slate-800' : 'text-slate-400'}>Gunakan simbol (!@#)</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white py-4 rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg active:scale-95 mt-4"
          >
            DAFTAR SEKARANG
          </button>

          {/* Legal Footer */}
          <p className="text-[10px] text-center text-slate-400 px-4 leading-relaxed">
            Dengan membuat akun, Anda menyetujui <Link href="/terms" className="underline hover:text-slate-600">Ketentuan Penggunaan</Link> dan <Link href="/privacy" className="underline hover:text-slate-600">Kebijakan Privasi</Link> SkyBus.
          </p>
        </form>
      </div>

      {/* Mobile Footer Link */}
      <div className="mt-8 text-center md:hidden">
        <p className="text-sm text-slate-500">
          Sudah punya akun? <Link href="/login" className="font-bold text-slate-800 underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
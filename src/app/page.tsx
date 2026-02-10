"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, ArrowRight, 
  CreditCard, Armchair, QrCode, Ticket, 
  ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import { POPULAR_LOCATIONS } from "@/constants/data";

export default function Home() {
  // --- STATE ---
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [passengers, setPassengers] = useState(1);
  
  // State Lokasi
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  
  // State Dropdown
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // Ref untuk mendeteksi klik di luar elemen
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // --- EFFECT: Close Dropdown on Outside Click ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- LOGIC: Filter Locations ---
  const filteredOrigins = POPULAR_LOCATIONS.filter(loc => 
    loc.toLowerCase().includes(origin.toLowerCase())
  );
  const filteredDests = POPULAR_LOCATIONS.filter(loc => 
    loc.toLowerCase().includes(destination.toLowerCase())
  );

  // --- LOGIC: Passenger Validation (Min 1) ---
  const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) {
        setPassengers(val);
    } else if (e.target.value === "") {
        // Izinkan kosong sementara agar user bisa hapus angka, tapi onBlur nanti set ke 1
        // Untuk UX yang lebih baik di sini kita force min 1 jika kosong saat submit, 
        // tapi di onChange kita biarkan angka valid saja.
        // Opsi simpel: Jangan biarkan kosong.
    }
  };

  const handlePassengerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) {
          setPassengers(1);
      }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white text-blue-600 sticky top-0 z-50 shadow-sm border-b border-slate-100">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2 italic">
           SkyBus<span className="text-amber-500">.</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition">Beranda</Link>
          <Link href="/search" className="hover:text-blue-600 transition">Cari Tiket</Link>
          <Link href="/my-orders" className="hover:text-blue-600 transition">Pesanan Saya</Link>
          <Link href="/help" className="hover:text-blue-600 transition">Bantuan</Link>
        </div>
        <div className="flex space-x-3">
          <Link href="/login">
            <button className="px-5 py-2 text-blue-600 font-bold text-sm rounded-full hover:bg-blue-50 transition">Masuk</button>
          </Link>
          <Link href="/signup">
            <button className="px-5 py-2 bg-blue-600 text-white text-sm rounded-full font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200">Daftar</button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
        
        {/* Abstract Background Shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        {/* Left Text */}
        <div className="text-white space-y-6 relative z-10">
          <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-sm border border-white/20">
            #1 Partner Perjalanan Anda
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            JELAJAHI <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">INDONESIA</span>
          </h1>
          <p className="opacity-90 max-w-md leading-relaxed text-lg font-medium text-blue-50">
            Pesan tiket bus online dengan jaminan harga transparan, jadwal real-time, dan ulasan foto asli dari penumpang.
          </p>
          
          <div className="flex gap-4 pt-4">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span className="text-sm font-bold">Jaminan Uang Kembali</span>
             </div>
             <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-bold">2 Juta+ Pengguna</span>
             </div>
          </div>
        </div>

        {/* Right Form (BOOKING ENGINE) */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl shadow-blue-900/20 max-w-md w-full ml-auto relative z-10">
          
          {/* Tabs Trip Type */}
          <div className="flex border-b mb-6">
            <button 
                onClick={() => setTripType('one-way')}
                className={`flex-1 pb-3 border-b-2 font-bold text-sm transition ${tripType === 'one-way' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
                Sekali Jalan
            </button>
            <button 
                onClick={() => setTripType('round-trip')}
                className={`flex-1 pb-3 border-b-2 font-bold text-sm transition ${tripType === 'round-trip' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
                Pulang Pergi
            </button>
          </div>

          <div className="space-y-4">
            
            {/* Input: Dari Mana (With Dropdown) */}
            <div className="relative" ref={originRef}>
                <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 py-3 group focus-within:ring-2 focus-within:ring-blue-600/20 transition">
                  <MapPin className="w-5 h-5 text-slate-400 mr-3 group-focus-within:text-blue-600" />
                  <div className="w-full">
                     <label className="block text-[10px] font-bold text-slate-400 uppercase">Dari Mana?</label>
                     <input 
                        type="text" 
                        placeholder="Ketik kota asal..." 
                        className="w-full outline-none text-sm font-bold bg-transparent text-slate-800 placeholder:font-normal"
                        value={origin}
                        onChange={(e) => { setOrigin(e.target.value); setShowOriginDropdown(true); }}
                        onFocus={() => setShowOriginDropdown(true)}
                     />
                  </div>
                </div>
                
                {/* Dropdown Suggestion Origin */}
                {showOriginDropdown && (
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1 z-20 max-h-60 overflow-y-auto">
                        {filteredOrigins.length > 0 ? filteredOrigins.map((loc, idx) => (
                            <div 
                                key={idx} 
                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm font-medium text-slate-700 border-b border-slate-50 last:border-0"
                                onClick={() => { setOrigin(loc); setShowOriginDropdown(false); }}
                            >
                                {loc}
                            </div>
                        )) : (
                            <div className="px-4 py-3 text-xs text-slate-400">Lokasi tidak ditemukan</div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Input: Mau Ke Mana (With Dropdown & Swap) */}
            <div className="relative" ref={destRef}>
                <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 py-3 relative group focus-within:ring-2 focus-within:ring-blue-600/20 transition">
                  <MapPin className="w-5 h-5 text-slate-400 mr-3 group-focus-within:text-blue-600" />
                  <div className="w-full">
                     <label className="block text-[10px] font-bold text-slate-400 uppercase">Mau Ke Mana?</label>
                     <input 
                        type="text" 
                        placeholder="Ketik kota tujuan..." 
                        className="w-full outline-none text-sm font-bold bg-transparent text-slate-800 placeholder:font-normal" 
                        value={destination}
                        onChange={(e) => { setDestination(e.target.value); setShowDestDropdown(true); }}
                        onFocus={() => setShowDestDropdown(true)}
                     />
                  </div>
                  
                  {/* Swap Button */}
                  <div 
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full border shadow-sm cursor-pointer hover:bg-slate-50 transition z-10"
                    onClick={() => {
                        const temp = origin;
                        setOrigin(destination);
                        setDestination(temp);
                    }}
                  >
                     <ArrowRight className="w-4 h-4 rotate-90 text-blue-600" />
                  </div>
                </div>

                {/* Dropdown Suggestion Destination */}
                {showDestDropdown && (
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1 z-20 max-h-60 overflow-y-auto">
                        {filteredDests.length > 0 ? filteredDests.map((loc, idx) => (
                            <div 
                                key={idx} 
                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm font-medium text-slate-700 border-b border-slate-50 last:border-0"
                                onClick={() => { setDestination(loc); setShowDestDropdown(false); }}
                            >
                                {loc}
                            </div>
                        )) : (
                            <div className="px-4 py-3 text-xs text-slate-400">Lokasi tidak ditemukan</div>
                        )}
                    </div>
                )}
            </div>

            {/* Date & Passenger Inputs */}
            <div className={`grid gap-4 ${tripType === 'round-trip' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                
                <div className="flex gap-4 w-full">
                    {/* Tanggal Pergi */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Pergi</label>
                        <input type="date" className="w-full outline-none text-sm font-bold bg-transparent text-slate-800" />
                    </div>
                    
                    {/* Tanggal Pulang (Hanya Muncul jika Round Trip) */}
                    {tripType === 'round-trip' && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full animate-in fade-in slide-in-from-left-4">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Pulang</label>
                            <input type="date" className="w-full outline-none text-sm font-bold bg-transparent text-slate-800" />
                        </div>
                    )}
                </div>

                {/* Jumlah Penumpang */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Kursi</label>
                    <input 
                        type="number" 
                        placeholder="1" 
                        min="1"
                        value={passengers}
                        onChange={handlePassengerChange}
                        onBlur={handlePassengerBlur}
                        className="w-full outline-none text-sm font-bold bg-transparent text-slate-800" 
                    />
                </div>
            </div>

            <Link href="/search" className="block w-full pt-2">
                <button className="w-full bg-amber-500 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide hover:bg-amber-600 transition shadow-lg shadow-amber-500/30 flex justify-center items-center gap-2">
                CARI TIKET MURAH
                </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION (Icons) --- */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
                {icon: <Calendar className="w-8 h-8 text-blue-600"/>, title: "Jadwal Real-Time", desc: "Anti ketinggalan bus"},
                {icon: <Armchair className="w-8 h-8 text-blue-600"/>, title: "Pilih Kursi Sendiri", desc: "Duduk nyaman sesuai selera"},
                {icon: <ShieldCheck className="w-8 h-8 text-blue-600"/>, title: "Pembayaran Aman", desc: "Garansi transaksi 100%"},
                {icon: <Ticket className="w-8 h-8 text-blue-600"/>, title: "E-Ticket Instan", desc: "Tanpa antre cetak tiket"}
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                    <div className="bg-blue-50 p-4 rounded-full mb-2">{item.icon}</div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 text-sm">
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-600">
           &copy; 2026 SkyBus Indonesia. Hak Cipta Dilindungi.
        </div>
      </footer>
    </main>
  );
}
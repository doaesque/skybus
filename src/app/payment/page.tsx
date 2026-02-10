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
  // State untuk Form Booking
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [passengers, setPassengers] = useState(1);
  
  // State untuk Input Lokasi & Dropdown
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // Ref untuk klik di luar dropdown
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar
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

  // Filter Lokasi
  const filteredOrigins = POPULAR_LOCATIONS.filter(loc => 
    loc.toLowerCase().includes(origin.toLowerCase())
  );
  const filteredDests = POPULAR_LOCATIONS.filter(loc => 
    loc.toLowerCase().includes(destination.toLowerCase())
  );

  // Handler Penumpang (Min 1)
  const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val < 1) return; // Cegah angka di bawah 1
    setPassengers(val);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white text-primary sticky top-0 z-50 shadow-sm border-b border-slate-100">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2 italic">
           SkyBus<span className="text-accent">.</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-500">
          <Link href="/" className="hover:text-primary transition">Beranda</Link>
          <Link href="/search" className="hover:text-primary transition">Cari Tiket</Link>
          <Link href="/my-orders" className="hover:text-primary transition">Pesanan Saya</Link>
          <Link href="/help" className="hover:text-primary transition">Bantuan</Link>
        </div>
        <div className="flex space-x-3">
          <Link href="/login">
            <button className="px-5 py-2 text-primary font-bold text-sm rounded-full hover:bg-secondary transition">Masuk</button>
          </Link>
          <Link href="/signup">
            <button className="px-5 py-2 bg-primary text-white text-sm rounded-full font-bold hover:bg-primary-dark transition shadow-md shadow-blue-200">Daftar</button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-primary to-blue-800 px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
        
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

        {/* Right Form */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl shadow-blue-900/20 max-w-md w-full ml-auto relative z-10">
          
          {/* Tabs Trip Type */}
          <div className="flex border-b mb-6">
            <button 
                onClick={() => setTripType('one-way')}
                className={`flex-1 pb-3 border-b-2 font-bold text-sm transition ${tripType === 'one-way' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
                Sekali Jalan
            </button>
            <button 
                onClick={() => setTripType('round-trip')}
                className={`flex-1 pb-3 border-b-2 font-bold text-sm transition ${tripType === 'round-trip' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
                Pulang Pergi
            </button>
          </div>

          <div className="space-y-4">
            
            {/* Input: Dari Mana (With Dropdown) */}
            <div className="relative" ref={originRef}>
                <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 py-3 group focus-within:ring-2 focus-within:ring-primary/20 transition">
                  <MapPin className="w-5 h-5 text-slate-400 mr-3 group-focus-within:text-primary" />
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
                {/* Dropdown Suggestion */}
                {showOriginDropdown && (origin || showOriginDropdown) && (
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1 z-20 max-h-60 overflow-y-auto">
                        {filteredOrigins.length > 0 ? filteredOrigins.map((loc, idx) => (
                            <div 
                                key={idx} 
                                className="px-4 py-3 hover:bg-secondary cursor-pointer text-sm font-medium text-slate-700"
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
                <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 py-3 relative group focus-within:ring-2 focus-within:ring-primary/20 transition">
                  <MapPin className="w-5 h-5 text-slate-400 mr-3 group-focus-within:text-primary" />
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
                     <ArrowRight className="w-4 h-4 rotate-90 text-primary" />
                  </div>
                </div>
                {/* Dropdown Suggestion */}
                {showDestDropdown && (destination || showDestDropdown) && (
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1 z-20 max-h-60 overflow-y-auto">
                        {filteredDests.length > 0 ? filteredDests.map((loc, idx) => (
                            <div 
                                key={idx} 
                                className="px-4 py-3 hover:bg-secondary cursor-pointer text-sm font-medium text-slate-700"
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
                <div className="flex gap-4">
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
                        className="w-full outline-none text-sm font-bold bg-transparent text-slate-800" 
                    />
                </div>
            </div>

            <Link href="/search" className="block w-full pt-2">
                <button className="w-full bg-accent text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide hover:bg-amber-600 transition shadow-lg shadow-amber-500/30 flex justify-center items-center gap-2">
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
                {icon: <Calendar className="w-8 h-8 text-primary"/>, title: "Jadwal Real-Time", desc: "Anti ketinggalan bus"},
                {icon: <Armchair className="w-8 h-8 text-primary"/>, title: "Pilih Kursi Sendiri", desc: "Duduk nyaman sesuai selera"},
                {icon: <ShieldCheck className="w-8 h-8 text-primary"/>, title: "Pembayaran Aman", desc: "Garansi transaksi 100%"},
                {icon: <Ticket className="w-8 h-8 text-primary"/>, title: "E-Ticket Instan", desc: "Tanpa antre cetak tiket"}
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                    <div className="bg-secondary p-4 rounded-full mb-2">{item.icon}</div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- PROMO SECTION --- */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="max-w-lg">
            <span className="text-accent font-bold text-xs tracking-widest uppercase">Promo Spesial</span>
            <h2 className="text-3xl font-black mb-4 text-slate-900">Diskon Pengguna Baru</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">Dapatkan potongan harga hingga 20% untuk perjalanan pertama Anda. Tanpa minimum transaksi.</p>
            <Link href="/promo">
                <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-4 transition-all">
                Ambil Promo <ArrowRight className="w-4 h-4" />
                </button>
            </Link>
          </div>
          <div className="bg-secondary p-8 rounded-xl border-2 border-dashed border-primary w-full max-w-sm relative overflow-hidden">
             <div className="absolute -right-6 -top-6 bg-primary text-white text-xs font-bold py-1 px-8 rotate-45">TERBATAS</div>
             <div className="text-center">
                <p className="text-slate-500 text-xs font-bold uppercase mb-2">Kode Voucher</p>
                <h3 className="text-3xl font-black text-primary tracking-widest">SKYNEW24</h3>
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-sm">
            <div className="text-white text-2xl font-black italic mb-4">SkyBus<span className="text-accent">.</span></div>
            <p className="mb-6 leading-relaxed text-slate-500">Platform pemesanan tiket bus antarkota dengan pengalaman pemesanan yang cepat, aman, dan transparan.</p>
            <p className="text-xs font-bold text-slate-600">PARTNER PEMBAYARAN</p>
            <div className="flex gap-4 mt-2 font-bold text-slate-500 italic">
                <span>BCA</span><span>MANDIRI</span><span>GOPAY</span>
            </div>
          </div>
          <div className="flex gap-16">
             <div>
                <h4 className="text-white font-bold mb-4 uppercase">Perusahaan</h4>
                <ul className="space-y-2">
                    <li><Link href="#" className="hover:text-primary">Tentang Kami</Link></li>
                    <li><Link href="/mitra" className="hover:text-primary">Daftar Mitra</Link></li>
                    <li><Link href="#" className="hover:text-primary">Karir</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4 uppercase">Dukungan</h4>
                <ul className="space-y-2">
                    <li><Link href="/help" className="hover:text-primary">Pusat Bantuan</Link></li>
                    <li><Link href="/privacy" className="hover:text-primary">Kebijakan Privasi</Link></li>
                    <li><Link href="/terms" className="hover:text-primary">Syarat & Ketentuan</Link></li>
                </ul>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-600">
           &copy; 2024 SkyBus Indonesia. Hak Cipta Dilindungi.
        </div>
      </footer>
    </main>
  );
}
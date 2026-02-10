"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin, Users, ArrowRight, Ticket, ShieldCheck, MessageCircle,
  BookOpen, Clock, Map, Bus, Check, ChevronDown, ChevronUp, ArrowUpDown, Armchair
} from "lucide-react";
import Link from "next/link";
import { POPULAR_LOCATIONS, POPULAR_ROUTES, PARTNERS } from "@/constants/data";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [passengers, setPassengers] = useState(1);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  const isFormValid = origin.length > 0 && destination.length > 0 && departDate.length > 0 && passengers > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (originRef.current && !originRef.current.contains(event.target as Node)) setShowOriginDropdown(false);
      if (destRef.current && !destRef.current.contains(event.target as Node)) setShowDestDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOrigins = POPULAR_LOCATIONS.filter(loc => loc.toLowerCase().includes(origin.toLowerCase()));
  const filteredDests = POPULAR_LOCATIONS.filter(loc => loc.toLowerCase().includes(destination.toLowerCase()));

  const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) setPassengers(val);
    else if (e.target.value === "") setPassengers(NaN);
  };

  const preventNonNumeric = (e: React.KeyboardEvent) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
  };

  const handlePassengerBlur = () => {
      if (isNaN(passengers) || passengers < 1) setPassengers(1);
  }

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const swapLocations = () => {
      const temp = origin;
      setOrigin(destination);
      setDestination(temp);
  };

  const faqs = [
    { q: "Bagaimana cara melakukan refund?", a: "Refund dapat dilakukan maksimal 24 jam sebelum keberangkatan melalui menu 'Cek Pesanan'. Pilih tiket, klik 'Ajukan Refund', dan dana akan kembali dalam 3-14 hari kerja." },
    { q: "Apakah bisa ganti jadwal (reschedule)?", a: "Bisa, reschedule tergantung kebijakan masing-masing PO Bus. Silakan cek detail tiket pada menu Pesanan Saya. Biaya admin mungkin berlaku." },
    { q: "Apa itu kode booking?", a: "Kode booking adalah kode unik (misal: TRX-123) yang digunakan untuk menukarkan tiket di terminal atau check-in online." },
    { q: "Apakah perlu cetak tiket?", a: "Tidak perlu. Cukup tunjukkan QR Code pada E-Ticket di HP Anda kepada petugas di titik keberangkatan." },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">

      <nav className="flex items-center px-6 py-4 bg-white dark:bg-slate-900 text-blue-600 sticky top-0 z-50 shadow-sm border-b border-slate-100 dark:border-slate-800 transition-colors">
        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 italic hover:opacity-80 transition mr-8">
           SkyBus<span className="text-amber-500">.</span>
        </Link>
        <div className="ml-auto flex items-center gap-8">
            <div className="hidden md:flex space-x-6 text-sm font-bold text-slate-500 dark:text-slate-400">
              <Link href="/search" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cari Tiket</Link>
              <Link href="/mitra" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Mitra Operator</Link>
              <Link href="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Bantuan</Link>
            </div>
            <div className="flex space-x-3">
              <Link href="/login">
                <button className="px-5 py-2 text-blue-600 dark:text-blue-400 font-bold text-sm rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 transition">Masuk</button>
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2 bg-blue-600 text-white text-sm rounded-full font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200 dark:shadow-none">Daftar</button>
              </Link>
            </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-600 to-blue-900 px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="text-white space-y-6 relative z-10 pt-10 md:pt-16">
          <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-sm border border-white/20">
            #1 Partner Perjalanan Anda
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            JELAJAHI <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">INDONESIA</span>
          </h1>
          <p className="opacity-90 max-w-md leading-relaxed text-lg font-medium text-blue-50">
            Pesan tiket bus online dengan jaminan harga transparan, jadwal real-time, dan ulasan foto asli.
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

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl shadow-blue-900/20 dark:shadow-black/50 max-w-md w-full ml-auto relative z-10 transition-colors border border-transparent dark:border-slate-800">
          <div className="flex border-b border-slate-100 dark:border-slate-700 mb-6">
            <button onClick={() => setTripType('one-way')} className={`flex-1 pb-3 border-b-2 font-bold text-sm transition ${tripType === 'one-way' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>Sekali Jalan</button>
            <button onClick={() => setTripType('round-trip')} className={`flex-1 pb-3 border-b-2 font-bold text-sm transition ${tripType === 'round-trip' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>Pulang Pergi</button>
          </div>

          <div className="flex flex-col gap-0">
            <div className="relative mb-2" ref={originRef}>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center px-4 py-3 group focus-within:ring-2 focus-within:ring-blue-600/20 transition">
                  <MapPin className="w-5 h-5 text-slate-400 mr-3 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400" />
                  <div className="w-full">
                     <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Dari Mana?</label>
                     <input type="text" placeholder="Ketik kota asal..." className="w-full outline-none text-sm font-bold bg-transparent text-slate-800 dark:text-white placeholder:font-normal" value={origin} onChange={(e) => { setOrigin(e.target.value); setShowOriginDropdown(true); }} onFocus={() => setShowOriginDropdown(true)} />
                  </div>
                </div>
                {showOriginDropdown && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl mt-1 z-20 max-h-60 overflow-y-auto">
                        {filteredOrigins.length > 0 ? filteredOrigins.map((loc, idx) => (
                            <div key={idx} className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0" onClick={() => { setOrigin(loc); setShowOriginDropdown(false); }}>{loc}</div>
                        )) : (<div className="px-4 py-3 text-xs text-slate-400">Lokasi tidak ditemukan</div>)}
                    </div>
                )}
            </div>

            <div className="relative h-0 z-20 flex justify-center items-center">
                <button
                    onClick={swapLocations}
                    className="bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 rounded-full p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition transform hover:rotate-180 active:scale-95"
                    title="Tukar Lokasi"
                >
                    <ArrowUpDown className="w-4 h-4" />
                </button>
            </div>

            <div className="relative mt-2 mb-4" ref={destRef}>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center px-4 py-3 relative group focus-within:ring-2 focus-within:ring-blue-600/20 transition">
                  <MapPin className="w-5 h-5 text-slate-400 mr-3 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400" />
                  <div className="w-full">
                     <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Mau Ke Mana?</label>
                     <input type="text" placeholder="Ketik kota tujuan..." className="w-full outline-none text-sm font-bold bg-transparent text-slate-800 dark:text-white placeholder:font-normal" value={destination} onChange={(e) => { setDestination(e.target.value); setShowDestDropdown(true); }} onFocus={() => setShowDestDropdown(true)} />
                  </div>
                </div>
                {showDestDropdown && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl mt-1 z-20 max-h-60 overflow-y-auto">
                        {filteredDests.length > 0 ? filteredDests.map((loc, idx) => (
                            <div key={idx} className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0" onClick={() => { setDestination(loc); setShowDestDropdown(false); }}>{loc}</div>
                        )) : (<div className="px-4 py-3 text-xs text-slate-400">Lokasi tidak ditemukan</div>)}
                    </div>
                )}
            </div>

            <div className={`grid gap-4 mb-4 ${tripType === 'round-trip' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div className="flex gap-4 w-full">
                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 w-full">
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Pergi</label>
                        <input type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} className="w-full outline-none text-sm font-bold bg-transparent text-slate-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]" />
                    </div>
                    {tripType === 'round-trip' && (
                        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 w-full animate-in fade-in slide-in-from-left-4">
                            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Pulang</label>
                            <input type="date" className="w-full outline-none text-sm font-bold bg-transparent text-slate-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]" />
                        </div>
                    )}
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Kursi</label>
                    <input type="number" placeholder="1" min="1" onKeyDown={preventNonNumeric} value={isNaN(passengers) ? '' : passengers} onChange={handlePassengerChange} onBlur={handlePassengerBlur} className="w-full outline-none text-sm font-bold bg-transparent text-slate-800 dark:text-white" />
                </div>
            </div>

            <Link href={isFormValid ? "/search" : "#"} className={`block w-full pt-2 ${!isFormValid ? 'cursor-not-allowed opacity-50' : ''}`} onClick={!isFormValid ? (e) => e.preventDefault() : undefined}>
                <button disabled={!isFormValid} className="w-full bg-amber-500 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide hover:bg-amber-600 transition shadow-lg shadow-amber-500/30 flex justify-center items-center gap-2 disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-500">
                   {isFormValid ? 'CARI TIKET MURAH' : 'LENGKAPI DATA'}
                </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-10 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[
                    {icon: <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400"/>, title: "Jadwal Real-Time", desc: "Informasi jadwal bus terupdate & akurat"},
                    {icon: <Armchair className="w-8 h-8 text-blue-600 dark:text-blue-400"/>, title: "Pilih Kursi", desc: "Bebas pilih kursi idaman tanpa biaya"},
                    {icon: <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400"/>, title: "Pembayaran Aman", desc: "Jaminan transaksi 100% aman"},
                    {icon: <Ticket className="w-8 h-8 text-blue-600 dark:text-blue-400"/>, title: "E-Ticket Instan", desc: "Tiket terbit instan & bebas cetak"}
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 group">
                        <div className="bg-blue-50 dark:bg-slate-800 p-5 rounded-full group-hover:scale-110 transition duration-300 shadow-sm">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{item.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">Penawaran Spesial</span>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-4 mb-4">Diskon Tiket Bus</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                    Dapatkan potongan harga spesial untuk perjalanan pertama Anda. Tanpa syarat ribet, langsung potong harga!
                </p>
                <Link href="/promo" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-4 transition-all">
                    Lihat Semua Promo <ArrowRight className="w-4 h-4"/>
                </Link>
            </div>

            <div className="flex-none w-full md:w-[550px]">
                <div className="flex bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden relative border border-slate-200 dark:border-slate-800 group hover:-translate-y-2 transition duration-300">
                    <div className="flex-1 p-6 relative">
                        <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wide">Valid s.d. 31 Des 2026</div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Diskon Pengguna Baru</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Potongan 20% untuk transaksi pertama.</p>
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-slate-700">
                            <Ticket className="w-3 h-3"/> Tanpa Min. Transaksi
                        </div>
                        <div className="absolute -top-3 right-0 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full translate-x-3"></div>
                        <div className="absolute -bottom-3 right-0 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full translate-x-3"></div>
                    </div>
                    <div className="w-[1px] border-l-2 border-dashed border-slate-300 dark:border-slate-700 relative my-3"></div>
                    <div className="bg-blue-600 dark:bg-blue-600 text-white p-6 flex flex-col items-center justify-center min-w-[140px] text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                        <div className="relative z-10">
                            <div className="text-3xl font-black mb-1">20%</div>
                            <div className="text-[10px] font-bold uppercase opacity-80 mb-3 tracking-widest">OFF</div>
                            <button onClick={() => handleCopy(999, 'SKYNEW26')} className="bg-white/20 backdrop-blur-sm text-[10px] font-bold px-0 py-2 w-20 rounded hover:bg-white/30 transition uppercase tracking-wide border border-white/30 flex items-center justify-center gap-1">
                                {copiedId === 999 ? <Check className="w-4 h-4" /> : 'Salin'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mx-4 h-2 bg-slate-200 dark:bg-slate-800 rounded-b-xl mt-[-2px] mx-auto w-[90%]"></div>
            </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Rute Populer</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Destinasi favorit pelancong bulan ini</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {POPULAR_ROUTES.map((route, idx) => (
                    <Link href={`/search?from=${route.from}&to=${route.to}&pax=1`} key={idx} className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                        <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700 flex items-center justify-center relative overflow-hidden group-hover:bg-blue-100 dark:group-hover:bg-slate-600 transition duration-500">
                            <Map className="w-16 h-16 text-slate-400 dark:text-slate-500 group-hover:scale-110 group-hover:text-blue-500 transition duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                            <div className="text-[10px] font-bold text-amber-400 mb-1 tracking-wide uppercase bg-slate-900/50 backdrop-blur-sm inline-block px-2 py-0.5 rounded">{route.price}</div>
                            <h3 className="font-bold text-white text-sm leading-tight mt-1 drop-shadow-md">
                                {route.from} <ArrowRight className="w-3 h-3 inline mx-0.5 text-slate-300"/> {route.to}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">Partner Resmi Kami</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500">
                {PARTNERS.map((partner, i) => (
                    <span key={i} className="text-xl md:text-2xl font-black text-slate-400 hover:text-blue-600 dark:hover:text-white cursor-default transition select-none">{partner}</span>
                ))}
            </div>
         </div>
      </section>

      <section id="faq-section" className="py-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase">Pertanyaan Umum</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Punya pertanyaan? Cek di sini dulu.</p>
        </div>
        <div className="space-y-4">
            {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer" onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}>
                    <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                        <h3 className="font-bold text-sm text-slate-800 dark:text-white">{faq.q}</h3>
                        {faqOpenIndex === idx ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                    {faqOpenIndex === idx && (
                        <div className="p-6 pt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                            {faq.a}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800">
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/help">
            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-2 transition h-full group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-50 dark:bg-slate-800 w-32 h-32 rounded-full -mr-16 -mt-16 transition group-hover:scale-150 group-hover:bg-blue-100 dark:group-hover:bg-slate-700"></div>
              <div className="relative z-10">
                  <div className="mb-6 bg-blue-100 dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <MessageCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-slate-800 dark:text-white">Butuh Bantuan?</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">Tim Customer Service kami siap membantu kendala pemesanan Anda 24/7.</p>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider group-hover:underline">Hubungi Kami</span>
              </div>
            </div>
          </Link>

          <Link href="/guide">
            <div className="bg-blue-600 text-white p-8 border border-blue-600 rounded-3xl shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-2 transition h-full group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-white/10 w-32 h-32 rounded-full -mr-16 -mt-16 transition duration-500 group-hover:scale-150 group-hover:bg-white/20"></div>
              <div className="relative z-10">
                  <div className="mb-6 bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center text-white">
                      <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Cara Pesan Tiket</h3>
                  <p className="text-sm text-blue-100 leading-relaxed mb-4">Bingung cara pesan? Simak panduan lengkap langkah demi langkah di sini.</p>
                  <span className="text-xs font-bold text-white uppercase tracking-wider underline decoration-white/50 hover:decoration-white">Baca Panduan</span>
              </div>
            </div>
          </Link>

          <Link href="/mitra">
            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-2 transition h-full group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-50 dark:bg-slate-800 w-32 h-32 rounded-full -mr-16 -mt-16 transition group-hover:scale-150 group-hover:bg-amber-100 dark:group-hover:bg-slate-700"></div>
              <div className="relative z-10">
                  <div className="mb-6 bg-amber-100 dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-500">
                      <Bus className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-slate-800 dark:text-white">Mitra Operator</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">Cek daftar lengkap PO Bus partner kami beserta rute yang tersedia.</p>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider group-hover:underline">Lihat Mitra</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {copiedId !== null && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-xl flex items-center gap-2 z-50 text-sm font-bold">
                <Check className="w-4 h-4 text-green-400 dark:text-green-600" /> Kode berhasil disalin!
            </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

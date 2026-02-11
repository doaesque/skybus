"use client";

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft, Star, Bus, ChevronRight, Search, Filter,
  Car, SlidersHorizontal, X, Map, SortAsc
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ALL_PARTNERS } from '@/constants/data';

export default function MitraPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [category, setCategory] = useState<'All' | 'PO Bus' | 'Travel'>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [minRoutes, setMinRoutes] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'routes' | 'name'>('rating');

  const filteredPartners = useMemo(() => {
    let result = ALL_PARTNERS.filter(partner => {
      const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'All' || partner.type === category;
      const matchesRating = partner.rating >= minRating;
      const matchesRoutes = partner.routes >= minRoutes;

      return matchesSearch && matchesCategory && matchesRating && matchesRoutes;
    });

    return result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'routes') return b.routes - a.routes;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, category, minRating, minRoutes, sortBy]);

  const resetFilters = () => {
    setCategory('All');
    setMinRating(0);
    setMinRoutes(0);
    setSortBy('rating');
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors pb-20">

      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <button onClick={() => router.push('/')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-600 dark:text-slate-400">
            <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-black text-lg text-slate-800 dark:text-white">Mitra Resmi SkyBus</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="mb-8">
            <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">Jelajahi Operator</h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Temukan PO Bus dan layanan Travel terbaik dengan armada terlengkap untuk perjalanan Anda.
            </p>
        </div>

        <div className="flex gap-3 mb-6 sticky top-20 z-30">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Cari nama PO atau Travel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition font-medium"
                />
            </div>
            <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 rounded-2xl border transition shadow-sm flex items-center gap-2 font-bold text-sm ${showFilters ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'}`}
            >
                {showFilters ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
                <span className="hidden md:inline">Filter</span>
            </button>
        </div>

        {showFilters && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl mb-8 animate-in slide-in-from-top-4 fade-in duration-300">
                <div className="grid md:grid-cols-2 gap-8">

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tipe Armada</label>
                        <div className="flex gap-2">
                            {['All', 'PO Bus', 'Travel'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat as any)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${category === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
                                >
                                    {cat === 'All' ? 'Semua' : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Minimal Rating</label>
                        <div className="flex gap-2">
                            {[0, 4, 4.5, 4.8].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => setMinRating(rating)}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1 ${minRating === rating ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
                                >
                                    {rating === 0 ? 'Semua' : <>{rating}+ <Star className="w-3 h-3 fill-current"/></>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skala Operasi</label>
                        <div className="flex gap-2 overflow-x-auto">
                            {[0, 50, 100].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setMinRoutes(r)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition whitespace-nowrap ${minRoutes === r ? 'bg-green-600 text-white border-green-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
                                >
                                    {r === 0 ? 'Semua Ukuran' : `> ${r} Rute`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Urutkan</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="w-full px-4 py-2 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="rating">⭐ Rating Tertinggi</option>
                            <option value="routes">🚌 Rute Terbanyak</option>
                            <option value="name">🔤 Nama (A-Z)</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                        onClick={resetFilters}
                        className="text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition"
                    >
                        Reset Filter
                    </button>
                </div>
            </div>
        )}

        <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Menampilkan {filteredPartners.length} Mitra
            </span>
        </div>

        <div className="grid gap-4">
            {filteredPartners.length > 0 ? (
                filteredPartners.map((po) => (
                    <Link href={`/mitra/${po.id}`} key={po.id} className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-500 transition duration-300 flex items-center gap-5 relative overflow-hidden">

                        <div className="w-16 h-16 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center p-2 border border-slate-100 dark:border-slate-700">
                            {po.image.includes('placeholder') ? (
                                <span className="text-xs font-black text-slate-300 text-center uppercase leading-tight">{po.name.substring(0, 3)}</span>
                            ) : (
                                <img src={po.image} alt={po.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition duration-500" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="font-black text-lg text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition">{po.name}</h3>
                                {po.rating >= 4.8 && (
                                    <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" /> Top Rated
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    {po.type === 'PO Bus' ? <Bus className="w-4 h-4"/> : <Car className="w-4 h-4"/>}
                                    <span>{po.type}</span>
                                </div>
                                <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></div>
                                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {po.rating}
                                </div>
                                <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></div>
                                <div className="flex items-center gap-1.5">
                                    <Map className="w-4 h-4" /> {po.routes} Rute
                                </div>
                            </div>
                        </div>

                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </Link>
                ))
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                    <div className="inline-block p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                        <Filter className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tidak ditemukan</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-4">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
                    <button
                        onClick={resetFilters}
                        className="text-sm font-bold text-blue-600 hover:underline"
                    >
                        Hapus Semua Filter
                    </button>
                </div>
            )}
        </div>

        <div className="mt-16 bg-linear-to-br from-slate-900 to-slate-800 dark:from-blue-900 dark:to-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10 text-center md:text-left">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2 block">Kemitraan</span>
                <h3 className="text-2xl md:text-3xl font-black mb-3">Pemilik Armada Bus?</h3>
                <p className="opacity-80 text-slate-300 max-w-lg text-sm leading-relaxed">
                    Bergabunglah dengan ekosistem transportasi modern. Kelola tiket, jadwal, dan pendapatan dalam satu dashboard terintegrasi.
                </p>
            </div>
            <Link href="/mitra/register" className="relative z-10 shrink-0">
                <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide hover:bg-blue-500 transition shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1">
                    Daftar Sekarang
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

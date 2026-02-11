"use client";

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Filter, ArrowRight, Star, Clock, Wifi, Zap, Armchair, ChevronDown, ChevronUp, Camera, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import { BUS_DATA, ALL_PARTNERS } from '@/constants/data'; // Import ALL_PARTNERS

export default function TicketPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Terhemat');

  // Filter & Sort Logic
  const sortedBusData = useMemo(() => {
    let data = [...BUS_DATA];
    if (selectedFilter === 'Terhemat') {
      data.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'Tercepat') {
      // Logic sort durasi sederhana (mock)
      data.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    } else if (selectedFilter === 'Berangkat Pagi') {
      data.sort((a, b) => parseInt(a.departureTime.replace('.', '')) - parseInt(b.departureTime.replace('.', '')));
    }
    return data;
  }, [selectedFilter]);

  // Helper untuk mendapatkan review dari ALL_PARTNERS
  const getPartnerReviews = (operatorName: string) => {
    const partner = ALL_PARTNERS.find(p => p.name === operatorName);
    return partner ? partner.reviews : [];
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Header Pencarian */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2 font-black text-lg">
              Jakarta <ArrowRight className="w-4 h-4 text-slate-400" /> Bandung
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Sen, 10 Feb • 1 Penumpang
            </div>
          </div>
        </div>

        {/* Filter Bar Horizontal */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <SlidersHorizontal className="w-3 h-3" /> Filter
          </button>
          {['Terhemat', 'Tercepat', 'Berangkat Pagi', 'Rating Tinggi'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition ${selectedFilter === filter ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Modal (Mobile Style) */}
      {showFilter && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-3/4 max-w-sm bg-white dark:bg-slate-900 h-full p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-xl">Filter</h3>
              <button onClick={() => setShowFilter(false)}><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            {/* Isi Filter Detail (Mockup) */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-sm mb-3">Waktu Keberangkatan</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 rounded-xl border text-xs font-bold text-center hover:bg-blue-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700">Pagi (00-12)</button>
                  <button className="p-3 rounded-xl border text-xs font-bold text-center hover:bg-blue-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700">Siang (12-18)</button>
                  <button className="p-3 rounded-xl border text-xs font-bold text-center hover:bg-blue-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700">Malam (18-24)</button>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-3">Kelas Armada</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-blue-600" /> Executive</label>
                  <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-blue-600" /> Sleeper</label>
                  <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-blue-600" /> Business</label>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <button onClick={() => setShowFilter(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Terapkan</button>
            </div>
          </div>
        </div>
      )}

      {/* List Tiket */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {sortedBusData.map((bus) => {
          // Ambil review dari ALL_PARTNERS berdasarkan nama operator
          const reviews = getPartnerReviews(bus.operator);
          const hasPhotoReview = reviews.some(r => r.images && r.images.length > 0);

          return (
            <div key={bus.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group">
              {/* Header Tiket */}
              <div className="p-5 pb-4 border-b border-dashed border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-lg text-slate-900 dark:text-white">{bus.name}</h3>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <span className="font-bold text-slate-500">{bus.type}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <div className="flex items-center text-amber-500 font-bold text-xs">
                        <Star className="w-3 h-3 fill-current mr-1" /> {bus.rating}
                        <span className="text-slate-400 font-normal ml-1">({bus.totalReviews})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Per Kursi</span>
                    <span className="text-xl font-black text-blue-600 dark:text-blue-400">Rp {bus.price.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Jadwal */}
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                  <div className="text-center">
                    <span className="text-xl font-black text-slate-800 dark:text-white">{bus.departureTime}</span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mt-1">Berangkat</span>
                  </div>
                  <div className="flex-1 px-4 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 mb-1">{bus.duration}</span>
                    <div className="w-full h-0.5 bg-slate-300 dark:bg-slate-600 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-400 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-black text-slate-800 dark:text-white">{bus.arrivalTime}</span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mt-1">Tiba</span>
                  </div>
                </div>
              </div>

              {/* Fasilitas & Lokasi */}
              <div className="p-5 pt-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {bus.fromDetail}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {bus.toDetail}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bus.facilities.slice(0, 3).map((fac, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded font-bold">
                      {fac}
                    </span>
                  ))}
                  {bus.facilities.length > 3 && (
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded font-bold">
                      +{bus.facilities.length - 3} Lainnya
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {/* FITUR UNGGULAN: REVIEW FOTO ASLI (Diperbaiki) */}
                  {hasPhotoReview ? (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 border border-green-200 dark:border-green-800 cursor-pointer hover:bg-green-200 dark:hover:bg-green-900/50 transition">
                      <Camera className="w-3 h-3" /> Ada Foto Asli
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">
                      Tiket Terlaris
                    </span>
                  )}

                  <Link href="/booking">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-200 dark:shadow-none">
                      Pilih
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

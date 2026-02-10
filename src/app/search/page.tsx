"use client";

import React, { useState } from 'react';
import { Filter, ArrowRightLeft, Bus, Star, ChevronDown, MapPin, Camera, Clock } from 'lucide-react';
import Link from 'next/link';
import { BUS_DATA } from '@/constants/data';
import { motion } from 'framer-motion';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      
      {/* --- TOP HEADER --- */}
      <div className="bg-primary text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 font-black text-lg">
              Jakarta <ArrowRightLeft className="w-4 h-4 opacity-70" /> Bandung
            </div>
            <div className="text-xs font-medium opacity-90 mt-1 flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Senin, 20 Okt 2024 &bull; 1 Penumpang
            </div>
          </div>
          <button className="w-full md:w-auto px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-lg hover:bg-white/30 transition uppercase border border-white/30">
            Ubah Pencarian
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* --- SIDEBAR FILTERS --- */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4 text-primary" /> Filter
              </h3>
              <button className="text-xs text-primary font-bold hover:underline">Reset</button>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Waktu</h4>
                    <div className="flex gap-2">
                        <button className="flex-1 py-2 border rounded text-xs font-bold hover:border-primary hover:text-primary transition">Pagi</button>
                        <button className="flex-1 py-2 border rounded text-xs font-bold hover:border-primary hover:text-primary transition">Malam</button>
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Fasilitas</h4>
                    {['Bisa Refund', 'Foto Asli', 'USB Port', 'Toilet'].map(f => (
                        <label key={f} className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
                            <input type="checkbox" className="rounded text-primary focus:ring-primary" /> {f}
                        </label>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT (BUS LIST) --- */}
        <div className="lg:col-span-3 space-y-4">
          
          {BUS_DATA.map((bus) => (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={bus.id} 
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:border-primary/50 transition group"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-800">{bus.name}</h3>
                  <div className="text-xs text-slate-500 font-medium mb-2">{bus.operator}</div>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-accent/10 text-accent text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-accent" /> {bus.rating}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">({bus.totalReviews} Ulasan)</span>
                    
                    {/* FITUR UNGGULAN: REVIEW FOTO ASLI (Survey Insight) */}
                    {bus.reviews.length > 0 && bus.reviews[0].images.length > 0 && (
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 border border-green-200 cursor-pointer hover:bg-green-200">
                           <Camera className="w-3 h-3" /> Ada Foto Asli
                        </span>
                    )}
                  </div>
                </div>

                <div className="text-right mt-4 md:mt-0">
                  <div className="text-xl font-black text-primary">
                    Rp {bus.price.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-slate-400 mb-2">/pax</div>
                  <Link href="/booking">
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wide hover:bg-primary-dark transition shadow-lg shadow-blue-200 active:scale-95">
                      Pilih Kursi
                    </button>
                  </Link>
                </div>
              </div>

              {/* Rute Visual */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                <div className="text-center w-16">
                  <div className="text-sm font-black text-slate-800">{bus.departureTime}</div>
                  <div className="text-[10px] text-slate-500 uppercase">JKT</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                   <div className="text-[10px] text-slate-400 mb-1">{bus.duration}</div>
                   <div className="w-full h-[2px] bg-slate-200 relative">
                      <div className="absolute top-1/2 left-0 w-2 h-2 bg-slate-300 rounded-full -translate-y-1/2"></div>
                      <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2"></div>
                   </div>
                </div>
                <div className="text-center w-16">
                  <div className="text-sm font-black text-slate-800">{bus.arrivalTime}</div>
                  <div className="text-[10px] text-slate-500 uppercase">BDG</div>
                </div>
              </div>

              {/* Fasilitas & Info Detail */}
              <div className="flex justify-between items-center border-t pt-3">
                 <div className="flex gap-2">
                    {bus.facilities.slice(0, 3).map(f => (
                        <span key={f} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {f}
                        </span>
                    ))}
                    <span className="text-[10px] text-slate-400 px-2 py-1">+2 Lainnya</span>
                 </div>
                 <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                    Lihat Detail <ChevronDown className="w-3 h-3" />
                 </button>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}
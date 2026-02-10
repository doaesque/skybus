import React from 'react';
import { Filter, ArrowRightLeft, Bus, Star, ChevronDown, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-slate-800 pb-20">
      
      {/* --- TOP HEADER (SEARCH SUMMARY) --- */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-slate-700">
              Asal <ArrowRightLeft className="w-4 h-4 text-slate-400" /> Tujuan
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Senin, 20 Okt 2024 | 1 Penumpang
            </div>
          </div>
          <button className="w-full md:w-auto px-6 py-2 bg-slate-600 text-white text-sm font-bold rounded hover:bg-slate-700 transition uppercase">
            Ubah Pencarian
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- SIDEBAR FILTERS --- */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filter
              </h3>
              <button className="text-xs text-blue-600 font-bold hover:underline">Reset</button>
            </div>

            {/* Accordion 1: Fasilitas */}
            <details className="group mb-4" open>
              <summary className="flex justify-between items-center font-bold text-sm cursor-pointer list-none py-2 border-b">
                <span>Fasilitas</span>
                <ChevronDown className="w-4 h-4 transition group-open:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2 text-sm text-slate-600 pl-2">
                {['AC', 'Porta USB', 'Sandaran Kaki', 'Bagasi', 'Tempat Istirahat', 'Air Minum', 'Toilet'].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-slate-600 focus:ring-slate-500" />
                    {item}
                  </label>
                ))}
              </div>
            </details>

            {/* Accordion 2: Tipe Bus */}
            <details className="group">
              <summary className="flex justify-between items-center font-bold text-sm cursor-pointer list-none py-2 border-b">
                <span>Tipe Bus</span>
                <ChevronDown className="w-4 h-4 transition group-open:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2 text-sm text-slate-600 pl-2">
                {['Executive', 'Super Executive', 'Sleeper', 'Economy'].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-slate-600 focus:ring-slate-500" />
                    {item}
                  </label>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* --- MAIN CONTENT (BUS LIST) --- */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Card Item */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                
                {/* Bus Info */}
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-slate-800">Nama Bus</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-slate-700" /> 4.9/5
                    </span>
                    <span className="text-xs text-slate-400">• Executive Class</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">Rp 245.000<span className="text-sm font-normal text-slate-500">/kursi</span></div>
                  <Link href="/booking">
                    <button className="mt-2 bg-slate-500 text-white px-8 py-2 rounded font-bold text-sm hover:bg-slate-600 transition w-full md:w-auto">
                      PILIH
                    </button>
                  </Link>
                </div>
              </div>

              {/* Schedule Route */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mb-6 border-t border-b py-4 bg-slate-50/50 rounded px-2">
                <div className="text-center md:text-left">
                  <div className="text-lg font-bold text-slate-800">22.00</div>
                  <div className="text-xs text-slate-500">Dipatiukur</div>
                </div>
                
                <div className="flex-1 flex items-center gap-2 w-full justify-center">
                   <div className="-h[2px] w-full bg-slate-300 relative flex items-center justify-center">
                      <Bus className="w-4 h-4 text-slate-400 bg-white px-1 absolute" />
                   </div>
                   <div className="text-xs text-slate-400 whitespace-nowrap font-medium">4j 5m</div>
                </div>

                <div className="text-center md:text-right">
                  <div className="text-lg font-bold text-slate-800">02.05</div>
                  <div className="text-xs text-slate-500">Hotel Tujuan</div>
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="flex gap-6 text-sm font-bold text-slate-500 border-t pt-4">
                <button className="hover:text-slate-800 transition">Fitur</button>
                <button className="hover:text-slate-800 transition">Rute</button>
                <button className="hover:text-slate-800 transition">Rating & Review</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
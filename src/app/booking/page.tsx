import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-200 text-slate-800 py-10 px-4">
      
      {/* HEADER TITLE */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold uppercase text-slate-800">Pemesanan Anda</h1>
        <p className="text-slate-500">Isi data diri penumpang</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN (FORMS) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION: DATA PEMESAN */}
          <div>
            <h2 className="text-xl font-black uppercase mb-4 tracking-wide text-slate-800">Data Pemesan</h2>
            <div className="bg-white rounded-lg shadow-sm p-6 relative">
              <button className="absolute top-4 right-6 text-xs font-bold text-slate-800 uppercase tracking-wider hover:text-slate-600">Simpan</button>
              
              <div className="space-y-4 mt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Titel <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-slate-100 border-none rounded p-2.5 text-sm appearance-none outline-none focus:ring-2 focus:ring-slate-300">
                      <option>Tuan</option>
                      <option>Nyonya</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full bg-slate-100 rounded p-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300" />
                  <p className="text-[10px] text-slate-400 mt-1">Sesuai KTP/paspor/SIM (tanpa tanda baca atau gelar)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">No. Handphone <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                       <div className="bg-slate-100 rounded p-2.5 flex items-center gap-1 w-24">
                          <img src="https://flagcdn.com/w20/id.png" width="20" alt="ID" />
                          <span className="text-sm text-slate-600">+62</span>
                       </div>
                       <input type="tel" className="w-full bg-slate-100 rounded p-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Contoh: +62812345678</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Email <span className="text-red-500">*</span></label>
                    <input type="email" className="w-full bg-slate-100 rounded p-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300" placeholder="email@gmail.com" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: DATA TRAVELER */}
          <div>
            <h2 className="text-xl font-black uppercase mb-4 tracking-wide text-slate-800">Data Traveler</h2>
            <div className="bg-white rounded-lg shadow-sm p-6 relative">
              <button className="absolute top-4 right-6 text-xs font-bold text-slate-800 uppercase tracking-wider hover:text-slate-600">Simpan</button>
              
              <div className="space-y-4 mt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Titel <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-slate-100 border-none rounded p-2.5 text-sm appearance-none outline-none focus:ring-2 focus:ring-slate-300">
                      <option>Tuan</option>
                      <option>Nyonya</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full bg-slate-100 rounded p-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300" />
                  <p className="text-[10px] text-slate-400 mt-1">Sesuai KTP/paspor/SIM (tanpa tanda baca atau gelar)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-slate-500 text-white font-bold uppercase tracking-wider py-3 px-10 rounded shadow-lg hover:bg-slate-600 transition">
              Lanjutkan
            </button>
          </div>

        </div>

        {/* --- RIGHT COLUMN (SUMMARY CARD) --- */}
        <div className="lg:col-span-1">
          <div className="bg-gray-300 rounded-lg p-6 sticky top-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-700">Asal <span className="text-slate-500">→</span> Tujuan</h3>
                <p className="text-xs text-slate-500 font-medium">Tanggal Berangkat</p>
              </div>
              <ChevronUp className="w-5 h-5 text-slate-500" />
            </div>

            <div className="space-y-1 mb-6">
              <div className="text-sm font-bold text-slate-800">Nama Bus</div>
              <div className="text-xs text-slate-500">Tipe Bus Executive</div>
            </div>
            
            <div className="h-64 border-t border-slate-400/30"></div> {/* Spacer for visual like design */}
          </div>
        </div>

      </div>
    </div>
  );
}
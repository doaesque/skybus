import React from 'react';
import { Bus, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function MyOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Pesanan Saya</h1>
        
        <div className="space-y-4">
          {/* Order Card 1 (Active) */}
          <Link href="/eticket" className="block">
            <div className="bg-white border rounded-lg p-6 hover:shadow-md transition cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-bl-lg">LUNAS</div>
                
                <div className="flex gap-4 items-center">
                    <div className="bg-slate-100 p-3 rounded-full">
                        <Bus className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">Jakarta - Bandung</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" /> Senin, 20 Okt 2024
                        </p>
                    </div>
                </div>
            </div>
          </Link>

          {/* Order Card 2 (Past) */}
          <div className="bg-white border rounded-lg p-6 opacity-60 grayscale">
             <div className="absolute top-0 right-0 bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 rounded-bl-lg">SELESAI</div>
              <div className="flex gap-4 items-center">
                  <div className="bg-slate-100 p-3 rounded-full">
                      <Bus className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                      <h3 className="font-bold text-slate-800">Bandung - Jakarta</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" /> 10 Sep 2024
                      </p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
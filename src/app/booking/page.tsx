"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BUS_DATA } from '@/constants/data';
import { ArrowLeft, User, Armchair, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const busId = searchParams.get('busId');
  const paxCount = parseInt(searchParams.get('pax') || '1');
  const pricePerSeat = parseInt(searchParams.get('price') || '0');
  
  const bus = BUS_DATA.find(b => b.id === busId);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Dummy occupied seats (randomize for demo)
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching occupied seats randomly
    if(bus) {
        const randomOccupied = [];
        const totalSeats = 40; // Max seats assumption
        for(let i=0; i<8; i++) { // Randomize 8 occupied seats
            const seatNum = Math.floor(Math.random() * totalSeats) + 1;
            randomOccupied.push(seatNum.toString() + "A"); // Simplified random logic
            randomOccupied.push(seatNum.toString() + "B");
        }
        setOccupiedSeats(randomOccupied);
    }
  }, [busId, bus]);

  if (!bus) return <div className="p-10 text-center">Data bus tidak ditemukan. <Link href="/ticket" className="text-blue-600 underline">Kembali</Link></div>;

  const handleSeatClick = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
        setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
        if (selectedSeats.length < paxCount) {
            setSelectedSeats([...selectedSeats, seatId]);
        } else {
            alert(`Anda hanya memesan untuk ${paxCount} penumpang. Hapus salah satu kursi jika ingin mengganti.`);
        }
    }
  };

  const handleProceed = () => {
      if(selectedSeats.length !== paxCount) {
          alert(`Mohon pilih ${paxCount} kursi sesuai jumlah penumpang.`);
          return;
      }
      
      const totalPrice = selectedSeats.length * (pricePerSeat || bus.price);
      
      // Pass data to payment page
      const params = new URLSearchParams(searchParams.toString());
      params.set("seats", selectedSeats.join(","));
      params.set("totalPrice", totalPrice.toString());
      
      router.push(`/payment?${params.toString()}`);
  };

  // --- Seat Map Renderer (Dynamic Layout) ---
  const renderSeatMap = () => {
      const layout = bus.seatLayout || "2-2"; // Default 2-2
      const rows = layout === "shuttle" ? 4 : 10; // Shuttle lebih sedikit baris

      const renderSeat = (seatNum: string) => {
          const isSelected = selectedSeats.includes(seatNum);
          const isOccupied = occupiedSeats.includes(seatNum);
          
          return (
              <button
                key={seatNum}
                disabled={isOccupied}
                onClick={() => handleSeatClick(seatNum)}
                className={`w-10 h-10 rounded-lg m-1 flex items-center justify-center text-xs font-bold transition border
                    ${isOccupied ? 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-200' : 
                      isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' : 
                      'bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-blue-600'}
                `}
              >
                  {isSelected ? <CheckCircle className="w-4 h-4" /> : seatNum}
              </button>
          );
      };

      let seatStructure = [];

      for (let i = 1; i <= rows; i++) {
          if (layout === "2-2") {
              // Executive Bus
              seatStructure.push(
                  <div key={i} className="flex justify-between items-center mb-2 w-full max-w-[300px] mx-auto">
                      <div className="flex gap-1">{renderSeat(`${i}A`)}{renderSeat(`${i}B`)}</div>
                      <div className="w-8 text-center text-[10px] text-slate-300">{i}</div> {/* Aisle number */}
                      <div className="flex gap-1">{renderSeat(`${i}C`)}{renderSeat(`${i}D`)}</div>
                  </div>
              );
          } else if (layout === "1-1" || layout === "sleeper") {
              // Sleeper Class
              seatStructure.push(
                  <div key={i} className="flex justify-between items-center mb-4 w-full max-w-[200px] mx-auto">
                      {renderSeat(`${i}A`)}
                      <div className="w-8 flex items-center justify-center text-[10px] text-slate-300">Lorong</div>
                      {renderSeat(`${i}B`)}
                  </div>
              );
          } else if (layout === "2-3") {
               // Economy Bus
               seatStructure.push(
                  <div key={i} className="flex justify-between items-center mb-2 w-full max-w-[350px] mx-auto">
                      <div className="flex gap-1">{renderSeat(`${i}A`)}{renderSeat(`${i}B`)}</div>
                      <div className="w-6"></div>
                      <div className="flex gap-1">{renderSeat(`${i}C`)}{renderSeat(`${i}D`)}{renderSeat(`${i}E`)}</div>
                  </div>
              );
          } else if (layout === "shuttle") {
               // Shuttle / Hiace (1-2 configuration mostly)
               seatStructure.push(
                  <div key={i} className="flex justify-between items-center mb-2 w-full max-w-[200px] mx-auto">
                      {renderSeat(`${i}A`)}
                      <div className="w-4"></div>
                      <div className="flex gap-1">{renderSeat(`${i}B`)}{renderSeat(`${i}C`)}</div>
                  </div>
              );
          }
      }

      return (
          <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-full h-10 bg-slate-300 dark:bg-slate-700 rounded-lg mb-8 flex items-center justify-center shadow-inner">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bagian Depan (Supir)</span>
              </div>
              <div className="overflow-x-auto">
                {seatStructure}
              </div>
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded mt-8 mx-auto w-1/2"></div> {/* Back of bus */}
          </div>
      );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 font-sans">
        {/* Left: Seat Selection */}
        <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/ticket" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition"><ArrowLeft className="w-5 h-5"/></Link>
                <div>
                    <h1 className="text-2xl font-black">Pilih Kursi</h1>
                    <p className="text-sm text-slate-500">Silakan pilih {paxCount} kursi untuk perjalanan Anda.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold flex items-center gap-2"><Armchair className="w-5 h-5 text-blue-600"/> {bus.name}</h3>
                    <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 uppercase">{bus.type} ({bus.seatLayout})</span>
                </div>
                
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-8 text-xs justify-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-white border-slate-300"></div> Tersedia</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-slate-200 border-slate-200"></div> Terisi</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-blue-600 border-blue-600 shadow-sm"></div> Pilihanmu</div>
                </div>

                {renderSeatMap()}
            </div>
        </div>

        {/* Right: Summary Card */}
        <div className="w-full md:w-96 shrink-0">
            <div className="sticky top-28 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-5">
                <h3 className="font-black text-lg border-b border-slate-100 dark:border-slate-800 pb-4">Ringkasan Pesanan</h3>
                
                <div className="space-y-4">
                    <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Armada</span>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{bus.name}</p>
                        <p className="text-xs text-slate-500">{bus.type} • {bus.duration}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Tanggal</span>
                            <p className="text-sm font-medium">{searchParams.get('date') ? new Date(searchParams.get('date')!).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : '-'}</p>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Penumpang</span>
                            <p className="text-sm font-medium">{paxCount} Orang</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Kursi Dipilih</span>
                        <p className="text-lg font-black text-blue-600 tracking-wide">
                            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-500">Harga Satuan</span>
                        <span className="text-sm font-medium">Rp {(pricePerSeat || bus.price).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">Total Bayar</span>
                        <span className="font-black text-blue-600">Rp {(selectedSeats.length * (pricePerSeat || bus.price)).toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <button 
                    onClick={handleProceed}
                    disabled={selectedSeats.length !== paxCount}
                    className={`w-full py-4 rounded-xl font-bold text-white transition shadow-xl transform active:scale-95 flex items-center justify-center gap-2
                        ${selectedSeats.length === paxCount ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200' : 'bg-slate-300 cursor-not-allowed'}
                    `}
                >
                    {selectedSeats.length === paxCount ? 'Lanjut ke Pembayaran' : `Pilih ${paxCount - selectedSeats.length} Kursi Lagi`}
                </button>
            </div>
        </div>
    </div>
  );
}

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
            <Suspense fallback={<div className="p-10 text-center font-bold text-slate-400">Memuat Data Booking...</div>}>
                <BookingContent />
            </Suspense>
        </div>
    );
}

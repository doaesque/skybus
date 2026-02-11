"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BUS_DATA } from '@/constants/data';
import { ArrowLeft, User, Armchair, CheckCircle, Info, X, Baby, Users } from 'lucide-react';
import Link from 'next/link';

// --- Components ---

const AlertModal = ({ isOpen, message, onClose, type = 'error' }: { isOpen: boolean; message: string; onClose: () => void; type?: 'error' | 'info' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${type === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
          {type === 'error' ? <X className="w-8 h-8" /> : <Info className="w-8 h-8" />}
        </div>
        <h3 className="text-lg font-black mb-2">{type === 'error' ? 'Oops!' : 'Info'}</h3>
        <p className="text-sm text-slate-500 mb-6">{message}</p>
        <button onClick={onClose} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold transition hover:opacity-90">
          Tutup
        </button>
      </div>
    </div>
  );
};

const PassengerForm = ({ index, isAdult, data, onChange }: { index: number, isAdult: boolean, data: any, onChange: (idx: number, field: string, val: string) => void }) => (
  <div className="mb-4 border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/50">
    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
      {isAdult ? <User className="w-4 h-4 text-blue-600"/> : <Baby className="w-4 h-4 text-pink-500"/>}
      {isAdult ? `Penumpang ${index + 1} (Dewasa)` : `Penumpang Bayi (Dibawah 2 th)`}
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nama Lengkap (Sesuai KTP)</label>
        <input 
          type="text" 
          value={data.name}
          onChange={(e) => onChange(index, 'name', e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="Contoh: Budi Santoso"
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nomor Identitas (NIK/Paspor)</label>
        <input 
          type="text" 
          value={data.idNumber}
          onChange={(e) => onChange(index, 'idNumber', e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="16 Digit NIK"
        />
      </div>
    </div>
  </div>
);

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const busId = searchParams.get('busId');
  const paxCount = parseInt(searchParams.get('pax') || '1');
  const pricePerSeat = parseInt(searchParams.get('price') || '0');
  
  const bus = BUS_DATA.find(b => b.id === busId);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  
  // Passenger Data State
  const [passengers, setPassengers] = useState<Array<{name: string, idNumber: string}>>([]);
  const [hasInfant, setHasInfant] = useState(false);
  
  // Modal State
  const [alertState, setAlertState] = useState({ isOpen: false, message: '', type: 'error' as 'error'|'info' });

  useEffect(() => {
    // Mock Occupied Seats
    if(bus) {
        const randomOccupied = [];
        const totalSeats = 40; 
        for(let i=0; i<8; i++) { 
            const seatNum = Math.floor(Math.random() * totalSeats) + 1;
            randomOccupied.push(seatNum.toString() + "A"); 
            randomOccupied.push(seatNum.toString() + "B");
        }
        setOccupiedSeats(randomOccupied);
    }

    // Initialize Passenger Forms
    // Mock Logged In User Data
    const mockUser = { name: "Serena", idNumber: "320428192830001" };
    
    const initialPassengers = Array(paxCount).fill({ name: '', idNumber: '' });
    // Autofill first passenger
    initialPassengers[0] = { ...mockUser };
    
    setPassengers(initialPassengers);

  }, [busId, bus, paxCount]);

  if (!bus) return <div className="p-10 text-center">Data bus tidak ditemukan. <Link href="/ticket" className="text-blue-600 underline">Kembali</Link></div>;

  const handleSeatClick = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
        setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
        if (selectedSeats.length < paxCount) {
            setSelectedSeats([...selectedSeats, seatId]);
        } else {
            setAlertState({
                isOpen: true, 
                message: `Anda hanya memesan untuk ${paxCount} penumpang. Hapus salah satu kursi jika ingin mengganti.`,
                type: 'info'
            });
        }
    }
  };

  const handlePassengerChange = (index: number, field: string, val: string) => {
    const newPassengers = [...passengers];
    // @ts-ignore
    newPassengers[index] = { ...newPassengers[index], [field]: val };
    setPassengers(newPassengers);
  };

  const handleProceed = () => {
      // 1. Validasi Kursi
      if(selectedSeats.length !== paxCount) {
          setAlertState({ isOpen: true, message: `Mohon pilih ${paxCount} kursi sesuai jumlah penumpang.`, type: 'error' });
          return;
      }

      // 2. Validasi Form Penumpang
      const isFormValid = passengers.every(p => p.name.trim() !== '' && p.idNumber.trim() !== '');
      if (!isFormValid) {
          setAlertState({ isOpen: true, message: 'Mohon lengkapi semua data penumpang.', type: 'error' });
          return;
      }
      
      const totalPrice = selectedSeats.length * (pricePerSeat || bus.price);
      
      // Pass data to payment
      const params = new URLSearchParams(searchParams.toString());
      params.set("seats", selectedSeats.join(","));
      params.set("totalPrice", totalPrice.toString());
      params.set("hasInfant", hasInfant ? 'true' : 'false');
      // In real app, passenger data would be stored in state management / DB
      
      router.push(`/payment?${params.toString()}`);
  };

  // --- Seat Map Renderer ---
  const renderSeatMap = () => {
      const layout = bus.seatLayout || "2-2";
      const rows = layout === "shuttle" ? 4 : 10;

      const renderSeat = (seatNum: string) => {
          const isSelected = selectedSeats.includes(seatNum);
          const isOccupied = occupiedSeats.includes(seatNum);
          
          return (
              <button
                key={seatNum}
                disabled={isOccupied}
                onClick={() => handleSeatClick(seatNum)}
                className={`w-10 h-10 rounded-lg m-1 flex items-center justify-center text-xs font-bold transition transform active:scale-90 border
                    ${isOccupied ? 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-200' : 
                      isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' : 
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
              seatStructure.push(
                  <div key={i} className="flex justify-between items-center mb-2 w-full max-w-[300px] mx-auto">
                      <div className="flex gap-1">{renderSeat(`${i}A`)}{renderSeat(`${i}B`)}</div>
                      <div className="w-8 text-center text-[10px] text-slate-300">{i}</div> 
                      <div className="flex gap-1">{renderSeat(`${i}C`)}{renderSeat(`${i}D`)}</div>
                  </div>
              );
          } else if (layout === "1-1" || layout === "sleeper") {
              seatStructure.push(
                  <div key={i} className="flex justify-between items-center mb-4 w-full max-w-[200px] mx-auto">
                      {renderSeat(`${i}A`)}
                      <div className="w-8 flex items-center justify-center text-[10px] text-slate-300">Lorong</div>
                      {renderSeat(`${i}B`)}
                  </div>
              );
          } else if (layout === "2-3") {
               seatStructure.push(
                  <div key={i} className="flex justify-between items-center mb-2 w-full max-w-[350px] mx-auto">
                      <div className="flex gap-1">{renderSeat(`${i}A`)}{renderSeat(`${i}B`)}</div>
                      <div className="w-6"></div>
                      <div className="flex gap-1">{renderSeat(`${i}C`)}{renderSeat(`${i}D`)}{renderSeat(`${i}E`)}</div>
                  </div>
              );
          } else if (layout === "shuttle") {
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
              <div className="overflow-x-auto">{seatStructure}</div>
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded mt-8 mx-auto w-1/2"></div> 
          </div>
      );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 font-sans">
        <AlertModal 
            isOpen={alertState.isOpen} 
            message={alertState.message} 
            onClose={() => setAlertState({...alertState, isOpen: false})} 
            type={alertState.type}
        />

        {/* Left: Seat & Form */}
        <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/ticket" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition"><ArrowLeft className="w-5 h-5"/></Link>
                <div>
                    <h1 className="text-2xl font-black">Pilih Kursi & Data</h1>
                    <p className="text-sm text-slate-500">Silakan pilih {paxCount} kursi untuk perjalanan Anda.</p>
                </div>
            </div>

            {/* SEAT SELECTION */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Armchair className="w-5 h-5 text-blue-600"/> Peta Kursi ({bus.seatLayout})</h3>
                <div className="flex flex-wrap gap-4 mb-8 text-xs justify-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-white border-slate-300"></div> Tersedia</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-slate-200 border-slate-200"></div> Terisi</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-blue-600 border-blue-600 shadow-sm"></div> Pilihanmu</div>
                </div>
                {renderSeatMap()}
            </div>

            {/* PASSENGER FORM (Shows after at least 1 seat selected or always show) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-sm animate-in slide-in-from-bottom-4">
                <h3 className="font-bold mb-6 flex items-center gap-2 text-lg"><Users className="w-5 h-5 text-blue-600"/> Data Penumpang</h3>
                
                {passengers.map((p, idx) => (
                    <PassengerForm key={idx} index={idx} isAdult={true} data={p} onChange={handlePassengerChange} />
                ))}

                {/* INFANT OPTION */}
                <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition ${hasInfant ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                            {hasInfant && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <input type="checkbox" className="hidden" checked={hasInfant} onChange={() => setHasInfant(!hasInfant)} />
                        <div className="flex-1">
                            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Bawa Bayi (Infant)</span>
                            <p className="text-xs text-slate-500 mt-1">Maksimal 1 bayi (usia &lt; 2 tahun) per penumpang dewasa. Bayi harus dipangku (tidak dapat kursi sendiri).</p>
                        </div>
                    </label>
                </div>
            </div>
        </div>

        {/* Right: Summary */}
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
                            <p className="text-sm font-medium">{paxCount} Orang {hasInfant && '+ 1 Bayi'}</p>
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

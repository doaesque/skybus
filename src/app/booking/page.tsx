"use client";

import React, { useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BUS_DATA } from '@/constants/data';
import { ArrowLeft, User, Armchair, CheckCircle, Info, X, Baby, Users, CalendarRange, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const AlertModal = ({ isOpen, message, onClose, type = 'error' }: { isOpen: boolean; message: string; onClose: () => void; type?: 'error' | 'info' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
        </button>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${type === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
          {type === 'error' ? <X className="w-8 h-8" /> : <Info className="w-8 h-8" />}
        </div>
        <h3 className="text-lg font-black mb-2 text-slate-800 dark:text-white">{type === 'error' ? 'Perhatian' : 'Info'}</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold transition hover:opacity-90">
          Mengerti
        </button>
      </div>
    </div>
  );
};

const ReservationTimerHeader = ({ duration, onExpire }: { duration: number; onExpire: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-lg border border-orange-100 dark:border-orange-900/50">
      <Clock className="w-4 h-4 text-orange-600" />
      <span className="text-xs font-bold text-orange-600 font-mono">{formatTime(timeLeft)}</span>
    </div>
  );
};

const PassengerForm = ({ index, data, onChange, isError }: { index: number, data: any, onChange: (idx: number, field: string, val: string) => void, isError: boolean }) => (
  <div className={`mb-4 border rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/50 transition ${isError ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-200 dark:border-slate-800'}`}>
    <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-800 dark:text-white">
      <User className="w-4 h-4 text-blue-600"/>
      {`Penumpang ${index + 1} (Dewasa)`}
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nama Lengkap (Sesuai KTP)</label>
        <input 
          type="text" 
          value={data.name}
          onChange={(e) => onChange(index, 'name', e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400"
          placeholder="Contoh: Budi Santoso"
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nomor Identitas (NIK/Paspor)</label>
        <input 
          type="text" 
          value={data.idNumber}
          maxLength={16}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            onChange(index, 'idNumber', val);
          }}
          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400"
          placeholder="Angka Saja (Min 16 digit)"
        />
      </div>
    </div>
  </div>
);

const InfantForm = ({ index, data, onChange, isError }: { index: number, data: any, onChange: (idx: number, field: string, val: string) => void, isError: boolean }) => (
  <div className={`mt-3 border rounded-xl p-4 bg-pink-50/50 dark:bg-pink-900/10 transition animate-in slide-in-from-top-2 ${isError ? 'border-red-500 ring-1 ring-red-200' : 'border-pink-200 dark:border-pink-900'}`}>
    <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-pink-600">
      <Baby className="w-4 h-4"/> Data Bayi {index + 1}
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nama Lengkap Bayi</label>
        <input 
          type="text" 
          value={data.name}
          onChange={(e) => onChange(index, 'name', e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none placeholder:text-slate-400"
          placeholder="Sesuai KK/KIA"
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Tanggal Lahir</label>
        <input 
          type="date" 
          value={data.dob}
          onChange={(e) => onChange(index, 'dob', e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none"
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
  const date = searchParams.get('date');
  const returnDate = searchParams.get('returnDate');
  const isRoundTrip = !!returnDate;
  
  const bus = BUS_DATA.find(b => b.id === busId);
  
  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const [passengers, setPassengers] = useState<Array<{name: string, idNumber: string}>>([]);
  const [infants, setInfants] = useState<Array<{name: string, dob: string}>>([]);
  const [infantCount, setInfantCount] = useState(0);

  const [formErrors, setFormErrors] = useState<number[]>([]); 
  const [infantErrors, setInfantErrors] = useState<number[]>([]);
  const [alertState, setAlertState] = useState({ isOpen: false, message: '', type: 'error' as 'error'|'info' });

  const occupiedSeats = useMemo(() => {
    if (!bus || !date) return [];
    const seedString = `${bus.id}-${date}`;
    let seed = 0;
    for (let i = 0; i < seedString.length; i++) {
      seed = ((seed << 5) - seed) + seedString.charCodeAt(i);
      seed |= 0;
    }
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    const generatedOccupied: string[] = []; 
    const totalSeats = 40; 
    const seatsToFill = Math.floor(random() * 8) + 8; 
    for(let i=0; i < seatsToFill; i++) { 
      const seatNum = Math.floor(random() * totalSeats) + 1;
      const suffix = random() > 0.5 ? 'A' : 'B';
      const seatCode = `${seatNum}${suffix}`;
      if (!generatedOccupied.includes(seatCode)) generatedOccupied.push(seatCode); 
    }
    return generatedOccupied;
  }, [bus, date]);

  useEffect(() => {
    const mockUser = { name: "Budi Santoso", idNumber: "320428192830001" };
    const initialPassengers = Array(paxCount).fill({ name: '', idNumber: '' });
    if(paxCount > 0) initialPassengers[0] = { ...mockUser };
    setPassengers(initialPassengers);
  }, [paxCount]);

  useEffect(() => {
    setInfants(prev => {
      const newInfants = [...prev];
      if (infantCount > prev.length) {
        for (let i = prev.length; i < infantCount; i++) newInfants.push({ name: '', dob: '' });
      } else {
        newInfants.splice(infantCount);
      }
      return newInfants;
    });
  }, [infantCount]);

  if (!bus) return <div className="p-10 text-center">Data bus tidak ditemukan. <Link href="/ticket" className="text-blue-600 underline">Kembali</Link></div>;

  const handleSeatClick = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length < paxCount) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        setAlertState({ isOpen: true, message: `Anda hanya memesan untuk ${paxCount} penumpang.`, type: 'info' });
      }
    }
  };

  const handlePassengerChange = (index: number, field: string, val: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: val } as any;
    setPassengers(newPassengers);
    if (formErrors.includes(index)) setFormErrors(formErrors.filter(i => i !== index));
  };

  const handleInfantChange = (index: number, field: string, val: string) => {
    const newInfants = [...infants];
    newInfants[index] = { ...newInfants[index], [field]: val } as any;
    setInfants(newInfants);
    if (infantErrors.includes(index)) setInfantErrors(infantErrors.filter(i => i !== index));
  };

  const handleNextStep = () => {
    if(selectedSeats.length !== paxCount) {
      setAlertState({ isOpen: true, message: `Mohon pilih ${paxCount} kursi di peta.`, type: 'error' });
      return;
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleReservationExpire = useCallback(() => {
    setAlertState({ isOpen: true, message: 'Waktu reservasi habis! Kursi telah dilepas kembali.', type: 'error' });
    setStep(1);
    setSelectedSeats([]);
  }, []);

  const handleProceedPayment = () => {
    const pErrors: number[] = [];
    passengers.forEach((p, idx) => {
      if (!p.name.trim() || !p.idNumber.trim()) pErrors.push(idx);
    });
    
    const iErrors: number[] = [];
    infants.forEach((i, idx) => {
      if (!i.name.trim() || !i.dob.trim()) iErrors.push(idx);
    });

    if (pErrors.length > 0 || iErrors.length > 0) {
      setFormErrors(pErrors);
      setInfantErrors(iErrors);
      setAlertState({ isOpen: true, message: 'Mohon lengkapi semua data penumpang.', type: 'error' });
      return;
    }
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("seats", selectedSeats.join(","));
    params.set("hasInfant", infantCount > 0 ? 'true' : 'false');
    if (returnDate) params.set("returnDate", returnDate);
    
    router.push(`/payment?${params.toString()}`);
  };

  const basePrice = pricePerSeat || bus.price;
  const returnPrice = isRoundTrip ? basePrice : 0;
  const totalPerTrip = selectedSeats.length * basePrice;
  const totalReturn = selectedSeats.length * returnPrice;
  const grandTotal = totalPerTrip + totalReturn;

  const renderSeatMap = () => {
    const layout = bus.seatLayout || "2-2";
    const rows = layout === "shuttle" ? 3 : 10; 
    let mapWidth = "max-w-[300px]"; 
    if (layout === "2-3") mapWidth = "max-w-[350px]";
    if (layout === "1-1" || layout === "sleeper" || layout === "shuttle") mapWidth = "max-w-[240px]";

    const renderSeat = (seatNum: string) => {
      const isSelected = selectedSeats.includes(seatNum);
      const isOccupied = occupiedSeats.includes(seatNum);
      return (
        <button
          key={seatNum}
          disabled={isOccupied}
          onClick={() => handleSeatClick(seatNum)}
          className={`w-10 h-10 rounded-lg m-1 flex items-center justify-center text-xs font-bold transition transform active:scale-90 border
            ${isOccupied ? 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-200 dark:bg-slate-700 dark:border-slate-700' : 
              isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' : 
              'bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-blue-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}
          `}
        >
          {isSelected ? <CheckCircle className="w-4 h-4" /> : seatNum}
        </button>
      );
    };

    let seatStructure = [];
    const startRow = layout === "shuttle" ? 2 : 1;
    for (let i = startRow; i <= (layout === "shuttle" ? rows + 1 : rows); i++) {
      if (layout === "2-2") {
        seatStructure.push(
          <div key={i} className={`flex justify-between items-center mb-2 w-full ${mapWidth} mx-auto`}>
            <div className="flex gap-1">{renderSeat(`${i}A`)}{renderSeat(`${i}B`)}</div>
            <div className="w-8 text-center text-[10px] text-slate-300">{i}</div> 
            <div className="flex gap-1">{renderSeat(`${i}C`)}{renderSeat(`${i}D`)}</div>
          </div>
        );
      } else if (layout === "2-3") {
        seatStructure.push(
          <div key={i} className={`flex justify-between items-center mb-2 w-full ${mapWidth} mx-auto`}>
            <div className="flex gap-1">{renderSeat(`${i}A`)}{renderSeat(`${i}B`)}</div>
            <div className="w-6"></div>
            <div className="flex gap-1">{renderSeat(`${i}C`)}{renderSeat(`${i}D`)}{renderSeat(`${i}E`)}</div>
          </div>
        );
      } else {
        seatStructure.push(
          <div key={i} className={`flex justify-between items-center mb-3 w-full ${mapWidth} mx-auto`}>
            {renderSeat(`${i}A`)}
            <div className="w-8"></div> 
            {renderSeat(`${i}B`)}
          </div>
        );
      }
    }

    return (
      <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className={`mx-auto bg-slate-300 dark:bg-slate-700 rounded-lg mb-8 p-3 shadow-inner flex justify-between items-center px-4 ${mapWidth}`}>
          <div className="w-10"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">DEPAN</span>
            <div className="w-12 h-1 bg-slate-400/30 rounded-full mt-1"></div>
          </div>
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase border border-slate-400 dark:border-slate-500 px-2 py-1 rounded bg-slate-200 dark:bg-slate-600">SUPIR</span>
        </div>
        <div className="overflow-x-auto pb-4">{seatStructure}</div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      <AlertModal 
        isOpen={alertState.isOpen} 
        message={alertState.message} 
        onClose={() => setAlertState({...alertState, isOpen: false})} 
        type={alertState.type}
      />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => step === 2 ? setStep(1) : router.back()} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition">
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <div>
            <h1 className="text-2xl font-black leading-tight text-slate-800 dark:text-white">
              {step === 1 ? 'Pilih Kursi' : 'Data Penumpang'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-slate-500">Langkah {step} dari 3</p>
                {step === 2 && (
                    <ReservationTimerHeader duration={300} onExpire={handleReservationExpire} />
                )}
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex gap-2">
          <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
          <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
          <div className={`h-2 w-12 rounded-full bg-slate-200 dark:bg-slate-700`}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          
          {step === 1 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in slide-in-from-left">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Armchair className="w-5 h-5 text-blue-600"/> Peta Kursi ({bus.seatLayout})</h3>
              <div className="flex flex-wrap gap-4 mb-8 text-xs justify-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-600"></div> Tersedia</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-slate-200 border-slate-200 dark:bg-slate-700 dark:border-slate-700"></div> Terisi</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border bg-blue-600 border-blue-600 shadow-sm"></div> Pilihanmu</div>
              </div>
              {renderSeatMap()}
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right">
              
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold mb-6 flex items-center gap-2 text-lg border-b pb-4 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white">
                  <Users className="w-5 h-5 text-blue-600"/> Lengkapi Data Penumpang
                </h3>
                
                {passengers.map((p, idx) => (
                  <PassengerForm key={idx} index={idx} data={p} onChange={handlePassengerChange} isError={formErrors.includes(idx)}/>
                ))}
                
                <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                        <Baby className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Bawa Bayi (Infant)?</h4>
                        <p className="text-[10px] text-slate-500">Maks. 1 bayi per penumpang dewasa.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                      <button 
                        onClick={() => infantCount > 0 && setInfantCount(infantCount - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm hover:bg-slate-100 text-slate-800 dark:text-white"
                      >-</button>
                      <span className="font-bold text-sm w-4 text-center text-slate-800 dark:text-white">{infantCount}</span>
                      <button 
                        onClick={() => infantCount < paxCount && setInfantCount(infantCount + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm hover:bg-slate-100 text-slate-800 dark:text-white"
                      >+</button>
                    </div>
                  </div>

                  {infantCount > 0 && (
                    <div className="space-y-3">
                      {infants.map((inf, idx) => (
                        <InfantForm key={idx} index={idx} data={inf} onChange={handleInfantChange} isError={infantErrors.includes(idx)} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-96 shrink-0">
          <div className="sticky top-24 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-5">
            <h3 className="font-black text-lg border-b border-slate-100 dark:border-slate-800 pb-4 text-slate-800 dark:text-white">Ringkasan Pesanan</h3>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Armada</span>
                <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{bus.name}</p>
                <p className="text-xs text-slate-500">{bus.type} • {bus.duration}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Berangkat</span>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{date ? new Date(date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'}) : '-'}</p>
                </div>
                {isRoundTrip && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Pulang</span>
                    <p className="text-sm font-medium text-blue-600">{new Date(returnDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Kursi Dipilih</span>
                <p className="text-lg font-black text-blue-600 tracking-wide">{selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}</p>
              </div>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
              <div className="flex justify-between items-center text-sm text-slate-800 dark:text-slate-300">
                <span className="text-slate-500">Tiket ({selectedSeats.length}x)</span>
                <span className="font-medium">Rp {totalPerTrip.toLocaleString('id-ID')}</span>
              </div>
              {isRoundTrip && (
                <div className="flex justify-between items-center text-sm text-blue-600">
                  <span className="flex items-center gap-1"><CalendarRange className="w-3 h-3"/> Pulang ({selectedSeats.length}x)</span>
                  <span className="font-bold">Rp {totalReturn.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-white">Total Bayar</span>
                <span className="font-black text-blue-600">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {step === 1 ? (
              <button 
                onClick={handleNextStep}
                className={`w-full py-4 rounded-xl font-bold text-white transition shadow-lg flex items-center justify-center gap-2 transform active:scale-95
                  ${selectedSeats.length === paxCount ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 dark:shadow-none' : 'bg-slate-300 cursor-not-allowed'}
                `}
              >
                Lanjut Isi Data <ChevronRight className="w-4 h-4"/>
              </button>
            ) : (
              <button 
                onClick={handleProceedPayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 dark:shadow-none transition flex items-center justify-center gap-2 transform active:scale-95"
              >
                Lanjut Pembayaran
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

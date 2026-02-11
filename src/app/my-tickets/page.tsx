"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BUS_DATA } from '@/constants/data';
import { MapPin, Calendar, ChevronRight, Ticket, Home, Star, X, CheckCircle } from 'lucide-react';

// --- MODAL RATING ---
const RatingModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (rating: number, review: string) => void }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <X className="w-5 h-5 text-slate-400" />
        </button>
        
        <h3 className="text-xl font-black mb-1 text-center">Beri Penilaian</h3>
        <p className="text-slate-500 text-xs text-center mb-6">Bagaimana pengalaman perjalananmu?</p>

        {/* Star Input */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
              className="transition transform hover:scale-110 focus:outline-none"
            >
              <Star 
                className={`w-8 h-8 ${star <= (hover || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
              />
            </button>
          ))}
        </div>

        {/* Review Text */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tulis ulasan Anda di sini (opsional)..."
          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-600 outline-none mb-4 resize-none h-24"
        />

        <button 
          onClick={() => onSubmit(rating, review)}
          disabled={rating === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition shadow-lg"
        >
          Kirim Penilaian
        </button>
      </div>
    </div>
  );
};

export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  
  // State untuk Modal Rating
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Dummy Data Riwayat (Sekarang pakai State agar bisa di-update visualnya)
  const [myTickets, setMyTickets] = useState([
    { id: 'SKY-8821', busId: '1', date: '2026-02-12', status: 'active', seats: '3A, 3B', isRated: false },
    { id: 'SKY-1029', busId: '4', date: '2026-01-20', status: 'completed', seats: '1A', isRated: false }, // Belum dinilai
    { id: 'SKY-0092', busId: '3', date: '2025-12-15', status: 'completed', seats: '12C', isRated: true },  // Sudah dinilai
  ]);

  const filteredTickets = myTickets.filter(t => activeTab === 'active' ? t.status === 'active' : t.status === 'completed');

  // Handle Buka Modal
  const openRating = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setShowRatingModal(true);
  };

  // Handle Submit Rating
  const handleSubmitRating = (rating: number, review: string) => {
    // Update state lokal untuk menandai tiket sudah dinilai
    setMyTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicketId ? { ...ticket, isRated: true } : ticket
    ));
    
    setShowRatingModal(false);
    // Di sini bisa tambahkan logika API call ke backend
    // alert(`Terima kasih! Rating: ${rating}, Review: ${review}`); 
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-24">
      
      {/* Modal Component */}
      <RatingModal 
        isOpen={showRatingModal} 
        onClose={() => setShowRatingModal(false)} 
        onSubmit={handleSubmitRating} 
      />

      <div className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-black text-slate-800 dark:text-white">Tiket Saya</h1>
          </div>
          {/* Tabs */}
          <div className="flex max-w-3xl mx-auto px-4">
              <button 
                onClick={() => setActiveTab('active')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
              >
                  Tiket Aktif
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
              >
                  Riwayat
              </button>
          </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {filteredTickets.length === 0 ? (
              <div className="text-center py-20">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Ticket className="w-8 h-8"/>
                  </div>
                  <h3 className="font-bold text-lg">Belum ada tiket</h3>
                  <p className="text-slate-500 text-sm mb-6">Yuk rencanakan perjalananmu sekarang!</p>
                  <Link href="/ticket">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition">Cari Tiket Bus</button>
                  </Link>
              </div>
          ) : (
              filteredTickets.map((ticket) => {
                  const bus = BUS_DATA.find(b => b.id === ticket.busId) || BUS_DATA[0];
                  return (
                      <div key={ticket.id} className="relative group">
                        <Link href={`/eticket?busId=${ticket.busId}&date=${ticket.date}&seats=${ticket.seats}&source=history`} className="block">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-300 transition shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded mb-2 inline-block uppercase tracking-wider">{ticket.id}</span>
                                        <h3 className="font-bold text-lg">{bus.name}</h3>
                                        <p className="text-xs text-slate-500">{bus.type}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${ticket.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {ticket.status === 'active' ? 'Akan Berangkat' : 'Selesai'}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm mb-4">
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-400">Jadwal</p>
                                        <p className="font-bold">{new Date(ticket.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})} • {bus.departureTime}</p>
                                    </div>
                                    <div className="flex-1 border-l pl-4 border-slate-100 dark:border-slate-800">
                                        <p className="text-xs text-slate-400">Kursi</p>
                                        <p className="font-bold">{ticket.seats}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                            <span className="text-xs font-medium truncate">{bus.from}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                            <span className="text-xs font-medium truncate">{bus.to}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                                </div>
                            </div>
                        </Link>

                        {/* TOMBOL BERI NILAI (Hanya di tab history & belum dinilai) */}
                        {activeTab === 'history' && (
                            <div className="mt-3 flex justify-end">
                                {!ticket.isRated ? (
                                    <button 
                                        onClick={(e) => { e.preventDefault(); openRating(ticket.id); }}
                                        className="text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-lg transition flex items-center gap-1"
                                    >
                                        <Star className="w-3 h-3" /> Beri Nilai
                                    </button>
                                ) : (
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-default">
                                        <CheckCircle className="w-3 h-3" /> Sudah Dinilai
                                    </span>
                                )}
                            </div>
                        )}
                      </div>
                  );
              })
          )}
      </div>

      {/* TOMBOL KEMBALI KE BERANDA (Fixed Bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-20">
          <div className="max-w-3xl mx-auto">
            <Link href="/">
                <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3.5 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" /> Kembali ke Beranda
                </button>
            </Link>
          </div>
      </div>

    </div>
  );
}

"use client";

import React, { useState, useRef } from 'react';
import {
  ArrowLeft, Calendar, Clock, Star, Ticket, Search,
  CheckCircle, X, Camera, Trash2, Armchair
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MyTicketsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [searchQuery, setSearchQuery] = useState("");

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [reviewedIds, setReviewedIds] = useState<number[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const tickets = [
    {
      id: 1,
      status: 'active',
      bookingCode: 'SKY-8829301',
      busName: 'Sinar Jaya Suite',
      date: '10 Feb 2026',
      time: '07:00',
      origin: 'Jakarta',
      originDetail: 'Terminal Pulo Gebang',
      destination: 'Yogyakarta',
      destinationDetail: 'Terminal Giwangan',
      price: 'Rp 350.000',
      seat: '1A',
      isPaid: true
    },
    {
      id: 2,
      status: 'history',
      bookingCode: 'SKY-7721002',
      busName: 'Rosalia Indah VIP',
      date: '15 Jan 2026',
      time: '08:30',
      origin: 'Bandung',
      originDetail: 'Pool Pasteur',
      destination: 'Semarang',
      destinationDetail: 'Terminal Terboyo',
      price: 'Rp 180.000',
      seat: '12B',
      isPaid: true,
      hasReviewed: false
    },
    {
      id: 3,
      status: 'history',
      bookingCode: 'SKY-5510293',
      busName: 'X-Trans Shuttle',
      date: '02 Jan 2026',
      time: '14:00',
      origin: 'Jakarta',
      originDetail: 'Hotel Kartika Chandra',
      destination: 'Bandung',
      destinationDetail: 'De Batara',
      price: 'Rp 110.000',
      seat: '5',
      isPaid: true,
      hasReviewed: true
    }
  ];

  const filteredTickets = tickets.filter(t => {
    const matchesTab = t.status === activeTab;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      t.busName.toLowerCase().includes(query) ||
      t.bookingCode.toLowerCase().includes(query) ||
      t.origin.toLowerCase().includes(query) ||
      t.destination.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  const handleOpenReview = (id: number) => {
    setSelectedTicket(id);
    setRating(0);
    setReviewText("");
    setReviewImages([]);
    setShowReviewModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setReviewImages([...reviewImages, imageUrl]);
    }
  };

  const removeImage = (index: number) => {
    setReviewImages(reviewImages.filter((_, i) => i !== index));
  };

  const submitReview = () => {
    if (selectedTicket !== null) {
      setReviewedIds([...reviewedIds, selectedTicket]);
    }
    setShowReviewModal(false);
    setTimeout(() => setShowSuccessModal(true), 300);
  };

  const handleBookAgain = (origin: string, destination: string) => {
    const params = new URLSearchParams({
      origin: origin,
      destination: destination,
      date: new Date().toISOString().split('T')[0]
    });
    router.push(`/ticket?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors pb-20 relative">

      {showSuccessModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800">
            <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Ulasan Terkirim!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Terima kasih telah membagikan pengalaman Anda. Ulasan Anda sangat membantu pengguna lain.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-slate-200 transition shadow-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md md:rounded-3xl rounded-t-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-black text-lg">Tulis Ulasan</h3>
              <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <p className="text-sm text-slate-500 mb-3 font-medium">Bagaimana pengalaman perjalananmu?</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 transition transform hover:scale-110 focus:outline-none"
                  >
                    <Star className={`w-8 h-8 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ceritakan Pengalamanmu</label>
                <textarea
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none h-32"
                  placeholder="Busnya nyaman, AC dingin, supir ramah..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Foto (Opsional)</label>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 shrink-0 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 transition"
                  >
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-bold">Upload</span>
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

                  {reviewImages.map((img, idx) => (
                    <div key={idx} className="w-20 h-20 shrink-0 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
                      <Image src={img} alt="Preview" fill className="object-cover" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={submitReview}
              disabled={rating === 0}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed transition shadow-lg shadow-blue-200 dark:shadow-none"
            >
              Kirim Ulasan
            </button>
          </div>
        </div>
      )}

      {/* HEADER BARU - KONSISTEN DENGAN HALAMAN LAIN */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Tiket Saya</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* SEARCH BAR DIPINDAH KE KONTEN */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Cari tiket, tujuan, atau kode booking..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition ${activeTab === 'active' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
          >
            Sedang Aktif
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition ${activeTab === 'history' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
          >
            Riwayat
          </button>
        </div>

        {filteredTickets.length > 0 ? (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition group">

                <div className="bg-slate-50 dark:bg-slate-800/50 px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{ticket.date}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{ticket.time} WIB</span>
                   </div>
                   <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${ticket.isPaid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {ticket.isPaid ? 'Lunas' : 'Menunggu Bayar'}
                   </span>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-lg text-slate-800 dark:text-white">{ticket.busName}</h3>
                    <p className="font-black text-blue-600">{ticket.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5">
                      <Armchair className="w-3 h-3" />
                      {ticket.seat}
                    </div>
                  </div>

                  <div className="relative border-l-2 border-dashed border-slate-300 dark:border-slate-700 ml-1.5 space-y-6 my-2 pl-6">
                    <div className="relative">
                      <div className="absolute -left-7.75 top-1 w-3.5 h-3.5 rounded-full bg-slate-200 dark:bg-slate-600 border-2 border-white dark:border-slate-900"></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-0.5">Dari</p>
                        <p className="font-bold text-sm text-slate-800 dark:text-white leading-tight">{ticket.origin}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{ticket.originDetail}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-7.75 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900"></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-0.5">Ke</p>
                        <p className="font-bold text-sm text-slate-800 dark:text-white leading-tight">{ticket.destination}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{ticket.destinationDetail}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50">
                  {ticket.status === 'active' ? (
                    <>
                       <Link href={`/eticket?id=${ticket.bookingCode}`} className="flex-1">
                          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none">
                              <Ticket className="w-4 h-4" /> Lihat E-Ticket
                          </button>
                       </Link>
                       <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                           Reschedule
                       </button>
                    </>
                  ) : (
                    <>
                      {(!ticket.hasReviewed && !reviewedIds.includes(ticket.id)) ? (
                        <button
                          onClick={() => handleOpenReview(ticket.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                        >
                            <Star className="w-4 h-4" /> Beri Nilai
                        </button>
                      ) : (
                        <div className="flex-1 flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-2.5 rounded-xl font-bold text-xs border border-green-100 dark:border-green-800 cursor-default">
                            <CheckCircle className="w-4 h-4" /> Ulasan Terkirim
                        </div>
                      )}

                      <button
                        onClick={() => handleBookAgain(ticket.origin, ticket.destination)}
                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none"
                      >
                          Pesan Lagi
                      </button>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-10 h-10 text-slate-300" />
             </div>
             <h3 className="font-bold text-slate-800 dark:text-white mb-2">Belum ada tiket</h3>
             <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">Kamu belum memiliki tiket yang cocok dengan pencarian ini.</p>
             <Link href="/ticket">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition">
                    Cari Tiket Sekarang
                </button>
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}

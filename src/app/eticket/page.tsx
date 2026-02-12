"use client";

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BUS_DATA } from '@/constants/data';
import { CheckCircle, Download, Share2, Bus, Star, X, Home, Send, MessageSquare, Ticket, Loader2, Camera, Check } from 'lucide-react'; // Added Check
import Link from 'next/link';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ETicketContent() {
  const searchParams = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);
  
  // Ambil params dari URL
  const busIdParam = searchParams.get('busId');
  const seatsParam = searchParams.get('seats');
  const dateParam = searchParams.get('date');
  const statusParam = searchParams.get('status'); 
  const sourceParam = searchParams.get('source');

  // State Data Tiket
  const [ticketData, setTicketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State Interaksi
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // --- LOGIKA PERSISTENSI DATA ---
  useEffect(() => {
    const loadTicket = () => {
        const busStaticData = BUS_DATA.find(b => b.id === busIdParam) || BUS_DATA[0];

        const currentTicket = {
            id: `T-${Date.now()}`, 
            bookingCode: `SKY-${Math.floor(Math.random() * 8999) + 1000}`,
            busId: busIdParam,
            seats: seatsParam,
            date: dateParam,
            busName: busStaticData.name,
            from: busStaticData.from,
            to: busStaticData.to,
            departureTime: busStaticData.departureTime,
            arrivalTime: busStaticData.arrivalTime,
            duration: busStaticData.duration,
            operator: busStaticData.operator,
            fromDetail: busStaticData.fromDetail,
            price: busStaticData.price,
            status: statusParam || 'active', 
            createdAt: new Date().toISOString()
        };

        if (statusParam === 'success' && busIdParam) {
            const storedTickets = localStorage.getItem('skybus_tickets');
            const tickets = storedTickets ? JSON.parse(storedTickets) : [];
            
            const isDuplicate = tickets.some((t: any) => 
                t.busId === currentTicket.busId && 
                t.seats === currentTicket.seats && 
                t.date === currentTicket.date
            );

            if (!isDuplicate) {
                const newTickets = [currentTicket, ...tickets];
                localStorage.setItem('skybus_tickets', JSON.stringify(newTickets));
            }
            setTicketData(currentTicket);
        } else if (!busIdParam) {
             const storedTickets = localStorage.getItem('skybus_tickets');
             if(storedTickets) {
                 const tickets = JSON.parse(storedTickets);
                 if(tickets.length > 0) setTicketData(tickets[0]);
             }
        } else {
            setTicketData(currentTicket);
        }
        
        setLoading(false);
    };

    loadTicket();
  }, [busIdParam, seatsParam, dateParam, statusParam]);

  // --- HANDLER UPLOAD GAMBAR ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              if (ev.target?.result) {
                  setReviewImages(prev => [...prev, ev.target!.result as string]);
              }
          };
          reader.readAsDataURL(e.target.files[0]);
      }
  };

  // --- FITUR DOWNLOAD PDF ---
  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        const canvas = await html2canvas(ticketRef.current, {
            scale: 2, 
            useCORS: true, 
            backgroundColor: '#ffffff',
            allowTaint: true,
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`E-Ticket-SkyBus-${ticketData?.bookingCode}.pdf`);
    } catch (error) {
        console.error("Gagal generate PDF", error);
        alert("Gagal mengunduh tiket. Coba lagi di Desktop.");
    } finally {
        setIsDownloading(false);
    }
  };

  const handleShare = async () => {
      setIsSharing(true);
      const shareData = {
          title: 'E-Tiket SkyBus',
          text: `Lihat tiket perjalanan saya naik ${ticketData?.busName}.`,
          url: window.location.href
      };

      try {
          if (navigator.share) {
              await navigator.share(shareData);
          } else {
              await navigator.clipboard.writeText(window.location.href);
              // Tidak ada alert, icon berubah jadi Check
          }
      } catch (err) {
          console.log("Share dibatalkan");
      } finally {
          setTimeout(() => setIsSharing(false), 2000);
      }
  };

  const backLink = sourceParam === 'payment' ? '/' : '/my-tickets';

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600"/></div>;
  if (!ticketData) return <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center"><X className="w-12 h-12 text-slate-300 mb-2"/><p className="font-bold text-slate-500">Data tiket tidak ditemukan.</p><Link href="/" className="mt-4 text-blue-600 font-bold underline">Kembali ke Beranda</Link></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 transition-colors">
      
      {/* HEADER (Sticky Top) */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <h1 className="font-black text-lg text-slate-800 dark:text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-blue-600" /> E-Tiket
        </h1>
        <Link href={backLink} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-600 dark:text-slate-400">
            {sourceParam === 'payment' ? <Home className="w-6 h-6" /> : <X className="w-6 h-6" />}
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        
        {/* Notifikasi Sukses */}
        {statusParam === 'success' && (
            <div className="text-center mb-8 animate-in slide-in-from-top-4 fade-in duration-700">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm animate-in zoom-in">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white mb-1">Transaksi Berhasil!</h2>
                <p className="text-slate-500 text-sm">Tiket telah disimpan ke menu "Tiket Saya".</p>
            </div>
        )}

        {/* E-Ticket Card (Ref untuk PDF) */}
        <div className="mb-8" id="eticket-card">
            <div ref={ticketRef} className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative transform transition">
                {/* Top Section */}
                <div className="bg-blue-600 p-6 text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em] mb-1">Boarding Pass</h2>
                        <h1 className="text-3xl font-black italic">SKYBUS<span className="text-amber-400">.</span></h1>
                    </div>
                    <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                {/* Ticket Details */}
                <div className="p-6 relative bg-white dark:bg-slate-900">
                    <div className="absolute -left-4 top-0 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full z-10"></div>
                    <div className="absolute -right-4 top-0 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full z-10"></div>

                    <div className="flex justify-between items-center mb-6 mt-2">
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Booking Code</p>
                            <p className="text-xl font-mono font-black text-slate-800 dark:text-white tracking-widest">{ticketData.bookingCode}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tanggal</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-white">{ticketData.date ? new Date(ticketData.date).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}) : '-'}</p>
                        </div>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-4 mb-6 bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="flex-1">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Dari</p>
                            <p className="font-bold text-lg leading-tight text-slate-800 dark:text-white">{ticketData.from}</p>
                            <p className="text-[10px] text-slate-500 truncate">{ticketData.departureTime} WIB</p>
                        </div>
                        <div className="flex flex-col items-center px-2">
                            <Bus className="w-5 h-5 text-blue-600 mb-1" />
                            <div className="w-16 h-[2px] bg-slate-200 dark:bg-slate-600 relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-slate-400 rounded-full"></div>
                            </div>
                            <p className="text-[9px] text-slate-400 mt-1 font-bold">{ticketData.duration}</p>
                        </div>
                        <div className="flex-1 text-right">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Ke</p>
                            <p className="font-bold text-lg leading-tight text-slate-800 dark:text-white">{ticketData.to}</p>
                            <p className="text-[10px] text-slate-500 truncate">{ticketData.arrivalTime} WIB</p>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Operator</p>
                            <span className="text-sm font-bold truncate block">{ticketData.busName}</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Nomor Kursi</p>
                            <span className="text-lg font-black text-blue-600">{ticketData.seats}</span>
                        </div>
                    </div>

                    {/* QR Code Area */}
                    <div className="flex flex-col items-center justify-center border-t border-dashed border-slate-200 dark:border-slate-800 pt-8">
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                            <QRCode value={`SKYBUS-${ticketData.bookingCode}`} size={120} />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-4 text-center font-medium">Tunjukkan QR Code ini kepada petugas<br/>saat check-in di {ticketData.fromDetail}.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- REVIEW SECTION --- */}
        {(ticketData.status === 'success' || ticketData.status === 'active') && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
                {!isReviewSubmitted ? (
                    <>
                        <div className="text-center mb-6">
                            <h3 className="font-bold text-lg mb-2">Bagaimana Pengalaman Anda?</h3>
                            <p className="text-xs text-slate-500">Beri rating untuk operator {ticketData.operator}</p>
                        </div>
                        
                        <div className="flex justify-center gap-3 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="transition transform hover:scale-110 active:scale-95 focus:outline-none"
                                >
                                    <Star 
                                        className={`w-8 h-8 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="relative mb-4">
                            <textarea 
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Ceritakan pengalaman perjalanan Anda..."
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 min-h-[100px] resize-none"
                            ></textarea>
                        </div>

                        <div className="mb-6">
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {reviewImages.map((img, idx) => (
                                    <div key={idx} className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                        <img src={img} alt="Review" className="object-cover w-full h-full" />
                                        <button onClick={() => setReviewImages(reviewImages.filter((_, i) => i !== idx))} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl"><X className="w-3 h-3"/></button>
                                    </div>
                                ))}
                                <label className="w-16 h-16 shrink-0 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-400">
                                    <Camera className="w-5 h-5 mb-1" />
                                    <span className="text-[8px] font-bold">FOTO</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        </div>

                        <button 
                            onClick={() => setIsReviewSubmitted(true)}
                            disabled={rating === 0}
                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" /> Kirim Ulasan
                        </button>
                    </>
                ) : (
                    <div className="text-center py-6 animate-in zoom-in duration-300">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">Terima Kasih!</h3>
                        <p className="text-xs text-slate-500">Ulasan Anda membantu kami menjadi lebih baik.</p>
                    </div>
                )}
            </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3.5 rounded-xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition disabled:opacity-70"
            >
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4" />} 
                {isDownloading ? 'Menyimpan...' : 'Simpan PDF'}
            </button>
            <button 
                onClick={handleShare}
                disabled={isSharing}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3.5 rounded-xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition"
            >
                {isSharing ? <Check className="w-4 h-4"/> : <Share2 className="w-4 h-4" />} 
                Bagikan
            </button>
        </div>

      </div>
    </div>
  );
}

export default function ETicketPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
            <Suspense fallback={<div className="p-10 text-center">Memuat Tiket...</div>}>
                <ETicketContent />
            </Suspense>
        </div>
    );
}

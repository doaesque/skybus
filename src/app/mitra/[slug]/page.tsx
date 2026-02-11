"use client";

import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, Star, Bus, MapPin, ShieldCheck, Clock, 
  Info, FileText, Image as ImageIcon, CheckCircle, 
  XCircle, PlayCircle, Phone, Mail, Building2, Map as MapIcon, X, ChevronRight, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ALL_PARTNERS, POPULAR_ROUTES } from '@/constants/data';

export default function MitraDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [partner, setPartner] = useState<typeof ALL_PARTNERS[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews' | 'policies'>('info');
  
  // Gallery Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Review Filter State
  const [reviewFilter, setReviewFilter] = useState<'All' | 'With Photo' | '5 Star' | '4 Star' | '3 Star'>('All');

  useEffect(() => {
    if (params.slug) {
        const found = ALL_PARTNERS.find(p => p.id === params.slug);
        if (found) setPartner(found);
    }
  }, [params.slug]);

  if (!partner && params.slug) return <div className="p-10 text-center font-bold text-slate-400">Memuat Data Mitra...</div>;
  if (!partner) return null;

  // --- HELPER FUNCTIONS ---

  // 1. Censor Name Logic: Keep First & Last, Asterisk Middle
  const censorName = (name: string) => {
      const parts = name.split(' ');
      return parts.map(part => {
          if (part.length <= 2) return part;
          const first = part[0];
          const last = part[part.length - 1];
          const middle = '*'.repeat(part.length - 2);
          return `${first}${middle}${last}`;
      }).join(' ');
  };

  // 2. Render Markdown-like Description
  const renderDescription = (text: string) => {
      return text.split('\n').map((str, index) => {
          if (str.startsWith('### ')) {
              return <h3 key={index} className="font-black text-lg mt-6 mb-3 text-slate-900 dark:text-white">{str.replace('### ', '')}</h3>;
          }
          if (str.startsWith('- ')) {
              return (
                  <div key={index} className="flex gap-3 mb-2 pl-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ 
                          __html: str.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white">$1</strong>') 
                      }} />
                  </div>
              );
          }
          if (str.trim() === '') return <br key={index} />;
          
          return (
              <p key={index} className="mb-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ 
                  __html: str.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white">$1</strong>') 
              }} />
          );
      });
  };

  // 3. Filter Reviews
  const filteredReviews = partner.reviews ? partner.reviews.filter(r => {
      if (reviewFilter === 'All') return true;
      if (reviewFilter === 'With Photo') return r.images && r.images.length > 0;
      if (reviewFilter === '5 Star') return r.rating === 5;
      if (reviewFilter === '4 Star') return r.rating === 4;
      if (reviewFilter === '3 Star') return r.rating <= 3;
      return true;
  }) : [];

  // 4. Lightbox Navigation
  const handleNextImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (lightboxIndex !== null && partner.gallery) {
          setLightboxIndex((lightboxIndex + 1) % partner.gallery.length);
      }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (lightboxIndex !== null && partner.gallery) {
          setLightboxIndex((lightboxIndex - 1 + partner.gallery.length) % partner.gallery.length);
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors pb-32">
      
      {/* --- LIGHTBOX MODAL --- */}
      {lightboxIndex !== null && partner.gallery && (
          <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setLightboxIndex(null)}>
              <button className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition z-20">
                  <X className="w-8 h-8" />
              </button>
              
              {/* Nav Buttons */}
              <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition z-20">
                  <ChevronLeft className="w-8 h-8" />
              </button>
              <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition z-20">
                  <ChevronRight className="w-8 h-8" />
              </button>

              <div className="relative max-w-5xl w-full flex flex-col items-center">
                  {partner.gallery[lightboxIndex].type === 'video' ? (
                      <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center border border-white/10">
                          <PlayCircle className="w-20 h-20 text-white/50" />
                          <p className="absolute bottom-4 text-white/50 text-sm">Video Playback Placeholder</p>
                      </div>
                  ) : (
                      <img 
                        src={partner.gallery[lightboxIndex].src} 
                        alt="Gallery Preview" 
                        className="max-h-[80vh] max-w-full rounded-lg shadow-2xl object-contain" 
                      />
                  )}
                  <p className="text-white mt-4 font-medium text-lg">{partner.gallery[lightboxIndex].title}</p>
                  <p className="text-white/50 text-sm">{lightboxIndex + 1} / {partner.gallery.length}</p>
              </div>
          </div>
      )}

      {/* HEADER (MATCHING /ABOUT STYLE) */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <button onClick={() => router.push('/mitra')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-600 dark:text-slate-400">
            <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-black text-lg text-slate-800 dark:text-white">Profil Mitra</h1>
      </div>

      {/* HEADER BANNER */}
      <div className="relative h-64 bg-slate-900 overflow-hidden group">
          <div className="absolute inset-0 opacity-60 bg-[url('/img/hero-bus.jpg')] bg-cover bg-center transition duration-1000 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 max-w-5xl mx-auto flex items-end gap-6 translate-y-8">
              {/* LOGO */}
              <div className="w-28 h-28 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-2xl border-4 border-slate-50 dark:border-slate-900 flex items-center justify-center shrink-0 overflow-hidden relative z-10">
                  {partner.image.includes('placeholder') ? (
                      <span className="text-4xl font-black text-slate-300 dark:text-slate-600 select-none">
                          {partner.name.substring(0, 2).toUpperCase()}
                      </span>
                  ) : (
                      <img src={partner.image} alt={partner.name} className="max-h-full max-w-full object-contain" />
                  )}
              </div>
              <div className="mb-10 text-white hidden md:block">
                  <h1 className="text-4xl font-black mb-2 shadow-black drop-shadow-md tracking-tight">{partner.name}</h1>
                  <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                      <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-400" /> Mitra Resmi SkyBus</span>
                      <span className="w-1 h-1 bg-white rounded-full"></span>
                      <span>Beroperasi sejak {partner.founded || '-'}</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
          
          {/* MOBILE TITLE */}
          <div className="md:hidden mb-6">
             <h1 className="text-3xl font-black mb-1">{partner.name}</h1>
             <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase border ${partner.type === 'PO Bus' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>{partner.type}</span>
                <span>• Sejak {partner.founded}</span>
             </div>
          </div>

          {/* TABS NAVIGATION */}
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto scrollbar-hide">
              {[
                  { id: 'info', label: 'Info & Armada' },
                  { id: 'reviews', label: `Ulasan (${partner.reviews?.length || 0})` },
                  { id: 'policies', label: 'Kebijakan' },
              ].map((tab) => (
                  <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`pb-3 px-4 text-sm font-bold transition border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                  >
                      {tab.label}
                  </button>
              ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
              {/* MAIN CONTENT */}
              <div className="lg:col-span-2 space-y-12 min-h-[400px]">
                  
                  {/* TAB: INFO */}
                  {activeTab === 'info' && (
                      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          
                          {/* Description (Markdown Render) */}
                          <section>
                              {renderDescription(partner.description || '')}
                          </section>

                          {/* Gallery (Next/Prev + Video) */}
                          {partner.gallery && partner.gallery.length > 0 && (
                              <section>
                                  <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                      <ImageIcon className="w-5 h-5 text-slate-400" /> Galeri Armada
                                  </h3>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-auto md:h-[350px]">
                                      {/* Featured Video / Main Image */}
                                      <div 
                                        className="md:col-span-2 md:h-full aspect-video md:aspect-auto rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 dark:border-slate-700 bg-black"
                                        onClick={() => setLightboxIndex(0)}
                                      >
                                          <img 
                                            src={partner.gallery?.[0].src} 
                                            alt="Featured" 
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition duration-500" 
                                          />
                                          <div className="absolute inset-0 flex items-center justify-center">
                                              {partner.gallery?.[0].type === 'video' ? (
                                                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full group-hover:scale-110 transition">
                                                      <PlayCircle className="w-12 h-12 text-white fill-white/20" />
                                                  </div>
                                              ) : null}
                                          </div>
                                          <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">
                                              {partner.gallery?.[0].title}
                                          </div>
                                      </div>

                                      {/* Side Images */}
                                      <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-full">
                                          {partner.gallery?.slice(1, 3).map((media, i) => (
                                              <div 
                                                key={i} 
                                                onClick={() => setLightboxIndex(i + 1)}
                                                className="relative rounded-2xl overflow-hidden cursor-pointer group h-32 md:h-auto border border-slate-200 dark:border-slate-700"
                                              >
                                                  <img src={media.src} alt={media.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                                  {i === 1 && (partner.gallery?.length || 0) > 3 && (
                                                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                          <span className="text-white font-bold text-sm">+{ (partner.gallery?.length || 0) - 3 } Foto</span>
                                                      </div>
                                                  )}
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              </section>
                          )}

                          {/* Bus Classes */}
                          <section>
                              <h3 className="font-black text-lg mb-4">Armada & Kelas</h3>
                              <div className="space-y-4">
                                  {partner.classes && partner.classes.length > 0 ? partner.classes.map((cls: any, idx: number) => (
                                      <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition group relative overflow-hidden">
                                          <div className="relative z-10">
                                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                                                  <div>
                                                      <h4 className="font-black text-xl text-slate-800 dark:text-white group-hover:text-blue-600 transition">{cls.name}</h4>
                                                      <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded mt-1 inline-block">
                                                          {cls.seats}
                                                      </span>
                                                  </div>
                                                  <div className="text-left sm:text-right">
                                                      <span className="block text-[10px] uppercase text-slate-400 font-bold">Estimasi Harga</span>
                                                      <span className="font-black text-lg text-blue-600 dark:text-blue-400">{cls.price}</span>
                                                  </div>
                                              </div>
                                              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                                                  <div className="flex flex-wrap gap-2">
                                                      {cls.facilities.map((fas: string, fIdx: number) => (
                                                          <span key={fIdx} className="text-xs bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg text-blue-700 dark:text-blue-300 font-medium flex items-center gap-1.5 border border-blue-100 dark:border-blue-800/50">
                                                              <CheckCircle className="w-3 h-3 text-green-500" /> {fas}
                                                          </span>
                                                      ))}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  )) : (
                                      <p className="text-sm text-slate-500 italic">Informasi kelas armada belum tersedia.</p>
                                  )}
                              </div>
                          </section>
                      </div>
                  )}

                  {/* TAB: REVIEWS */}
                  {activeTab === 'reviews' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          {/* Filter Bar (Symbols Only) */}
                          <div className="flex flex-wrap gap-2 pb-2">
                              {['All', 'With Photo', '5 Star', '4 Star', '3 Star'].map((f) => (
                                  <button 
                                    key={f}
                                    onClick={() => setReviewFilter(f as any)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${reviewFilter === f ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'}`}
                                  >
                                      {f === 'With Photo' ? '📷 Media' : f === '5 Star' ? '5 ★' : f === '4 Star' ? '4 ★' : f === '3 Star' ? '< 4 ★' : 'Semua'}
                                  </button>
                              ))}
                          </div>

                          <div className="space-y-6">
                              {filteredReviews.length > 0 ? filteredReviews.map((review) => (
                                  <div key={review.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                      <div className="flex justify-between items-start mb-3">
                                          <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">
                                                  {review.user.charAt(0)}
                                              </div>
                                              <div>
                                                  {/* NAME CENSOR LOGIC */}
                                                  <span className="font-bold text-sm block text-slate-900 dark:text-white">
                                                      {review.anonymous ? censorName(review.user) : review.user}
                                                  </span>
                                                  <div className="flex items-center gap-2 mt-0.5">
                                                      <div className="flex text-amber-400">
                                                          {[...Array(5)].map((_, i) => (
                                                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                                                          ))}
                                                      </div>
                                                      <span className="text-[10px] text-slate-400">{review.date}</span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      
                                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{review.text}</p>
                                      
                                      {/* Review Images */}
                                      {review.images && review.images.length > 0 && (
                                          <div className="flex gap-2 mb-4">
                                              {review.images.map((img, idx) => (
                                                  <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                                      <img src={img} alt="Review" className="w-full h-full object-cover" />
                                                  </div>
                                              ))}
                                          </div>
                                      )}

                                      {review.tags && review.tags.length > 0 && (
                                          <div className="flex gap-2">
                                              {review.tags.map((tag, tIdx) => (
                                                  <span key={tIdx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded font-medium">
                                                      {tag}
                                                  </span>
                                              ))}
                                          </div>
                                      )}
                                  </div>
                              )) : (
                                  <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                      <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                      <p className="text-slate-400 text-sm">Belum ada ulasan untuk filter ini.</p>
                                  </div>
                              )}
                          </div>
                      </div>
                  )}

                  {/* TAB: POLICIES */}
                  {activeTab === 'policies' && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                  <XCircle className="w-5 h-5 text-red-500" /> Kebijakan Pembatalan
                              </h3>
                              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 list-disc pl-5">
                                  <li>Pembatalan hingga 24 jam sebelum keberangkatan: Potongan 25%.</li>
                                  <li>Pembatalan kurang dari 24 jam: Potongan 50%.</li>
                                  <li>Tidak hadir (No Show): Tiket hangus (Non-refundable).</li>
                              </ul>
                          </div>
                          
                          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                  <Clock className="w-5 h-5 text-amber-500" /> Reschedule (Ubah Jadwal)
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                  Perubahan jadwal diperbolehkan maksimal 1 kali dengan ketentuan:
                              </p>
                              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 list-disc pl-5">
                                  <li>Maksimal H-2 keberangkatan.</li>
                                  <li>Dikenakan biaya administrasi Rp 10.000 per tiket.</li>
                                  <li>Tergantung ketersediaan kursi di jadwal baru.</li>
                              </ul>
                          </div>
                      </div>
                  )}

              </div>

              {/* SIDEBAR (STICKY INFO) */}
              <div className="relative">
                  <div className="sticky top-24 space-y-6">
                      
                      {/* Booking CTA */}
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 text-center">
                          <h3 className="font-black text-lg mb-2">Pesan Tiket Sekarang</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                              Pastikan kursi Anda aman bersama {partner.name}.
                          </p>
                          <Link href={`/ticket?operator=${partner.name}`}>
                              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2">
                                  Cari Jadwal
                              </button>
                          </Link>
                      </div>

                      {/* Company Info */}
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                          <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-4">Info Perusahaan</h3>
                          <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                  <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                                  <div>
                                      <span className="block text-xs text-slate-400 font-bold uppercase">Kantor Pusat</span>
                                      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{partner.address || '-'}</p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-3">
                                  <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                                  <div>
                                      <span className="block text-xs text-slate-400 font-bold uppercase">Telepon CS</span>
                                      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{partner.phone || '-'}</p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-3">
                                  <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                                  <div>
                                      <span className="block text-xs text-slate-400 font-bold uppercase">Email</span>
                                      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{partner.email || '-'}</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Departure Points */}
                      {partner.departurePoints && partner.departurePoints.length > 0 && (
                          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                              <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-4">Titik Keberangkatan</h3>
                              <div className="space-y-3">
                                  {partner.departurePoints.map((point: any, idx: number) => (
                                      <a 
                                        key={idx} 
                                        href={point.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition"
                                      >
                                          <div className="flex items-center gap-2">
                                              <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600">{point.name}</span>
                                          </div>
                                          <MapIcon className="w-3 h-3 text-slate-300 group-hover:text-blue-500" />
                                      </a>
                                  ))}
                              </div>
                          </div>
                      )}

                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

"use client";

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BUS_DATA, ALL_PARTNERS, PROMO_DATA } from '@/constants/data';
import { 
  CheckCircle, Loader2, Lock, ShieldCheck, 
  Ticket, Clock, ChevronDown, ChevronUp, Tag, Copy, Smartphone, 
  Landmark, Store, Wallet, AlertCircle, Timer, RotateCcw, X, Check, Info, ArrowLeft, User, Mail, Phone, Calendar, MapPin
} from 'lucide-react';
import Image from 'next/image';
import QRCode from 'react-qr-code';

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

const AlertModal = ({ isOpen, message, onClose }: { isOpen: boolean; message: string; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
        </button>
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-black mb-2 text-slate-800 dark:text-white">Perhatian</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold transition hover:opacity-90">
          Mengerti
        </button>
      </div>
    </div>
  );
};

const PromoModal = ({ isOpen, onClose, onSelect }: { isOpen: boolean; onClose: () => void; onSelect: (code: string, discount: string) => void }) => {
  const [tncOpen, setTncOpen] = useState<string | null>(null);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-lg">Promo Tersedia</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
        </div>
        <div className="p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950/50 flex-1">
          {PROMO_DATA.map((promo) => (
            <div key={promo.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{promo.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded font-mono font-bold">{promo.code}</span>
                    <button onClick={() => setTncOpen(tncOpen === promo.code ? null : promo.code)} className="text-[10px] text-blue-600 font-bold underline">S&K</button>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold text-white uppercase ${promo.color === 'blue' ? 'bg-blue-600' : promo.color === 'orange' ? 'bg-orange-500' : 'bg-green-600'}`}>
                  {promo.discount}
                </div>
              </div>
              
              {tncOpen === promo.code && (
                <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-900 rounded text-xs text-slate-500 mb-2 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-1">
                  <p className="font-bold mb-1">Syarat & Ketentuan:</p>
                  <p>{promo.desc}</p>
                  <p className="mt-1 text-[10px]">Min. Transaksi: {promo.minTrans}</p>
                  <p className="text-[10px]">Berlaku s.d: {promo.validUntil}</p>
                </div>
              )}

              <button 
                onClick={() => { onSelect(promo.code, promo.discount); onClose(); }}
                className="w-full mt-2 bg-slate-900 dark:bg-slate-700 text-white py-2 rounded-lg text-xs font-bold hover:opacity-90 transition"
              >
                Pakai Promo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PaymentMethodItem = ({ 
  label, icon: Icon, description, isSelected, onSelect, children 
}: { 
  id: string; label: string; icon: any; description: string; isSelected: boolean; onSelect: () => void; children?: React.ReactNode 
}) => (
  <div className={`border rounded-xl transition-all duration-300 overflow-hidden ${isSelected ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 ring-1 ring-blue-600' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'}`}>
    <div 
      className="flex items-center gap-4 p-4 cursor-pointer"
      onClick={onSelect}
    >
      <div className={`p-2 rounded-full ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{label}</h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
        {isSelected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
      </div>
    </div>
    
    {isSelected && children && (
      <div className="border-t border-blue-100 dark:border-slate-700 p-4 bg-white dark:bg-slate-900/50 animate-in slide-in-from-top-2">
        {children}
      </div>
    )}
  </div>
);

const TimeoutModal = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Timer className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black mb-2">Waktu Habis!</h2>
        <p className="text-slate-500 text-sm mb-6">Maaf, waktu reservasi kursi Anda telah berakhir. Silakan ulangi pemesanan.</p>
        <button onClick={() => router.push('/')} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold">Kembali ke Beranda</button>
      </div>
    </div>
  );
};

const SuccessModal = ({ isOpen }: { isOpen: boolean }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black mb-2">Pembayaran Berhasil!</h2>
                <p className="text-slate-500 text-sm mb-8">E-Tiket Anda sedang diterbitkan.</p>
                <div className="flex justify-center items-center gap-2 text-sm text-blue-600 font-bold"><Loader2 className="w-4 h-4 animate-spin" /> Mengalihkan...</div>
            </div>
        </div>
    );
};

const getInstructions = (method: string, subMethod: string) => {
    if (method === 'qris') {
        return [
            { title: "Buka Aplikasi E-Wallet", desc: "Buka Gojek, OVO, Dana, Shopee, atau Mobile Banking yang mendukung QRIS." },
            { title: "Scan QR Code", desc: "Arahkan kamera ke kode QR yang tampil di atas." },
            { title: "Cek Detail", desc: "Pastikan nama merchant SKYBUS INDONESIA dan nominal sesuai." },
            { title: "Konfirmasi", desc: "Masukkan PIN Anda untuk menyelesaikan pembayaran." }
        ];
    } else if (method === 'retail') {
        return [
            { title: "Datang ke Gerai", desc: "Kunjungi gerai Indomaret atau Alfamart terdekat." },
            { title: "Info ke Kasir", desc: "Beritahu kasir ingin membayar tagihan SkyBus / Payment Point." },
            { title: "Tunjukkan Kode", desc: "Tunjukkan Kode Pembayaran yang tertera di atas." },
            { title: "Bayar & Simpan Struk", desc: "Lakukan pembayaran dan simpan struk sebagai bukti sah." }
        ];
    } else if (method === 'va') {
        if (subMethod === 'BCA') {
            return [
                { title: "Login m-BCA", desc: "Masuk ke aplikasi BCA Mobile dan pilih m-Transfer." },
                { title: "Pilih BCA Virtual Account", desc: "Masukkan nomor VA yang tertera di atas." },
                { title: "Cek Tagihan", desc: "Pastikan nominal dan nama tagihan sesuai." },
                { title: "Bayar", desc: "Masukkan PIN m-BCA Anda." }
            ];
        } else if (subMethod === 'Mandiri') {
            return [
                { title: "Login Livin' by Mandiri", desc: "Masuk aplikasi dan pilih menu Bayar." },
                { title: "Cari Penyedia Jasa", desc: "Ketik 'SkyBus' atau masukkan kode perusahaan jika ada." },
                { title: "Masukkan Nomor VA", desc: "Input nomor Virtual Account tanpa kode tambahan." },
                { title: "Konfirmasi", desc: "Lanjut bayar dan masukkan MPIN." }
            ];
        } else if (subMethod === 'Bank Lain') {
            return [
                { title: "ATM Bersama / Prima / Alto", desc: "Masuk ke menu Transfer Antar Bank pada ATM atau Mobile Banking." },
                { title: "Pilih Bank Tujuan", desc: "Pilih Bank Permata (Kode: 013). SkyBus menggunakan VA Bank Permata untuk transfer antar bank." },
                { title: "Masukkan Nomor VA", desc: "Input nomor VA yang tertera di atas sebagai rekening tujuan." },
                { title: "Konfirmasi", desc: "Pastikan detail pembayaran benar lalu bayar." }
            ];
        }
        return [
            { title: "ATM / Mobile Banking", desc: `Masuk ke menu pembayaran Virtual Account bank ${subMethod}.` },
            { title: "Input Nomor VA", desc: "Masukkan nomor yang tertera di layar." },
            { title: "Konfirmasi", desc: "Pastikan detail pembayaran benar lalu bayar." }
        ];
    }
    return [];
};

const PaymentInstruction = ({ method, subMethod }: { method: string, subMethod: string }) => {
    const [openStep, setOpenStep] = useState<number | null>(null);
    const steps = getInstructions(method, subMethod);

    if (steps.length === 0) return null;

    return (
        <div className="mt-8 text-left border-t border-slate-200 dark:border-slate-800 pt-6">
            <h4 className="font-bold text-sm mb-4">Cara Pembayaran {subMethod ? subMethod : (method === 'qris' ? 'QRIS' : 'Gerai Retail')}</h4>
            <div className="space-y-2">
                {steps.map((step, idx) => (
                    <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <button 
                            onClick={() => setOpenStep(openStep === idx ? null : idx)}
                            className="w-full flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                        >
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px]">{idx + 1}</span>
                                {step.title}
                            </span>
                            {openStep === idx ? <ChevronUp className="w-3 h-3 text-slate-400"/> : <ChevronDown className="w-3 h-3 text-slate-400"/>}
                        </button>
                        {openStep === idx && (
                            <div className="p-3 bg-white dark:bg-slate-900 text-xs text-slate-500 animate-in slide-in-from-top-1 border-t border-slate-100 dark:border-slate-800">
                                {step.desc}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const busId = searchParams.get('busId');
  const seatString = searchParams.get('seats') || '';
  const seats = seatString.split(',');
  const pax = parseInt(searchParams.get('pax') || '1');
  const date = searchParams.get('date');
  const returnDate = searchParams.get('returnDate');
  const hasInfant = searchParams.get('hasInfant') === 'true';
  const isRoundTrip = !!returnDate;
  
  const bus = BUS_DATA.find(b => b.id === busId);
  
  const [showTimeout, setShowTimeout] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'instruction'>('select');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [subMethod, setSubMethod] = useState(''); 
  
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{code: string, amount: number} | null>(null);
  const [voucherError, setVoucherError] = useState('');
  const [showPromoModal, setShowPromoModal] = useState(false);

  const [contactData, setContactData] = useState({
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone: "081234567890"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ isOpen: false, message: '' });

  const handleReservationExpire = useCallback(() => {
    setShowTimeout(true);
  }, []);

  const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  if (!bus) return null;

  const ticketPrice = bus.price * seats.length * (isRoundTrip ? 2 : 1);
  const serviceFee = 2500; 
  const discountAmount = appliedVoucher ? appliedVoucher.amount : 0;
  const totalPrice = ticketPrice + serviceFee - discountAmount;

  const handleApplyVoucher = (code: string = voucherCode) => {
      setVoucherError('');
      const promo = PROMO_DATA.find(p => p.code === code.toUpperCase());
      if (promo) {
          let amount = 0;
          if (promo.discount.includes('%')) {
              const pct = parseInt(promo.discount.replace(/\D/g, ''));
              amount = (ticketPrice * pct) / 100;
          } else {
              amount = 20000;
          }
          setAppliedVoucher({ code: promo.code, amount: amount });
          setVoucherCode(promo.code);
      } else {
          setVoucherError('Kode voucher tidak valid.');
          setAppliedVoucher(null);
      }
  };

  const handleRequestPayment = () => {
      if (!selectedMethod) return;
      if (selectedMethod === 'va' && !subMethod) {
          setAlertInfo({ isOpen: true, message: 'Silakan pilih Bank terlebih dahulu untuk melanjutkan pembayaran VA.' });
          return;
      }
      if (!contactData.name || !contactData.email || !contactData.phone) {
        setAlertInfo({ isOpen: true, message: 'Mohon lengkapi detail kontak pemesan.' });
        return;
      }
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          setPaymentStep('instruction');
          window.scrollTo(0, 0);
      }, 1500);
  };

  const handleConfirmPayment = () => {
      setIsProcessing(true); 
      setTimeout(() => {
          setIsProcessing(false);
          setShowSuccess(true);
          setTimeout(() => {
            const params = new URLSearchParams();
            params.set('busId', busId!);
            params.set('seats', seatString);
            params.set('date', date || '');
            params.set('status', 'success'); 
            params.set('source', 'payment');
            router.push(`/eticket?${params.toString()}`);
          }, 2000);
      }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32 text-slate-800 dark:text-slate-100 transition-colors">
       
       <TimeoutModal isOpen={showTimeout} />
       <SuccessModal isOpen={showSuccess} />
       <AlertModal isOpen={alertInfo.isOpen} message={alertInfo.message} onClose={() => setAlertInfo({ ...alertInfo, isOpen: false })} />
       <PromoModal isOpen={showPromoModal} onClose={() => setShowPromoModal(false)} onSelect={(code) => handleApplyVoucher(code)} />

       <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => paymentStep === 'instruction' ? setPaymentStep('select') : router.back()} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition">
                <ArrowLeft className="w-5 h-5"/>
              </button>
              <div>
                <h1 className="text-2xl font-black leading-tight text-slate-800 dark:text-white">
                  Pembayaran
                </h1>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-slate-500">Langkah 3 dari 3</p>
                    <ReservationTimerHeader duration={600} onExpire={handleReservationExpire} />
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex gap-2">
              <div className="h-2 w-12 rounded-full bg-blue-600"></div>
              <div className="h-2 w-12 rounded-full bg-blue-600"></div>
              <div className="h-2 w-12 rounded-full bg-blue-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             
             {/* LEFT COLUMN - CONTACT FORM & PAYMENT METHODS */}
             <div className="md:col-span-2 space-y-6">
                 
                 {paymentStep === 'select' && (
                     <>
                         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                             <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><User className="w-5 h-5 text-blue-500"/> Detail Kontak Pemesan</h3>
                             <div className="grid grid-cols-1 gap-4">
                                <div>
                                   <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Nama Lengkap</label>
                                   <input 
                                     type="text" 
                                     value={contactData.name}
                                     onChange={(e) => handleContactChange('name', e.target.value)}
                                     className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                                   />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                     <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Email</label>
                                     <div className="relative">
                                       <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                       <input 
                                         type="email" 
                                         value={contactData.email}
                                         onChange={(e) => handleContactChange('email', e.target.value)}
                                         className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                                       />
                                     </div>
                                  </div>
                                  <div>
                                     <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Nomor Telepon</label>
                                     <div className="relative">
                                       <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                       <input 
                                         type="tel" 
                                         value={contactData.phone}
                                         onChange={(e) => handleContactChange('phone', e.target.value)}
                                         className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                                       />
                                     </div>
                                  </div>
                                </div>
                             </div>
                             <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                E-tiket akan dikirimkan ke alamat email dan nomor WhatsApp di atas.
                             </div>
                         </div>

                         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative">
                             <div className="flex justify-between items-center mb-4">
                               <h3 className="font-bold text-lg flex items-center gap-2"><Tag className="w-5 h-5 text-amber-500"/> Kode Voucher</h3>
                               {!appliedVoucher && (
                                 <button 
                                   onClick={() => setShowPromoModal(true)}
                                   className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                                 >
                                   Lihat Promo <ChevronDown className="w-3 h-3"/>
                                 </button>
                               )}
                             </div>
                             
                             <div className="flex gap-2">
                                 <div className="relative flex-1">
                                     <input type="text" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} placeholder="Punya kode promo?" disabled={!!appliedVoucher} className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 outline-none uppercase font-bold text-sm"/>
                                 </div>
                                 {appliedVoucher ? (<button onClick={() => {setAppliedVoucher(null); setVoucherCode('');}} className="px-6 py-2 bg-red-100 text-red-600 font-bold rounded-xl hover:bg-red-200 transition text-sm">Hapus</button>) : (<button onClick={() => handleApplyVoucher()} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:opacity-90 transition text-sm">Pakai</button>)}
                             </div>
                             {voucherError && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {voucherError}</p>}
                             {appliedVoucher && <p className="text-green-600 text-xs mt-2 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Kode <strong>{appliedVoucher.code}</strong> berhasil digunakan!</p>}
                         </div>

                         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                             <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Wallet className="w-5 h-5 text-blue-500"/> Metode Pembayaran</h3>
                             <div className="space-y-4 mb-8">
                                 <PaymentMethodItem id="qris" label="QRIS" icon={Smartphone} description="Gopay, OVO, Dana, ShopeePay" isSelected={selectedMethod === 'qris'} onSelect={() => setSelectedMethod('qris')}>
                                     <div className="p-2 text-sm text-slate-500">Bayar instan dengan aplikasi e-wallet pilihan Anda.</div>
                                 </PaymentMethodItem>
                                 
                                 <PaymentMethodItem id="va" label="Virtual Account" icon={Landmark} description="BCA, Mandiri, BNI, BRI, Bank Lain" isSelected={selectedMethod === 'va'} onSelect={() => setSelectedMethod('va')}>
                                     <div className="grid grid-cols-2 gap-3">
                                         {['BCA', 'Mandiri', 'BNI', 'BRI', 'Bank Lain'].map(bank => (
                                             <label 
                                                 key={bank} 
                                                 className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition
                                                     ${subMethod === bank 
                                                         ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500' 
                                                         : 'hover:bg-slate-50 dark:hover:bg-slate-800 dark:border-slate-700'
                                                     }
                                                 `}
                                             >
                                                 <input type="radio" name="bank" className="accent-blue-600" checked={subMethod === bank} onChange={() => setSubMethod(bank)} />
                                                 <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{bank}</span>
                                             </label>
                                         ))}
                                     </div>
                                 </PaymentMethodItem>
                                 
                                 <PaymentMethodItem id="retail" label="Gerai Retail" icon={Store} description="Indomaret, Alfamart" isSelected={selectedMethod === 'retail'} onSelect={() => setSelectedMethod('retail')}>
                                     <p className="text-sm text-slate-500">Dapatkan kode pembayaran untuk ditunjukkan ke kasir.</p>
                                 </PaymentMethodItem>
                             </div>

                             <button 
                                 onClick={handleRequestPayment} 
                                 disabled={isProcessing || !selectedMethod} 
                                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95"
                             >
                                 {isProcessing ? (<><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</>) : (<><Lock className="w-5 h-5" /> Bayar Sekarang</>)}
                             </button>
                         </div>
                     </>
                 )}

                 {paymentStep === 'instruction' && (
                     <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm text-center animate-in slide-in-from-right">
                         
                         <div className="mb-8">
                             <h3 className="font-bold text-xl mb-1">Selesaikan Pembayaran</h3>
                             <p className="text-slate-500 text-sm mb-6">Lakukan pembayaran sebelum waktu habis.</p>

                             {selectedMethod === 'qris' && (
                                 <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm inline-block relative overflow-hidden">
                                     <div className="w-full bg-blue-600 h-2 absolute top-0 left-0"></div>
                                     <div className="mb-4">
                                        <div className="font-black text-lg tracking-widest text-slate-800 dark:text-white">SKYBUS PAY</div>
                                     </div>
                                     <div className="bg-white p-2 rounded-xl border-2 border-slate-900 inline-block mb-4">
                                        <QRCode 
                                          value={`SKYBUS-PAY-${busId}-${totalPrice}`} 
                                          size={180}
                                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        />
                                     </div>
                                     <p className="font-bold text-lg text-slate-900 dark:text-white">Rp {totalPrice.toLocaleString('id-ID')}</p>
                                     <p className="text-xs text-slate-400">Scan dengan E-Wallet Anda</p>
                                 </div>
                             )}

                             {selectedMethod === 'va' && (
                                 <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 max-w-sm mx-auto">
                                     <div className="flex items-center justify-between mb-2">
                                         <span className="font-bold text-lg">{subMethod} Virtual Account</span>
                                     </div>
                                     <p className="text-xs text-slate-400 mb-2 text-left uppercase font-bold tracking-wider">Nomor Virtual Account</p>
                                     <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-2 shadow-sm relative group cursor-pointer" onClick={() => handleCopy("8801234567890")}>
                                         <span className="font-mono text-2xl font-black tracking-wider text-blue-600">8801234567890</span>
                                         <button className="text-slate-400 group-hover:text-blue-600 transition">
                                              {copied ? <Check className="w-5 h-5 text-green-500"/> : <Copy className="w-5 h-5"/>}
                                         </button>
                                         {copied && <span className="absolute -top-8 right-0 bg-black text-white text-[10px] py-1 px-2 rounded">Tersalin!</span>}
                                     </div>
                                     <p className="text-xs text-slate-400 text-left">Total: <span className="text-slate-900 dark:text-white font-bold">Rp {totalPrice.toLocaleString('id-ID')}</span></p>
                                 </div>
                             )}

                             {selectedMethod === 'retail' && (
                                 <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-200 dark:border-orange-800 max-w-sm mx-auto">
                                     <p className="font-bold text-sm mb-4 uppercase tracking-widest text-orange-600 dark:text-orange-400">Kode Pembayaran</p>
                                     <div className="text-4xl font-mono font-black text-slate-900 dark:text-white bg-white dark:bg-slate-900 p-4 rounded-xl mb-4 border-2 border-orange-500 border-dashed flex justify-between items-center cursor-pointer" onClick={() => handleCopy("SKY-99281")}>
                                         <span>SKY-99281</span>
                                         <button className="text-slate-400 hover:text-orange-600">
                                              {copied ? <Check className="w-5 h-5 text-green-500"/> : <Copy className="w-5 h-5"/>}
                                         </button>
                                     </div>
                                     <p className="text-xs text-slate-500">Tunjukkan kode ini ke kasir Indomaret/Alfamart terdekat.</p>
                                 </div>
                             )}
                         </div>

                         <div className="space-y-3 max-w-sm mx-auto mb-8">
                             <button onClick={handleConfirmPayment} disabled={isProcessing} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 dark:shadow-none transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                  {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin"/> Mengecek Pembayaran...</> : <><CheckCircle className="w-5 h-5"/> Saya Sudah Bayar</>}
                             </button>
                             
                             <button onClick={() => setPaymentStep('select')} className="w-full py-3 text-slate-500 font-bold hover:text-blue-600 transition flex items-center justify-center gap-2 text-sm"><RotateCcw className="w-4 h-4" /> Ganti Metode Pembayaran</button>
                         </div>

                         <PaymentInstruction method={selectedMethod} subMethod={subMethod} />
                     </div>
                 )}
             </div>

             {/* RIGHT COLUMN - ORDER SUMMARY (Sticky) */}
             <div className="w-full md:w-96 shrink-0 md:col-span-1">
                 <div className="sticky top-24 space-y-4"> 
                     
                     <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
                         <h3 className="font-black text-lg border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-blue-600" /> Detail Pemesanan
                         </h3>

                         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                            {bus.image && bus.image !== '/img/bus-placeholder.png' ? (
                               <Image src={bus.image} alt={bus.name} fill className="object-cover" />
                            ) : (
                               <div className="text-center">
                                  <p className="font-black text-slate-300 dark:text-slate-600 text-2xl uppercase">{bus.operator}</p>
                               </div>
                            )}
                         </div>

                         <div className="space-y-4 mb-6">
                            <div>
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Armada</span>
                                <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{bus.name}</p>
                                <p className="text-xs text-slate-500">{bus.type}</p>
                            </div>
                            
                            <div className="relative pl-6 border-l-2 border-dashed border-slate-300 dark:border-slate-700 space-y-4 py-1">
                                <div className="relative">
                                    <div className="absolute -left-7.25 top-1 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-600 border-2 border-white dark:border-slate-900"></div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-0.5">Berangkat</p>
                                    <p className="text-sm font-bold">{bus.departureTime} • {bus.from}</p>
                                    <p className="text-xs text-slate-500">{date ? new Date(date).toLocaleDateString('id-ID', {weekday: 'short', day: 'numeric', month: 'short'}) : '-'}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-7.25 top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900"></div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-0.5">Tiba</p>
                                    <p className="text-sm font-bold">{bus.arrivalTime} • {bus.to}</p>
                                    <p className="text-xs text-slate-500">{date ? new Date(date).toLocaleDateString('id-ID', {weekday: 'short', day: 'numeric', month: 'short'}) : '-'}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Kursi</span>
                                    <span className="font-bold text-sm">{seats.length} Penumpang</span>
                                </div>
                                <span className="font-black text-blue-600 tracking-wide">{seats.join(", ")}</span>
                            </div>
                         </div>

                         <h4 className="font-bold text-sm mb-3 pt-4 border-t border-slate-100 dark:border-slate-800">Rincian Harga</h4>
                         <div className="space-y-3 text-sm mb-2">
                             <div className="flex justify-between"><span className="text-slate-500">Tiket ({pax}x)</span><span>Rp {ticketPrice.toLocaleString('id-ID')}</span></div>
                             <div className="flex justify-between"><span className="text-slate-500">Biaya Layanan</span><span>Rp {serviceFee.toLocaleString('id-ID')}</span></div>
                             {hasInfant && (<div className="flex justify-between"><span className="text-slate-500">Bayi (Infant)</span><span className="text-green-600 font-bold">Gratis</span></div>)}
                             {appliedVoucher && (<div className="flex justify-between text-green-600"><span className="flex items-center gap-1"><Tag className="w-3 h-3"/> Diskon</span><span>- Rp {appliedVoucher.amount.toLocaleString('id-ID')}</span></div>)}
                             <div className="border-t border-dashed pt-3 mt-2 flex justify-between font-black text-xl"><span>Total</span><span className="text-blue-600">Rp {totalPrice.toLocaleString('id-ID')}</span></div>
                         </div>
                         
                         <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center"><ShieldCheck className="w-3 h-3" /> Transaksi Aman & Terenkripsi</div>
                     </div>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
}

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
            <Suspense fallback={<div className="p-10 text-center">Memuat Data Pembayaran...</div>}>
                <PaymentContent />
            </Suspense>
        </div>
    );
}

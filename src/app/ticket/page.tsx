"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { 
  ArrowLeft, ArrowRight, Star, Wifi, Armchair, ChevronDown, ChevronUp, 
  Camera, MapPin, Check, X, Bus, ArrowUpDown, LogIn, Lock, Tag,
  Utensils, Plug, Snowflake, Bath, Moon, Monitor, ExternalLink, Music, Droplets,
  MessageSquare, ThumbsUp, PlayCircle, ChevronLeft, ChevronRight, SlidersHorizontal, Filter, ShieldAlert, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { BUS_DATA, ALL_PARTNERS, LOCATIONS_DETAIL, POPULAR_LOCATIONS } from '@/constants/data'; 

function TicketContent() {
  const router = useRouter();
  const searchParamsUrl = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    origin: searchParamsUrl.get('origin') || 'Jakarta',
    originDetail: searchParamsUrl.get('originDetail') || 'Semua Lokasi',
    destination: searchParamsUrl.get('destination') || 'Bandung',
    destinationDetail: searchParamsUrl.get('destinationDetail') || 'Semua Lokasi',
    date: searchParamsUrl.get('date') || '2026-02-10',
    returnDate: searchParamsUrl.get('returnDate') || '', 
    pax: parseInt(searchParamsUrl.get('pax') || '1')
  });

  const [isEditingSearch, setIsEditingSearch] = useState(false);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  const [selectedSort, setSelectedSort] = useState('Terhemat');
  const [expandedBusId, setExpandedBusId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('points'); 
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [seatWarning, setSeatWarning] = useState<{isOpen: boolean, message: string}>({isOpen: false, message: ''});

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<{src: string, type: string, title?: string}[]>([]);
  
  const [filters, setFilters] = useState({
    pagi: false, siang: false, malam: false,
    selectedClasses: [] as string[], 
    photoOnly: false,
    promoOnly: false,
    maxPrice: 1000000, 
    boardingPoints: [] as string[],
    droppingPoints: [] as string[],
    operators: [] as string[],
    facilities: [] as string[]
  });

  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);

  useEffect(() => {
    setLocalMaxPrice(filters.maxPrice);
  }, [filters.maxPrice]);

  const commonFacilities = ["AC", "Toilet", "WiFi", "Makan", "Selimut", "USB Port", "Snack"];

  const getLoginRedirectUrl = () => {
    const params = new URLSearchParams();
    params.set("origin", searchParams.origin);
    params.set("destination", searchParams.destination);
    params.set("date", searchParams.date);
    params.set("pax", searchParams.pax.toString());
    if(searchParams.originDetail !== 'Semua Lokasi') params.set("originDetail", searchParams.originDetail);
    if(searchParams.destinationDetail !== 'Semua Lokasi') params.set("destinationDetail", searchParams.destinationDetail);
    if (searchParams.returnDate) params.set("returnDate", searchParams.returnDate);
    
    const returnUrl = `/ticket?${params.toString()}`;
    return `/login?redirect=${encodeURIComponent(returnUrl)}`;
  };

  const getFacilityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-3 h-3" />;
    if (lower.includes('ac') || lower.includes('dingin')) return <Snowflake className="w-3 h-3" />;
    if (lower.includes('makan') || lower.includes('snack')) return <Utensils className="w-3 h-3" />;
    if (lower.includes('usb') || lower.includes('charg') || lower.includes('port')) return <Plug className="w-3 h-3" />;
    if (lower.includes('tv') || lower.includes('monitor')) return <Monitor className="w-3 h-3" />;
    if (lower.includes('selimut') || lower.includes('bantal') || lower.includes('sleep')) return <Moon className="w-3 h-3" />;
    if (lower.includes('toilet')) return <Bath className="w-3 h-3" />;
    if (lower.includes('music') || lower.includes('musik')) return <Music className="w-3 h-3" />;
    if (lower.includes('air') || lower.includes('mineral') || lower.includes('minum')) return <Droplets className="w-3 h-3" />;
    if (lower.includes('seat') || lower.includes('kursi') || lower.includes('leg') || lower.includes('rest')) return <Armchair className="w-3 h-3" />;
    return <Check className="w-3 h-3" />;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (originRef.current && !originRef.current.contains(event.target as Node)) setShowOriginDropdown(false);
      if (destRef.current && !destRef.current.contains(event.target as Node)) setShowDestinationDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % lightboxImages.length);
  };
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length);
  };
  
  const openLightbox = (images: {src: string, type: string, title?: string}[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };
  
  const swapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination, originDetail: 'Semua Lokasi',
      destination: prev.origin, destinationDetail: 'Semua Lokasi'
    }));
  };

  const handleSelectTicket = (e: React.MouseEvent, busId: string, price: number, seatsAvailable: number) => {
    e.stopPropagation(); 
    
    if (seatsAvailable < searchParams.pax) {
      setSeatWarning({
        isOpen: true,
        message: `Maaf, tiket tidak mencukupi. Tersisa ${seatsAvailable} kursi, namun Anda meminta ${searchParams.pax} kursi.`
      });
      return;
    }

    const session = localStorage.getItem("skybus_session");
    const isValidSession = session === 'skb_user_v1_xy77_access' || session === 'skb_admin_secure_8823_hash';

    if (!isValidSession) {
      setShowLoginModal(true);
    } else {
      const params = new URLSearchParams();
      params.set("busId", busId);
      params.set("price", price.toString());
      params.set("date", searchParams.date);
      params.set("pax", searchParams.pax.toString());
      params.set("from", searchParams.origin);
      params.set("to", searchParams.destination);
      if (searchParams.returnDate) params.set("returnDate", searchParams.returnDate);
      router.push(`/booking?${params.toString()}`);
    }
  };

  const isNextDay = (dep: string, arr: string) => {
    const parseTime = (t: string) => parseInt(t.replace('.', ':').split(':')[0]);
    return parseTime(arr) < parseTime(dep);
  };

  const busesOnRoute = BUS_DATA.filter(b => 
    b.from.toLowerCase() === searchParams.origin.toLowerCase() &&
    b.to.toLowerCase() === searchParams.destination.toLowerCase()
  );
  
  const availableBoardingPoints = Array.from(new Set(busesOnRoute.map(b => b.fromDetail)));
  const availableDroppingPoints = Array.from(new Set(busesOnRoute.map(b => b.toDetail)));
  const availableOperators = Array.from(new Set(busesOnRoute.map(b => b.operator)));
  const availableClasses = Array.from(new Set(BUS_DATA.map(b => b.type)));

  const sortedBusData = useMemo(() => {
    let data = [...busesOnRoute]; 
    if (searchParams.originDetail !== 'Semua Lokasi') {
      data = data.filter(bus => bus.fromDetail === searchParams.originDetail);
    }
    if (searchParams.destinationDetail !== 'Semua Lokasi') {
      data = data.filter(bus => bus.toDetail === searchParams.destinationDetail);
    }
    if (filters.pagi || filters.siang || filters.malam) {
      data = data.filter(bus => {
        const hour = parseInt(bus.departureTime.replace('.', ':').split(':')[0]);
        if (filters.pagi && hour >= 0 && hour < 12) return true;
        if (filters.siang && hour >= 12 && hour < 18) return true;
        if (filters.malam && hour >= 18 && hour <= 24) return true;
        return false;
      });
    }
    if (filters.selectedClasses.length > 0) data = data.filter(bus => filters.selectedClasses.includes(bus.type));
    if (filters.boardingPoints.length > 0) data = data.filter(bus => filters.boardingPoints.includes(bus.fromDetail));
    if (filters.droppingPoints.length > 0) data = data.filter(bus => filters.droppingPoints.includes(bus.toDetail));
    if (filters.operators.length > 0) data = data.filter(bus => filters.operators.includes(bus.operator));
    if (filters.facilities.length > 0) {
      data = data.filter(bus => filters.facilities.every(filterFac => bus.facilities.some(busFac => busFac.toLowerCase().includes(filterFac.toLowerCase()))));
    }
    if (filters.photoOnly) {
      data = data.filter(bus => {
        const partner = ALL_PARTNERS.find(p => p.name === bus.operator);
        return partner?.reviews?.some(r => r.images && r.images.length > 0);
      });
    }
    if (filters.promoOnly) {
      // @ts-ignore
      data = data.filter(bus => bus.isPromo === true);
    }
    data = data.filter(bus => bus.price <= filters.maxPrice);

    if (selectedSort === 'Terhemat') data.sort((a, b) => a.price - b.price);
    if (selectedSort === 'Tercepat') data.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    if (selectedSort === 'Berangkat Pagi') data.sort((a, b) => parseInt(a.departureTime.replace('.', '').replace(':', '')) - parseInt(b.departureTime.replace('.', '').replace(':', '')));
    
    return data;
  }, [selectedSort, filters, searchParams, busesOnRoute]);

  const toggleArrayFilter = (key: 'boardingPoints' | 'droppingPoints' | 'operators' | 'selectedClasses' | 'facilities', value: string) => {
    setFilters(prev => {
      const arr = prev[key];
      return arr.includes(value) ? { ...prev, [key]: arr.filter(item => item !== value) } : { ...prev, [key]: [...arr, value] };
    });
  };
  
  const toggleBoolFilter = (key: keyof typeof filters) => {
    // @ts-ignore
    setFilters(prev => ({...prev, [key]: !prev[key]}));
  };
  
  const toggleDetails = (id: string) => {
    setExpandedBusId(expandedBusId === id ? null : id);
    if(expandedBusId !== id) setActiveTab('points');
  };
  
  const getPartnerData = (operatorName: string) => ALL_PARTNERS.find(p => p.name === operatorName);

  const LocationDropdown = ({ type, label }: { type: 'origin' | 'destination', label: string }) => {
    const isOrigin = type === 'origin';
    const currentCity = isOrigin ? searchParams.origin : searchParams.destination;
    const currentDetail = isOrigin ? searchParams.originDetail : searchParams.destinationDetail;
    const showDropdown = isOrigin ? showOriginDropdown : showDestinationDropdown;
    const setShowDropdown = isOrigin ? setShowOriginDropdown : setShowDestinationDropdown;
    const ref = isOrigin ? originRef : destRef;

    return (
      <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 relative" ref={ref}>
        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">{label}</label>
        <div 
          className="w-full bg-transparent font-bold text-sm outline-none cursor-pointer flex items-center justify-between"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="truncate">
            <span className="block">{currentCity}</span>
            <span className="text-xs text-slate-500 font-normal truncate block">{currentDetail}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 w-full md:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl mt-1 z-50 max-h-60 overflow-y-auto">
            <div className="p-2 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 sticky top-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Pilih Kota</span>
            </div>
            {POPULAR_LOCATIONS.map((city) => (
              <div key={city}>
                <div 
                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer font-bold text-sm flex justify-between items-center group"
                  onClick={() => {
                    setSearchParams(prev => ({
                      ...prev, 
                      [isOrigin ? 'origin' : 'destination']: city,
                      [isOrigin ? 'originDetail' : 'destinationDetail']: 'Semua Lokasi'
                    }));
                  }}
                >
                  {city}
                  {city === currentCity && <Check className="w-3 h-3 text-blue-600" />}
                </div>
                
                {city === currentCity && LOCATIONS_DETAIL[city] && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
                    {LOCATIONS_DETAIL[city].map((loc) => (
                      <div 
                        key={loc}
                        className={`px-8 py-2 text-xs cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 flex items-center gap-2 ${loc === currentDetail ? 'text-blue-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                        onClick={() => {
                          setSearchParams(prev => ({
                            ...prev, 
                            [isOrigin ? 'origin' : 'destination']: city, 
                            [isOrigin ? 'originDetail' : 'destinationDetail']: loc
                          }));
                          setShowDropdown(false);
                        }}
                      >
                        {loc === 'Semua Lokasi' ? <MapPin className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>}
                        {loc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-black text-lg">Filter</h3>
        <button onClick={() => setFilters({pagi:false, siang:false, malam:false, selectedClasses: [], facilities: [], photoOnly:false, promoOnly:false, maxPrice: 1000000, boardingPoints:[], droppingPoints:[], operators:[]})} className="text-xs font-bold text-blue-600 hover:underline">Reset</button>
      </div>

      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h4 className="font-bold text-sm mb-4">Penawaran</h4>
        <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900 hover:border-orange-300 transition">
          <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${filters.promoOnly ? 'bg-orange-500 border-orange-500' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}`}>
            {filters.promoOnly && <Check className="w-3 h-3 text-white" />}
          </div>
          <input type="checkbox" className="hidden" checked={filters.promoOnly} onChange={() => toggleBoolFilter('promoOnly')} />
          <div className="flex-1">
            <span className="text-sm font-bold text-slate-700 dark:text-white block">Promo Spesial</span>
            <span className="text-[10px] text-slate-400">Tampilkan tiket diskon saja</span>
          </div>
          <Tag className="w-4 h-4 text-orange-500" />
        </label>
      </div>

      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h4 className="font-bold text-sm mb-4 flex justify-between">
          Harga Maksimal 
          <span className="text-blue-600">Rp {localMaxPrice.toLocaleString()}</span>
        </h4>
        <input 
          type="range" 
          min="50000" 
          max="1000000" 
          step="10000" 
          value={localMaxPrice} 
          onChange={(e) => setLocalMaxPrice(parseInt(e.target.value))}
          onMouseUp={() => setFilters(prev => ({...prev, maxPrice: localMaxPrice}))}
          onTouchEnd={() => setFilters(prev => ({...prev, maxPrice: localMaxPrice}))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h4 className="font-bold text-sm mb-4">Kelas Armada</h4>
        <div className="relative">
          <select 
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none appearance-none cursor-pointer"
            onChange={(e) => {
              if(e.target.value === "") {
                setFilters(prev => ({...prev, selectedClasses: []}));
              } else {
                setFilters(prev => ({...prev, selectedClasses: [e.target.value]}));
              }
            }}
            value={filters.selectedClasses[0] || ""}
          >
            <option value="">Semua Kelas</option>
            {availableClasses.map((cls, idx) => (
              <option key={idx} value={cls}>{cls}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h4 className="font-bold text-sm mb-4">Fasilitas</h4>
        <div className="space-y-2">
          {commonFacilities.map((fac, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${filters.facilities.includes(fac) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'}`}>
                {filters.facilities.includes(fac) && <Check className="w-3 h-3 text-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={filters.facilities.includes(fac)} onChange={() => toggleArrayFilter('facilities', fac)} />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-blue-600 transition">{fac}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h4 className="font-bold text-sm mb-4">Waktu Berangkat</h4>
        <div className="space-y-2">
          {[{id: 'pagi', label: 'Pagi (00:00 - 12:00)'}, {id: 'siang', label: 'Siang (12:00 - 18:00)'}, {id: 'malam', label: 'Malam (18:00 - 24:00)'}].map(opt => (
            <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${filters[opt.id as keyof typeof filters] ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'}`}>
                {filters[opt.id as keyof typeof filters] && <Check className="w-3 h-3 text-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={!!filters[opt.id as keyof typeof filters]} onChange={() => toggleBoolFilter(opt.id as keyof typeof filters)} />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-blue-600 transition">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {searchParams.originDetail === 'Semua Lokasi' && availableBoardingPoints.length > 0 && (
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h4 className="font-bold text-sm mb-4">Titik Naik</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 pr-2">
            {availableBoardingPoints.map((point: string, idx: number) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${filters.boardingPoints.includes(point) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'}`}>
                  {filters.boardingPoints.includes(point) && <Check className="w-3 h-3 text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={filters.boardingPoints.includes(point)} onChange={() => toggleArrayFilter('boardingPoints', point)} />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-blue-600 transition truncate">{point}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {searchParams.destinationDetail === 'Semua Lokasi' && availableDroppingPoints.length > 0 && (
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h4 className="font-bold text-sm mb-4">Titik Turun</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 pr-2">
            {availableDroppingPoints.map((point: string, idx: number) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${filters.droppingPoints.includes(point) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'}`}>
                  {filters.droppingPoints.includes(point) && <Check className="w-3 h-3 text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={filters.droppingPoints.includes(point)} onChange={() => toggleArrayFilter('droppingPoints', point)} />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-blue-600 transition truncate">{point}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {availableOperators.length > 0 && (
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h4 className="font-bold text-sm mb-4">Nama Operator</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 pr-2">
            {availableOperators.map((op: string, idx: number) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${filters.operators.includes(op) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'}`}>
                  {filters.operators.includes(op) && <Check className="w-3 h-3 text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={filters.operators.includes(op)} onChange={() => toggleArrayFilter('operators', op)} />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-blue-600 transition">{op}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <div>
        <h4 className="font-bold text-sm mb-4">Fitur Spesial</h4>
        <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 transition">
          <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${filters.photoOnly ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}`}>
            {filters.photoOnly && <Check className="w-3 h-3 text-white" />}
          </div>
          <input type="checkbox" className="hidden" checked={filters.photoOnly} onChange={() => toggleBoolFilter('photoOnly')} />
          <div className="flex-1">
            <span className="text-sm font-bold text-slate-700 dark:text-white block">Ada Foto Asli</span>
            <span className="text-[10px] text-slate-400">Hanya tampilkan bus dengan ulasan foto</span>
          </div>
          <Camera className="w-4 h-4 text-blue-500" />
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      
      {seatWarning.isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative">
            <button onClick={() => setSeatWarning({...seatWarning, isOpen: false})} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black mb-2 text-slate-800 dark:text-white">Kursi Tidak Cukup</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{seatWarning.message}</p>
            <button onClick={() => setSeatWarning({...seatWarning, isOpen: false})} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold transition hover:opacity-90">
              Mengerti
            </button>
          </div>
        </div>
      )}

      {lightboxIndex !== null && lightboxImages.length > 0 && (
        <div className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition z-20">
            <X className="w-8 h-8" />
          </button>
          <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition z-20">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition z-20">
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {lightboxImages[lightboxIndex].type === 'video' ? (
              <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center border border-white/10">
                <PlayCircle className="w-20 h-20 text-white/50" />
                <p className="absolute bottom-4 text-white/50 text-sm">Video Playback Placeholder</p>
              </div>
            ) : (
              <img
                src={lightboxImages[lightboxIndex].src}
                alt="Gallery Preview"
                className="max-h-[80vh] max-w-full rounded-lg shadow-2xl object-contain"
              />
            )}
            {lightboxImages[lightboxIndex].title && (
              <p className="text-white mt-4 font-medium text-lg text-center">{lightboxImages[lightboxIndex].title}</p>
            )}
            <p className="text-white/50 text-sm mt-2">{lightboxIndex + 1} / {lightboxImages.length}</p>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative text-center">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-2">Login Diperlukan</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Untuk melanjutkan pemesanan dan mengamankan kursi Anda, silakan masuk ke akun SkyBus terlebih dahulu.
            </p>
            <div className="space-y-4">
              <Link href={getLoginRedirectUrl()}> 
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" /> Masuk Sekarang
                </button>
              </Link>
              <div className="text-center">
                <span className="text-xs text-slate-500 font-medium">Belum punya akun? </span>
                <Link href="/signup" className="text-xs font-bold text-blue-600 hover:underline">
                  Daftar Disini
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <div 
              className="flex-1 cursor-pointer group" 
              onClick={() => setIsEditingSearch(!isEditingSearch)}
            >
              <div className="flex items-center gap-2 font-black text-lg group-hover:text-blue-600 transition">
                {searchParams.origin} <ArrowRight className="w-4 h-4 text-slate-400" /> {searchParams.destination}
                <ChevronDown className={`w-4 h-4 transition duration-300 ${isEditingSearch ? 'rotate-180 text-blue-600' : 'text-slate-300'}`} />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                <span>{new Date(searchParams.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{searchParams.pax} Penumpang</span>
                {searchParams.returnDate && (
                  <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold">Pulang Pergi: {new Date(searchParams.returnDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</span>
                )}
                {(searchParams.originDetail !== 'Semua Lokasi' || searchParams.destinationDetail !== 'Semua Lokasi') && (
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">Filter Lokasi</span>
                )}
              </div>
            </div>
          </div>

          {isEditingSearch && (
            <div className="px-4 pb-4 animate-in slide-in-from-top-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center justify-center mb-4">
                <button 
                  onClick={swapLocations}
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-blue-100 transition"
                >
                  <ArrowUpDown className="w-3 h-3" /> Tukar Asal & Tujuan
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                <LocationDropdown type="origin" label="Dari" />
                <LocationDropdown type="destination" label="Ke" />
                <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Pergi</label>
                  <input type="date" value={searchParams.date} onChange={(e)=>setSearchParams({...searchParams, date: e.target.value})} className="w-full bg-transparent font-bold text-sm outline-none" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Pulang (Opsional)</label>
                  <input 
                    type="date" 
                    min={searchParams.date}
                    value={searchParams.returnDate} 
                    onChange={(e)=>setSearchParams({...searchParams, returnDate: e.target.value})} 
                    className="w-full bg-transparent font-bold text-sm outline-none text-slate-600 dark:text-slate-300 placeholder:text-slate-300" 
                  />
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Kursi</label>
                  <input type="number" min="1" value={searchParams.pax} onChange={(e)=>setSearchParams({...searchParams, pax: parseInt(e.target.value)})} className="w-full bg-transparent font-bold text-sm outline-none" />
                </div>
              </div>
              <button 
                onClick={() => setIsEditingSearch(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-200 dark:shadow-none"
              >
                Cari Tiket Baru
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row gap-16 relative">
        <aside className="hidden md:block w-72 shrink-0">
          <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <FilterSidebar />
          </div>
        </aside>

        <main className="flex-1 space-y-4">
          <div className="md:hidden mb-4">
            <button onClick={() => setShowMobileFilter(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm">
              <SlidersHorizontal className="w-4 h-4" /> Buka Filter & Sortir
            </button>
          </div>

          <div className="hidden md:flex items-center justify-between mb-2">
            <div className="text-sm font-bold text-slate-500">Menampilkan {sortedBusData.length} Bus</div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">Urutkan:</span>
              <div className="flex gap-2">
                {['Terhemat', 'Tercepat', 'Berangkat Pagi', 'Rating Tinggi'].map((sort) => (
                  <button key={sort} onClick={() => setSelectedSort(sort)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedSort === sort ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-600 hover:bg-slate-100'}`}>
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {sortedBusData.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-800">
              <Filter className="w-8 h-8 text-slate-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-1">Bus Tidak Ditemukan</h3>
              <p className="text-sm text-slate-500 mb-4">Coba atur ulang filter, lokasi detail, atau cari tanggal lain.</p>
              <button onClick={() => {
                setFilters({pagi:false, siang:false, malam:false, selectedClasses:[], photoOnly:false, promoOnly:false, maxPrice: 1000000, boardingPoints:[], droppingPoints:[], operators:[], facilities: []});
                setSearchParams(prev => ({...prev, originDetail: 'Semua Lokasi', destinationDetail: 'Semua Lokasi'}));
              }} className="text-blue-600 font-bold text-sm hover:underline">Reset Filter & Lokasi</button>
            </div>
          )}

          {sortedBusData.map((bus) => {
            const partnerData = getPartnerData(bus.operator);
            const isExpanded = expandedBusId === bus.id;
            const galleryImages = partnerData?.gallery?.map(g => ({ src: g.src, type: g.type, title: g.title })) || [];
            const reviewImages = partnerData?.reviews?.flatMap(r => r.images || []).map(img => ({ src: img, type: 'image', title: 'Foto Ulasan' })) || [];
            const allImages = [...galleryImages, ...reviewImages];
            const hasPhotos = allImages.length > 0;

            return (
              <div 
                key={bus.id} 
                onClick={() => toggleDetails(bus.id)}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isExpanded ? 'border-blue-500 shadow-xl ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300'}`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center p-1 border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] font-black uppercase text-slate-400">{bus.operator.substring(0,3)}</span>
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-slate-900 dark:text-white leading-none mb-1.5">{bus.name}</h3>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{bus.type}</span>
                          <div className="flex items-center text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-current mr-1" /> {bus.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {/* @ts-ignore */}
                      {bus.originalPrice && (
                        <span className="block text-xs text-slate-400 line-through decoration-orange-500 decoration-2 mb-0.5">
                          Rp {bus.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                      <span className={`block text-xl font-black ${bus.originalPrice ? 'text-orange-600' : 'text-blue-600 dark:text-blue-400'}`}>
                        Rp {bus.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[9px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">Sisa {bus.seatsAvailable} Kursi</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center w-14 shrink-0">
                      <span className="block text-lg font-black text-slate-800 dark:text-white">{bus.departureTime}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase truncate">{bus.fromDetail.split(" ")[0]}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center relative">
                      <span className="text-[10px] text-slate-400 font-bold mb-4">{bus.duration}</span>
                      <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-700 relative flex items-center justify-between px-1">
                        <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 ring-2 ring-white dark:ring-slate-900"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-1">
                          <div className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 text-blue-600">
                            <Bus className="w-3 h-3" />
                          </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900"></div>
                      </div>
                    </div>
                    <div className="text-center w-14 shrink-0">
                      <span className="block text-lg font-black text-slate-800 dark:text-white">{bus.arrivalTime}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase truncate">{bus.toDetail.split(" ")[0]}</span>
                      {isNextDay(bus.departureTime, bus.arrivalTime) && (
                        <span className="text-[9px] text-red-500 font-bold block mt-0.5">+1 Hari</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="hidden md:flex gap-2 text-slate-400">
                      {bus.facilities.slice(0,3).map((fac, i) => (
                        <div key={i} className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded text-[10px] font-bold text-slate-600 dark:text-slate-300">
                          {getFacilityIcon(fac)} {fac}
                        </div>
                      ))}
                      {bus.facilities.length > 3 && (
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-[10px] font-bold text-slate-500 dark:text-slate-300">
                          +{bus.facilities.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 w-full md:w-auto justify-end">
                      <button className={`text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1 border ${isExpanded ? 'bg-slate-100 text-slate-600' : 'text-blue-600 border-transparent hover:bg-blue-50'}`}>
                        {isExpanded ? 'Tutup' : 'Lihat Rincian'} 
                        {isExpanded ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
                      </button>
                      <button 
                        onClick={(e) => handleSelectTicket(e, bus.id, bus.price, bus.seatsAvailable)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-200 dark:shadow-none transition"
                      >
                        PILIH
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2 cursor-default" onClick={(e) => e.stopPropagation()}>
                    <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide">
                      {[
                        {id: 'points', label: 'Titik Naik/Turun'},
                        {id: 'photos', label: 'Foto & Info'},
                        {id: 'reviews', label: 'Ulasan'}, 
                        {id: 'policies', label: 'Kebijakan'},
                      ].map(tab => (
                        <button 
                          key={tab.id} 
                          onClick={() => setActiveTab(tab.id)} 
                          className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition ${activeTab === tab.id ? 'border-blue-600 text-blue-600 bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="p-5 min-h-37.5">
                      {activeTab === 'points' && (
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest">Titik Keberangkatan</h4>
                            <div className="border-l-2 border-slate-200 dark:border-slate-800 ml-1 space-y-4">
                              <div className="relative pl-4">
                                <div className="absolute -left-1.25 top-1.5 w-2 h-2 rounded-full bg-slate-900 dark:bg-white"></div>
                                <span className="block text-sm font-bold text-slate-800 dark:text-white">{bus.departureTime}</span>
                                <span className="text-xs text-slate-500">{bus.fromDetail}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest">Titik Turun</h4>
                            <div className="border-l-2 border-slate-200 dark:border-slate-800 ml-1">
                              <div className="relative pl-4">
                                <div className="absolute -left-1.25 top-1.5 w-2 h-2 rounded-full bg-blue-600"></div>
                                <span className="block text-sm font-bold text-slate-800 dark:text-white">{bus.arrivalTime}</span>
                                <span className="text-xs text-slate-500">{bus.toDetail}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'photos' && (
                        <div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {bus.facilities.map((item, i) => (
                              <span key={i} className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300 flex items-center gap-1">
                                {getFacilityIcon(item)} {item}
                              </span>
                            ))}
                          </div>
                          {hasPhotos ? (
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              {allImages.slice(0, 3).map((img, i) => (
                                <div 
                                  key={i} 
                                  className="aspect-video rounded-lg overflow-hidden relative group bg-slate-200 cursor-pointer border border-slate-100 dark:border-slate-800"
                                  onClick={() => openLightbox(allImages, i)}
                                >
                                  <Image 
                                    src={img.src} 
                                    alt={img.title || "Bus Image"} 
                                    fill 
                                    className="object-cover group-hover:scale-110 transition duration-500" 
                                  />
                                  {i === 2 && allImages.length > 3 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                      <span className="text-white font-bold text-sm">+{ allImages.length - 3 } Foto</span>
                                    </div>
                                  )}
                                  {img.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                      <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                                        <PlayCircle className="w-6 h-6 text-white fill-white/20" />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 bg-slate-100 dark:bg-slate-800 rounded-xl border-dashed border-2 border-slate-200 dark:border-slate-700 mb-4">
                              <Camera className="w-8 h-8 text-slate-300 mx-auto mb-2"/>
                              <p className="text-xs text-slate-400">Belum ada foto armada.</p>
                            </div>
                          )}
                          <Link href={`/mitra/${bus.operator.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                            <button className="w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition flex items-center justify-center gap-2">
                              <ExternalLink className="w-3 h-3" /> Lihat Profil
                            </button>
                          </Link>
                        </div>
                      )}

                      {activeTab === 'reviews' && (
                        <div className="space-y-4">
                          {partnerData?.reviews && partnerData.reviews.length > 0 ? (
                            partnerData.reviews.slice(0, 2).map((review) => (
                              <div key={review.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                                      {review.user.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{review.user}</p>
                                      <p className="text-[10px] text-slate-400">{review.date}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded text-amber-600 text-xs font-bold">
                                    <Star className="w-3 h-3 fill-current" /> {review.rating}
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                                  &quot;{review.text}&quot;
                                </p>
                                {review.tags && review.tags.length > 0 && (
                                  <div className="flex gap-2 mt-2">
                                    {review.tags.map((tag, i) => (
                                      <span key={i} className="text-[9px] bg-slate-100 dark:bg-slate-700 text-slate-500 px-2 py-0.5 rounded flex items-center gap-1">
                                        <ThumbsUp className="w-2 h-2" /> {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-slate-400">
                              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-xs">Belum ada ulasan untuk armada ini.</p>
                            </div>
                          )}
                          <Link href={`/mitra/${bus.operator.toLowerCase().replace(/\s+/g, '-')}`} className="block mt-4">
                            <button className="w-full text-center text-xs font-bold text-blue-600 hover:underline">
                              Lihat Semua Ulasan
                            </button>
                          </Link>
                        </div>
                      )}

                      {activeTab === 'policies' && (
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                            <div>
                              <h5 className="font-bold text-xs mb-1">Pembatalan Tiket</h5>
                              <p className="text-[10px] text-slate-500 leading-relaxed">
                                Pembatalan maksimal H-24 jam. Biaya admin 25%.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </main>
      </div>

      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
          <div className="w-3/4 max-w-sm bg-white dark:bg-slate-900 h-full p-6 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl">Filter & Sortir</h3>
              <button onClick={() => setShowMobileFilter(false)}><X className="w-6 h-6" /></button>
            </div>
            <FilterSidebar />
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setShowMobileFilter(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function TicketPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 dark:bg-slate-950">
        Memuat Data Tiket...
      </div>
    }>
      <TicketContent />
    </Suspense>
  );
}

export const BUS_DATA = [{
    id: "1",
    name: "SkyBus Executive",
    operator: "PO. Sinar Jaya",
    type: "Executive Class",
    price: 245000,
    from: "Jakarta",
    fromDetail: "Terminal Pulo Gebang",
    to: "Bandung",
    toDetail: "Terminal Leuwi Panjang",
    departureTime: "22.00",
    arrivalTime: "02.05",
    duration: "4j 5m",
    rating: 4.8,
    totalReviews: 1240,
    facilities: ["AC", "USB Port", "Toilet", "Reclining Seat"],
    seatsAvailable: 12,
    reviews: [
      {
        user: "Budi S.",
        rating: 5,
        comment: "Bus bersih, AC dingin, sesuai foto!",
        images: ["/dummy/bus-interior-1.jpg", "/dummy/seat.jpg"]
      }
    ]
  },
  {
    id: "2",
    name: "SkyBus Royal Sleeper",
    operator: "PO. Rosalia Indah",
    type: "Sleeper Class",
    price: 450000,
    from: "Jakarta",
    fromDetail: "Pool Pondok Pinang",
    to: "Surabaya",
    toDetail: "Terminal Bungurasih",
    departureTime: "19.00",
    arrivalTime: "05.00",
    duration: "10j",
    rating: 4.9,
    totalReviews: 850,
    facilities: ["AC", "WiFi", "Sleeper Seat", "Makan Malam", "Selimut"],
    seatsAvailable: 4,
    reviews: []
  },
  {
    id: "3",
    name: "SkyBus Economy",
    operator: "PO. Primajasa",
    type: "Economy AC",
    price: 95000,
    from: "Bandung",
    fromDetail: "Terminal Leuwi Panjang",
    to: "Jakarta",
    toDetail: "Terminal Kp. Rambutan",
    departureTime: "08.00",
    arrivalTime: "11.00",
    duration: "3j",
    rating: 4.2,
    totalReviews: 2100,
    facilities: ["AC", "Konfigurasi 2-3"],
    seatsAvailable: 20,
    reviews: []
  }
];

export const MITRA_STATS = {
  totalRevenue: "Rp 45.200.000",
  totalPassengers: 184,
  activeFleets: 12,
  occupancyRate: "85%"
};

export const PROMO_DATA = [
  {
    id: 1,
    code: "SKYNEW26",
    title: "Diskon Pengguna Baru",
    desc: "Potongan hingga 20% untuk transaksi pertama.",
    discount: "20%",
    validUntil: "31 Des 2026",
    minTrans: "Tanpa Min. Transaksi",
    color: "bg-blue-600"
  },
  {
    id: 2,
    code: "MUDIK26",
    title: "Promo Mudik Lebaran",
    desc: "Hemat Rp 50.000 ke semua tujuan Jawa-Bali.",
    discount: "Rp 50rb",
    validUntil: "15 Apr 2026",
    minTrans: "Min. Rp 200.000",
    color: "bg-green-600"
  },
  {
    id: 3,
    code: "WEEKEND26",
    title: "Liburan Akhir Pekan",
    desc: "Cashback 10% khusus keberangkatan Jumat-Minggu.",
    discount: "10%",
    validUntil: "Des 2026",
    minTrans: "Min. Rp 150.000",
    color: "bg-orange-500"
  }
];

export const POPULAR_LOCATIONS = [
  "Jakarta", "Bandung", "Surabaya", "Malang", "Yogyakarta", 
  "Semarang", "Solo", "Denpasar", "Medan", "Palembang", 
  "Terminal Pulo Gebang (JKT)", "Terminal Leuwi Panjang (BDG)", 
  "Terminal Bungurasih (SBY)", "Terminal Giwangan (YOG)"
];

export const POPULAR_ROUTES = [
  { from: "Jakarta", to: "Bandung", price: "Mulai Rp 85rb", image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=300&h=200" },
  { from: "Jakarta", to: "Yogyakarta", price: "Mulai Rp 180rb", image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&q=80&w=300&h=200" },
  { from: "Surabaya", to: "Bali", price: "Mulai Rp 250rb", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=300&h=200" },
  { from: "Bandung", to: "Semarang", price: "Mulai Rp 140rb", image: "https://images.unsplash.com/photo-1596401057633-565652ca65a0?auto=format&fit=crop&q=80&w=300&h=200" },
];

export const PARTNERS = [
  "Sinar Jaya", "Rosalia Indah", "Primajasa", "Harapan Jaya", 
  "Gunung Harta", "Pahala Kencana", "Damri", "Agra Mas"
];

export const PARTNER_DETAILED_DATA = [
  {
    id: 1,
    name: "PO. Sinar Jaya",
    code: "SJ",
    rating: 4.8,
    reviews: "12rb+",
    since: "1982",
    routes: ["Jakarta - Bandung", "Jakarta - Surabaya", "Bekasi - Yogyakarta"],
    fleets: ["Executive", "Suite Class", "Double Decker"],
    desc: "Pilihan utama perjalanan hemat dan nyaman dengan armada modern.",
    color: "bg-gradient-to-br from-red-500 to-red-700"
  },
  {
    id: 2,
    name: "PO. Rosalia Indah",
    code: "RI",
    rating: 4.9,
    reviews: "8.5rb+",
    since: "1983",
    routes: ["Jakarta - Solo", "Bogor - Malang", "Merak - Madiun"],
    fleets: ["Super Top", "First Class", "Sleeper"],
    desc: "Rajanya layanan premium dengan fasilitas kelas atas dan pramugari.",
    color: "bg-gradient-to-br from-orange-500 to-orange-700"
  },
  {
    id: 3,
    name: "PO. Harapan Jaya",
    code: "HJ",
    rating: 4.7,
    reviews: "5rb+",
    since: "1977",
    routes: ["Tulungagung - Jakarta", "Blitar - Bandung"],
    fleets: ["Scania K410", "Avante HDD", "Luxury Class"],
    desc: "Kuda oranye dari Tulungagung yang mengutamakan ketepatan waktu.",
    color: "bg-gradient-to-br from-white to-slate-200 text-slate-800 border"
  },
  {
    id: 4,
    name: "PO. Gunung Harta",
    code: "GH",
    rating: 4.8,
    reviews: "6.2rb+",
    since: "1993",
    routes: ["Malang - Jakarta", "Denpasar - Yogyakarta"],
    fleets: ["Triple Axle", "Jetbus 3+ SHD"],
    desc: "Spesialis rute jarak jauh dengan kenyamanan suspensi udara.",
    color: "bg-gradient-to-br from-green-500 to-green-700"
  }
];
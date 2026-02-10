export const BUS_DATA = [
  {
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
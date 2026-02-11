// src/constants/data.ts

// --- Data Lokasi & Rute ---
export const POPULAR_LOCATIONS = [
  "Jakarta", "Bandung", "Semarang", "Yogyakarta", "Solo", "Surabaya", "Malang", "Denpasar", 
  "Medan", "Palembang", "Lampung", "Makassar"
];

// Map detail lokasi (Terminal/Pool) untuk setiap kota
export const LOCATIONS_DETAIL: Record<string, string[]> = {
  "Jakarta": ["Semua Lokasi", "Terminal Pulo Gebang", "Terminal Kp. Rambutan", "Terminal Kalideres", "Pool Pondok Pinang", "Agen Lebak Bulus"],
  "Bandung": ["Semua Lokasi", "Terminal Leuwi Panjang", "Terminal Cicaheum", "Pool Pasteur", "Pool Buah Batu"],
  "Semarang": ["Semua Lokasi", "Terminal Terboyo", "Terminal Mangkang", "Agen Sukun"],
  "Yogyakarta": ["Semua Lokasi", "Terminal Giwangan", "Terminal Jombor", "Pool Ring Road"],
  "Solo": ["Semua Lokasi", "Terminal Tirtonadi", "Agen Kartasura"],
  "Surabaya": ["Semua Lokasi", "Terminal Bungurasih", "Terminal Osowilangun", "Pool Pasar Turi"],
  "Malang": ["Semua Lokasi", "Terminal Arjosari", "Pool Klojen"],
  "Denpasar": ["Semua Lokasi", "Terminal Mengwi", "Pool Ubung"],
};

export const POPULAR_ROUTES = [
  { from: "Jakarta", to: "Bandung", price: "Rp 85.000", image: "/img/rute-populer-01.jpg" },
  { from: "Bandung", to: "Yogyakarta", price: "Rp 120.000", image: "/img/rute-populer-02.jpg" },
  { from: "Jakarta", to: "Semarang", price: "Rp 150.000", image: "/img/rute-populer-03.jpg" },
  { from: "Surabaya", to: "Malang", price: "Rp 40.000", image: "/img/rute-populer-04.jpg" },
];

export const PROMO_DATA = [
  {
    id: 1,
    code: "SKYNEW26",
    title: "Diskon Pengguna Baru",
    desc: "Potongan harga 20% tanpa minimum transaksi untuk pembelian tiket pertama kali di SkyBus.",
    discount: "20%",
    validUntil: "31 Des 2026",
    minTrans: "Rp 0",
    color: "blue",
    type: "New User",
    limited: false
  },
  {
    id: 2,
    code: "WEEKEND10",
    title: "Liburan Hemat Akhir Pekan",
    desc: "Diskon 10% untuk keberangkatan hari Jumat, Sabtu, dan Minggu ke semua tujuan.",
    discount: "10%",
    validUntil: "31 Mar 2026",
    minTrans: "Rp 100.000",
    color: "orange",
    type: "Weekend",
    limited: true
  },
  {
    id: 3,
    code: "MUDIKASIK",
    title: "Early Bird Mudik Lebaran",
    desc: "Amankan tiket mudikmu lebih awal dan dapatkan potongan Rp 50.000.",
    discount: "Rp 50rb",
    validUntil: "15 Apr 2026",
    minTrans: "Rp 500.000",
    color: "green",
    type: "Seasonal",
    limited: true
  }
];

export const MITRA_STATS = {
  totalRevenue: "Rp 45.200.000",
  totalPassengers: 184,
  activeFleets: 12,
  occupancyRate: "85%"
};

// --- Interfaces ---
export interface Review {
  id: number;
  user: string;
  rating: number;
  text: string;
  date: string;
  tags?: string[];
  images?: string[];
  anonymous?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  rating: number;
  routes: number;
  image: string;
  address: string;
  phone: string;
  email: string;
  founded: string;
  joined: string;
  description: string;
  classes: { name: string; price: string; seats: string; facilities: string[] }[];
  departurePoints: { name: string; link: string }[];
  gallery: { type: string; src: string; title: string }[];
  reviews: Review[];
  usps?: string[];
}

// --- Data Detail Mitra ---
export const ALL_PARTNERS: Partner[] = [
  { 
    id: 'sinar-jaya', 
    name: 'Sinar Jaya', 
    type: 'PO Bus', 
    rating: 4.8, 
    routes: 120, 
    image: '/img/sinar-jaya.png',
    address: 'Jl. Diponegoro No. 12, Tambun, Bekasi',
    phone: '(021) 88325550',
    email: 'cs@sinarjaya.com',
    founded: '1982',
    joined: '2024',
    description: `### Mengapa Memilih Sinar Jaya?

Siapa yang tidak kenal dengan "Bus Sejuta Umat"? Sejak berdiri pada tahun 1982, Sinar Jaya Group telah menjadi tulang punggung transportasi antar kota di Pulau Jawa.

**Keunggulan Utama Kami:**
- **Harga Merakyat, Fasilitas Pejabat:** Kami dikenal sebagai PO dengan harga paling kompetitif namun tetap memberikan kenyamanan standar eksekutif.
- **Jaringan Rute Terluas:** Dari Merak hingga ujung Jawa Timur, bahkan Lampung.
- **Ketepatan Waktu:** Kami menerapkan sistem manajemen modern untuk meminimalisir keterlambatan.

Perjalanan jauh tidak lagi melelahkan bersama Sinar Jaya. Pesan tiket sekarang dan nikmati perjalanan aman bersama kru berpengalaman kami.`,
    classes: [
      { name: 'Executive', price: 'Rp 150rb - 200rb', seats: '32 Seat (2-2)', facilities: ['AC', 'Reclining Seat', 'Toilet', 'USB Charger', 'Snack'] },
      { name: 'Suite Class', price: 'Rp 350rb - 450rb', seats: '21 Sleeper', facilities: ['Personal TV', 'Bantal & Selimut', 'Service Makan', 'WiFi', 'Toilet'] }
    ],
    departurePoints: [
      { name: 'Terminal Pulo Gebang', link: 'https://goo.gl/maps/example' },
      { name: 'Pool Cibitung', link: 'https://goo.gl/maps/example' },
      { name: 'Agen Lebak Bulus', link: 'https://goo.gl/maps/example' }
    ],
    gallery: [
       { type: 'video', src: "/img/hero-bus.jpg", title: "Profil Video Sinar Jaya" },
       { type: 'image', src: "/img/rute-populer-01.jpg", title: "Interior Suite Class" },
       { type: 'image', src: "/img/rute-populer-02.jpg", title: "Exterior Bus Baru" },
       { type: 'image', src: "/img/rute-populer-03.jpg", title: "Ruang Tunggu Pool" },
       { type: 'image', src: "/img/rute-populer-04.jpg", title: "Fasilitas Makan" },
    ],
    reviews: [
      { id: 1, user: "Budi Santoso", rating: 5, text: "Gila sih suite class nya sinar jaya emg gapernah gagal. rebahan full sampe sby ga kerasa capek. makanannya jg lumayan enak ayam bakar.", date: "12 Feb 2026", tags: ["Fasilitas Top", "Nyaman"], images: ["/img/rute-populer-01.jpg"], anonymous: true },
      { id: 2, user: "Ani Wijaya", rating: 4, text: "bus berangkat ontime bgt dr pulogebang. tp sayang pas di rmh makan istirahatnya kecepetan cm 20 menit jd buru2 makannya. sisanya oke.", date: "10 Feb 2026", tags: ["Tepat Waktu"], images: [], anonymous: false },
      { id: 3, user: "Dimas Anggara", rating: 3, text: "AC nya dingin banget tolong dikondisikan pak supir wkwk. selimutnya agak tipis jd msh tembus.", date: "08 Feb 2026", tags: ["AC Dingin"], images: [], anonymous: true }
    ],
    usps: []
  },
  { 
    id: 'pahala-kencana', 
    name: 'Pahala Kencana', 
    type: 'PO Bus', 
    rating: 4.6, 
    routes: 85, 
    image: '/img/pahala-kencana.png',
    address: 'Jl. Gading Bukit Raya, Kelapa Gading, Jakarta Utara',
    phone: '(021) 4517375',
    email: 'info@pahalakencana.co.id',
    founded: '1976',
    joined: '2025',
    description: `### Legenda Lintas Jawa-Bali-Sumatera

Pahala Kencana bukan pemain baru. Berdiri sejak 1976, kami telah melayani jutaan kilometer perjalanan keluarga Indonesia. Keunggulan kami terletak pada rute jarak jauh yang stabil dan armada yang tangguh.

**Kenapa Harus Pahala Kencana?**
- **Pengalaman Puluhan Tahun:** Kami tahu betul kontur jalanan Indonesia, menjamin pengemudi kami handal di segala medan.
- **Spesialis Paket Kilat:** Selain penumpang, bagasi Anda aman bersama layanan kargo kami yang terintegrasi.
- **Makan Prasmanan:** Nikmati servis makan prasmanan yang lezat di rumah makan mitra kami.`,
    classes: [
      { name: 'VIP', price: 'Rp 180rb - 250rb', seats: '40 Seat (2-2)', facilities: ['AC', 'Toilet', 'Selimut', 'Makan Prasmanan'] },
      { name: 'Executive', price: 'Rp 280rb - 350rb', seats: '30 Seat (2-2)', facilities: ['Leg Rest', 'WiFi', 'Charging Point', 'Bantal'] }
    ],
    departurePoints: [
      { name: 'Terminal Kampung Rambutan', link: 'https://goo.gl/maps/example' },
      { name: 'Kantor Pusat Kudus', link: 'https://goo.gl/maps/example' }
    ],
    gallery: [
        { type: 'video', src: "/img/hero-bus.jpg", title: "Video Pahala Kencana" },
        { type: 'image', src: "/img/rute-populer-02.jpg", title: "Bus Executive" },
        { type: 'image', src: "/img/rute-populer-03.jpg", title: "Interior" },
      ],
    reviews: [
        { id: 1, user: "Rian Ekky", rating: 5, text: "mantap pahala kencana, ngebut tp halus bawanya. sampe denpasar lebih cepet 2 jam dr jadwal.", date: "14 Jan 2026", tags: ["Cepat"], images: [], anonymous: true }
    ],
    usps: []
  },
  { 
    id: 'xtrans', 
    name: 'X-Trans', 
    type: 'Travel', 
    rating: 4.8, 
    routes: 45, 
    image: '/img/xtrans.png',
    address: 'Jl. Blora No. 1, Menteng, Jakarta Pusat',
    phone: '(021) 3150555',
    email: 'help@xtrans.co.id',
    founded: '2005',
    joined: '2024',
    description: `### Pelopor "On-Time" Shuttle

X-Trans adalah pelopor layanan shuttle "Point to Point" (Pool to Pool) di Indonesia. Kami mengerti waktu Anda sangat berharga.

**Alasan Profesional Memilih X-Trans:**
- **Jadwal Padat:** Keberangkatan setiap jam! Ketinggalan satu jadwal? Tenang, jadwal berikutnya menanti.
- **Lokasi Strategis:** Pool kami terletak di pusat kota dan area hotel strategis.
- **Armada Hiace Terbaru:** Nyaman, bersih, dan tidak berisik. Cocok untuk Anda yang ingin istirahat sejenak sebelum meeting.`,
    classes: [
      { name: 'Shuttle Executive', price: 'Rp 100rb - 140rb', seats: '8-10 Seat', facilities: ['AC Dingin', 'Captain Seat', 'Air Mineral', 'Music'] }
    ],
    departurePoints: [
      { name: 'Hotel Kartika Chandra', link: 'https://goo.gl/maps/example' },
      { name: 'De Batara Bandung', link: 'https://goo.gl/maps/example' }
    ],
    gallery: [
        { type: 'video', src: "/img/hero-bus.jpg", title: "X-Trans Profile" },
        { type: 'image', src: "/img/rute-populer-04.jpg", title: "Unit Hiace Premio" },
      ],
    reviews: [
        { id: 1, user: "Siska Kohl", rating: 5, text: "selalu langganan xtrans kalo ke bdg. ontime bgt ga pake ngetem2 kyk travel lain. pool nya jg nyaman ada kafenya.", date: "01 Feb 2026", tags: ["Ontime", "Nyaman"], images: [], anonymous: false },
        { id: 2, user: "Dedi Corbuzier", rating: 4, text: "sempit dikit di kaki krn saya tinggi, tp oke lah buat perjalanan 3 jam.", date: "20 Jan 2026", tags: [], images: [], anonymous: true }
    ],
    usps: []
  },
  // Mitra Lainnya
  { id: 'rosalia-indah', name: 'Rosalia Indah', type: 'PO Bus', rating: 4.9, routes: 150, image: '/img/bus-placeholder.png', address: '-', phone: '-', email: '-', founded: '1983', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
  { id: 'harapan-jaya', name: 'Harapan Jaya', type: 'PO Bus', rating: 4.7, routes: 90, image: '/img/bus-placeholder.png', address: '-', phone: '-', email: '-', founded: '1977', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
  { id: 'cititrans', name: 'Cititrans', type: 'Travel', rating: 4.9, routes: 30, image: '/img/travel-placeholder.png', address: '-', phone: '-', email: '-', founded: '2005', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
  { id: 'baraya', name: 'Baraya Travel', type: 'Travel', rating: 4.5, routes: 25, image: '/img/travel-placeholder.png', address: '-', phone: '-', email: '-', founded: '2006', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
  { id: 'efisiensi', name: 'Efisiensi', type: 'PO Bus', rating: 4.7, routes: 30, image: '/img/efisiensi.png', address: '-', phone: '-', email: '-', founded: '1996', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
  { id: 'san', name: 'SAN', type: 'PO Bus', rating: 4.6, routes: 60, image: '/img/san-group.png', address: '-', phone: '-', email: '-', founded: '1990', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
  { id: 'primajasa', name: 'Primajasa', type: 'PO Bus', rating: 4.5, routes: 100, image: '/img/bus-placeholder.png', address: '-', phone: '-', email: '-', founded: '1991', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
  { id: 'daytrans', name: 'DayTrans', type: 'Travel', rating: 4.7, routes: 40, image: '/img/travel-placeholder.png', address: '-', phone: '-', email: '-', founded: '2009', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
  { id: 'juragan-99', name: 'Juragan 99', type: 'PO Bus', rating: 5.0, routes: 20, image: '/img/bus-placeholder.png', address: '-', phone: '-', email: '-', founded: '2018', joined: '2024', description: 'Deskripsi placeholder...', classes: [], departurePoints: [], gallery: [], reviews: [], usps: [] },
];

// --- Data Bus Expanded (dengan Promo & Layout) ---
export const BUS_DATA = [
  {
    id: "1",
    name: "Sinar Jaya Executive",
    operator: "Sinar Jaya", 
    type: "Executive Class",
    price: 200000,
    originalPrice: 245000, // Harga coret
    isPromo: true,
    seatLayout: "2-2",
    from: "Jakarta",
    fromDetail: "Terminal Pulo Gebang",
    to: "Bandung",
    toDetail: "Terminal Leuwi Panjang",
    departureTime: "07:00",
    arrivalTime: "11:05",
    duration: "4j 5m",
    rating: 4.8,
    totalReviews: 1240,
    facilities: ["AC", "USB Port", "Toilet", "Reclining Seat"],
    seatsAvailable: 12,
    image: "/img/sinar-jaya.png"
  },
  {
    id: "2",
    name: "Sinar Jaya Suite Class",
    operator: "Sinar Jaya", 
    type: "Sleeper Class",
    price: 350000,
    originalPrice: null,
    isPromo: false,
    seatLayout: "1-1", // Sleeper layout
    from: "Jakarta",
    fromDetail: "Pool Cibitung",
    to: "Bandung",
    toDetail: "Pool Pasteur",
    departureTime: "18:00",
    arrivalTime: "22:00",
    duration: "4j 0m",
    rating: 4.9,
    totalReviews: 890,
    facilities: ["Sleeper Seat", "Selimut", "Bantal", "Personal TV", "Snack", "WiFi", "Toilet"],
    seatsAvailable: 5,
    image: "/img/sinar-jaya.png"
  },
  {
    id: "3",
    name: "Primajasa Economy",
    operator: "Primajasa",
    type: "Economy AC",
    price: 95000,
    originalPrice: null,
    isPromo: false,
    seatLayout: "2-3", // Economy layout
    from: "Bandung",
    fromDetail: "Terminal Leuwi Panjang",
    to: "Jakarta",
    toDetail: "Terminal Kp. Rambutan",
    departureTime: "08:00",
    arrivalTime: "11:30",
    duration: "3j 30m",
    rating: 4.2,
    totalReviews: 2100,
    facilities: ["AC", "Konfigurasi 2-3"],
    seatsAvailable: 20,
    image: "/img/bus-placeholder.png"
  },
  {
    id: "4",
    name: "X-Trans Shuttle",
    operator: "X-Trans",
    type: "Shuttle",
    price: 110000,
    originalPrice: 135000,
    isPromo: true,
    seatLayout: "shuttle", // Hiace layout
    from: "Jakarta",
    fromDetail: "Hotel Kartika Chandra",
    to: "Bandung",
    toDetail: "De Batara Bandung",
    departureTime: "06:00",
    arrivalTime: "09:30",
    duration: "3j 30m",
    rating: 4.7,
    totalReviews: 540,
    facilities: ["AC", "Captain Seat", "Music", "Air Mineral"],
    seatsAvailable: 8,
    image: "/img/xtrans.png"
  },
  {
    id: "5",
    name: "X-Trans Shuttle Malam",
    operator: "X-Trans",
    type: "Shuttle",
    price: 110000,
    originalPrice: 135000,
    isPromo: true,
    seatLayout: "shuttle",
    from: "Jakarta",
    fromDetail: "Blora Menteng",
    to: "Bandung",
    toDetail: "Cihampelas",
    departureTime: "20:00",
    arrivalTime: "23:30",
    duration: "3j 30m",
    rating: 4.7,
    totalReviews: 420,
    facilities: ["AC", "Captain Seat", "Music"],
    seatsAvailable: 6,
    image: "/img/xtrans.png"
  },
  {
    id: "6",
    name: "Rosalia Indah VIP",
    operator: "Rosalia Indah",
    type: "VIP Class",
    price: 180000,
    originalPrice: null,
    isPromo: false,
    seatLayout: "2-2",
    from: "Jakarta",
    fromDetail: "Terminal Kalideres",
    to: "Bandung",
    toDetail: "Terminal Cicaheum",
    departureTime: "13:00",
    arrivalTime: "17:00",
    duration: "4j 0m",
    rating: 4.5,
    totalReviews: 600,
    facilities: ["AC", "Toilet", "Makan Siang", "Leg Rest"],
    seatsAvailable: 15,
    image: "/img/bus-placeholder.png"
  },
  {
    id: "7",
    name: "Rosalia Indah Sleeper",
    operator: "Rosalia Indah",
    type: "Sleeper Class",
    price: 450000,
    originalPrice: 500000,
    isPromo: true,
    seatLayout: "1-1",
    from: "Jakarta",
    fromDetail: "Pool Pondok Pinang",
    to: "Surabaya",
    toDetail: "Terminal Bungurasih",
    departureTime: "15:00",
    arrivalTime: "05:00",
    duration: "14j",
    rating: 4.9,
    totalReviews: 850,
    facilities: ["AC", "WiFi", "Sleeper Seat", "Makan Malam", "Selimut", "Toilet"],
    seatsAvailable: 4,
    image: "/img/bus-placeholder.png"
  },
];

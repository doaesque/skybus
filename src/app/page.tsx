import { 
  Search, MapPin, Calendar, Users, ArrowRight, 
  CreditCard, Armchair, QrCode, Ticket, 
  MessageCircle, HelpCircle, Phone, Mail, Map, 
  Facebook, Twitter, Instagram, Linkedin 
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-4 bg-slate-500 text-white sticky top-0 z-50 shadow-md">
        <div className="text-xl font-black tracking-widest flex items-center gap-2">
           SKYBUS
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-slate-200 transition">BERANDA</Link>
          <Link href="/search" className="hover:text-slate-200 transition">PESAN TIKET</Link>
          <Link href="/my-orders" className="hover:text-slate-200 transition">PESANAN SAYA</Link>
          <Link href="/help" className="hover:text-slate-200 transition">BANTUAN</Link>
        </div>
        <div className="flex space-x-3">
          <Link href="/login">
            <button className="px-4 py-1 border border-white text-sm rounded hover:bg-white hover:text-slate-600 transition">Masuk</button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-1 bg-white text-slate-600 text-sm rounded font-bold hover:bg-slate-100 transition">Daftar</button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="bg-slate-500 px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <div className="text-white space-y-4">
          <p className="text-sm tracking-widest opacity-80 uppercase">Partner Perjalanan Terbaik Anda</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            JELAJAHI KOTA <br /> DENGAN NYAMAN.
          </h1>
          <p className="opacity-90 max-w-md leading-relaxed">
            Nikmati perjalanan antar kota dengan armada bus eksekutif. Pesan tiket mudah, harga transparan, dan jadwal real-time hanya di SkyBus.
          </p>
        </div>

        {/* Right Form */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl max-w-md w-full ml-auto">
          <h3 className="font-bold text-slate-700 mb-4 uppercase">Cari Tiket Perjalanan</h3>
          
          {/* Tabs */}
          <div className="flex border-b mb-4 text-sm">
            <button className="flex-1 pb-2 border-b-2 border-slate-600 font-bold text-slate-800">Sekali Jalan</button>
            <button className="flex-1 pb-2 text-slate-400 hover:text-slate-600">Pulang Pergi</button>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            <div className="bg-white border rounded flex items-center px-3 py-2">
              <MapPin className="w-5 h-5 text-slate-400 mr-2" />
              <input type="text" placeholder="Asal (Misal: Jakarta)" className="w-full outline-none text-sm bg-transparent" />
            </div>
            
            <div className="bg-white border rounded flex items-center px-3 py-2 relative">
              <MapPin className="w-5 h-5 text-slate-400 mr-2" />
              <input type="text" placeholder="Tujuan (Misal: Bandung)" className="w-full outline-none text-sm bg-transparent" />
              <div className="absolute right-2 -top-[15px] bg-slate-200 p-1 rounded-full border shadow-sm cursor-pointer hover:bg-slate-300 transition">
                 <ArrowRight className="w-4 h-4 rotate-90" />
              </div>
            </div>

            <div className="bg-white border rounded flex items-center px-3 py-2">
              <Calendar className="w-5 h-5 text-slate-400 mr-2" />
              <input type="date" className="w-full outline-none text-sm bg-transparent text-slate-500" />
            </div>

            <div className="bg-white border rounded flex items-center px-3 py-2">
              <Users className="w-5 h-5 text-slate-400 mr-2" />
              <input type="number" placeholder="1 Penumpang" className="w-full outline-none text-sm bg-transparent" />
            </div>

            <Link href="/search" className="block w-full">
                <button className="w-full bg-slate-600 text-white py-3 rounded font-bold mt-4 hover:bg-slate-700 transition flex justify-center items-center gap-2 shadow-lg">
                CARI TIKET
                </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="bg-neutral-900 text-white grid grid-cols-1 md:grid-cols-4">
        {[
          { title: "JADWAL REAL-TIME", icon: <Calendar />, desc: "Cek ketersediaan kursi dan jam keberangkatan terupdate secara langsung." },
          { title: "PILIH KURSI SENDIRI", icon: <Armchair />, desc: "Tentukan posisi duduk ternyaman anda, di dekat jendela atau lorong." },
          { title: "PEMBAYARAN AMAN", icon: <CreditCard />, desc: "Transaksi terenkripsi dengan berbagai pilihan metode pembayaran instan." },
          { title: "TIKET DIGITAL", icon: <QrCode />, desc: "Tidak perlu cetak tiket. Cukup scan kode QR di HP anda saat boarding." },
        ].map((item, idx) => (
          <div key={idx} className={`p-8 border-r border-neutral-800 ${idx === 0 ? 'bg-black' : ''}`}>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">{item.title}</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{item.desc}</p>
            <ArrowRight className="w-5 h-5 text-white cursor-pointer hover:translate-x-2 transition" />
          </div>
        ))}
      </section>

      {/* --- PROMO SECTION --- */}
      <section className="bg-gray-200 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold mb-4 uppercase text-slate-800">Liburan Lebih Hemat</h2>
            <p className="text-slate-600 mb-6">Dapatkan potongan harga spesial untuk perjalanan pertama anda menggunakan SkyBus. Kuota terbatas!</p>
            <Link href="/promo">
                <button className="bg-slate-600 text-white px-6 py-3 rounded text-sm font-bold tracking-wider hover:bg-slate-700 shadow-md">
                LIHAT PROMO
                </button>
            </Link>
          </div>
          {/* Coupon Visual */}
          <div className="border-2 border-dashed border-slate-400 p-6 w-full max-w-md rounded-lg flex items-center justify-between bg-slate-300/50 relative overflow-hidden">
            <div className="-rotate-90 font-bold text-slate-500 tracking-widest text-xs whitespace-nowrap absolute left-2 top-10">VOUCHER</div>
            <div className="pl-8 w-full">
              <div className="text-right">
                <div className="text-lg font-bold text-slate-600">KODE: SKYNEW24</div>
                <div className="text-4xl font-extrabold text-slate-800 drop-shadow-sm">DISKON 20%</div>
                <div className="text-xs text-slate-500 mt-1">*Syarat & ketentuan berlaku</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPULAR ROUTES --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-2xl font-black mb-10 uppercase tracking-wide text-slate-800">Rute Populer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { from: 'Jakarta', to: 'Bandung', price: 'Rp 110.000' },
            { from: 'Surabaya', to: 'Malang', price: 'Rp 45.000' },
            { from: 'Yogyakarta', to: 'Semarang', price: 'Rp 85.000' },
            { from: 'Jakarta', to: 'Solo', price: 'Rp 210.000' },
          ].map((item, idx) => (
            <Link key={idx} href="/search">
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer border border-transparent hover:border-slate-300">
                <div className="bg-slate-200 h-32 rounded mb-4 flex items-center justify-center text-slate-400">
                    <Map className="w-12 h-12 opacity-50" />
                </div>
                <div className="flex justify-between items-end">
                    <div>
                    <h4 className="font-bold text-sm text-slate-800">{item.from} <ArrowRight className="inline w-3 h-3" /> {item.to}</h4>
                    <p className="text-xs text-gray-500 mt-1">SkyBus Executive • ⭐ 4.8</p>
                    </div>
                </div>
                <div className="mt-3 font-bold text-slate-700 text-lg">{item.price}</div>
                </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- INFO / HOW WE WORK --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t">
        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Layanan Kami</div>
        <h2 className="text-3xl font-extrabold mb-10 uppercase text-slate-800">Info SkyBus</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/help">
            <div className="bg-white p-8 border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition h-full group">
              <div className="mb-4"><MessageCircle className="w-8 h-8 text-slate-700 group-hover:text-slate-500" /></div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">BANTUAN 24/7</h3>
              <p className="text-sm text-gray-500">
                Ada kendala saat pemesanan? Tim customer service kami siap membantu anda kapan saja melalui live chat.
              </p>
            </div>
          </Link>
          
          <Link href="/search">
            <div className="bg-slate-600 text-white p-8 border border-slate-600 rounded-lg shadow-sm cursor-pointer hover:bg-slate-700 transition h-full">
              <div className="mb-4"><Ticket className="w-8 h-8 text-white" /></div>
              <h3 className="font-bold text-lg mb-2">CARA PESAN TIKET</h3>
              <p className="text-sm text-slate-200">
                Pilih rute, tentukan jadwal, pilih kursi favorit, lakukan pembayaran, dan tiket digital siap digunakan.
              </p>
            </div>
          </Link>

          <Link href="/help">
            <div className="bg-white p-8 border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition h-full group">
              <div className="mb-4"><HelpCircle className="w-8 h-8 text-slate-700 group-hover:text-slate-500" /></div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">PERTANYAAN UMUM</h3>
              <p className="text-sm text-gray-500">
                Bingung soal refund atau reschedule? Temukan jawaban lengkapnya di halaman pusat bantuan kami.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* --- PARTNERS --- */}
      <section className="py-10 text-center bg-gray-50">
        <p className="text-xs font-bold text-gray-400 uppercase mb-6 tracking-widest">Partner Resmi Pembayaran</p>
        <div className="flex justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition duration-500">
             {/* Simulasi Logo Bank */}
            <div className="font-black text-xl italic text-slate-400">BCA</div>
            <div className="font-black text-xl italic text-slate-400">MANDIRI</div>
            <div className="font-black text-xl italic text-slate-400">GOPAY</div>
            <div className="font-black text-xl italic text-slate-400">DANA</div>
        </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="bg-slate-500 text-white py-20 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold max-w-3xl mx-auto leading-tight mb-8">
          JANGAN TUNDA PERJALANAN ANDA. <br/> PESAN TIKET SKYBUS SEKARANG.
        </h2>
        <Link href="/help">
            <button className="bg-neutral-900 text-white px-10 py-4 rounded text-sm font-bold hover:bg-black transition shadow-lg tracking-widest">
            HUBUNGI KAMI
            </button>
        </Link>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-neutral-950 text-gray-400 py-16 px-6 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1 */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-lg">SkyBus</h4>
            <p className="mb-4 leading-relaxed">Platform pemesanan tiket bus nomor #1 di Indonesia yang mengutamakan kenyamanan dan keamanan penumpang.</p>
            <div className="flex gap-4 mt-6">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition" />
            </div>
          </div>

          {/* Col 2 */}
          <div>
             <h4 className="text-white font-bold mb-4 uppercase">Navigasi</h4>
             <ul className="space-y-3">
               <li><Link href="/" className="hover:text-white transition">Beranda</Link></li>
               <li><Link href="/search" className="hover:text-white transition">Cari Tiket</Link></li>
               <li><Link href="/my-orders" className="hover:text-white transition">Cek Pesanan</Link></li>
               <li><Link href="/promo" className="hover:text-white transition">Promo Terbaru</Link></li>
             </ul>
          </div>

          {/* Col 3 & 4 (Contact & Subscribe) */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-4 uppercase">Hubungi Kami</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-slate-500"/> Jl. Raya Perjalanan No. 88, Jakarta Selatan</div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-slate-500"/> +62 21 5555 8888</div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-slate-500"/> support@skybus.id</div>
            </div>

            <div className="flex flex-col gap-3 max-w-sm">
              <label className="text-xs font-bold uppercase">Berlangganan Newsletter</label>
              <div className="flex gap-2">
                <input type="email" placeholder="Email Anda" className="p-3 bg-neutral-800 rounded border border-neutral-700 w-full focus:outline-none focus:border-slate-500 text-white" />
                <button className="bg-slate-600 text-white px-6 rounded font-bold hover:bg-slate-500 transition text-xs">SUBSCRIBE</button>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between text-xs text-neutral-500 items-center">
          <p>&copy; 2024 SKYBUS TRAVEL INDONESIA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/disclaimer" className="hover:text-white transition">DISCLAIMER</Link>
            <Link href="/privacy" className="hover:text-white transition">PRIVACY POLICY</Link>
            <Link href="/terms" className="hover:text-white transition">TERMS OF USE</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyBus - Booking Tiket Bus Online",
  description: "Platform pemesanan tiket bus antarkota terpercaya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        {children}

        {/* --- GLOBAL FOOTER (Sesuai Wireframe) --- */}
        <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              
              {/* Kolom 1: Brand */}
              <div>
                <div className="text-white text-2xl font-black italic mb-6">
                  SkyBus<span className="text-amber-500">.</span>
                </div>
                <p className="text-sm leading-relaxed mb-6">
                  Platform pemesanan tiket bus antarkota #1 di Indonesia. Nikmati perjalanan aman, nyaman, dan terpercaya bersama mitra otobus terbaik kami.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition"><Facebook className="w-4 h-4"/></a>
                  <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-pink-600 hover:text-white transition"><Instagram className="w-4 h-4"/></a>
                  <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-sky-500 hover:text-white transition"><Twitter className="w-4 h-4"/></a>
                  <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-700 hover:text-white transition"><Linkedin className="w-4 h-4"/></a>
                </div>
              </div>

              {/* Kolom 2: Perusahaan */}
              <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Perusahaan</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/about" className="hover:text-amber-500 transition">Tentang Kami</Link></li>
                  <li><Link href="/mitra" className="hover:text-amber-500 transition">Daftar Jadi Mitra</Link></li>
                  <li><Link href="#" className="hover:text-amber-500 transition">Karir</Link></li>
                  <li><Link href="#" className="hover:text-amber-500 transition">Blog</Link></li>
                </ul>
              </div>

              {/* Kolom 3: Dukungan */}
              <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Dukungan</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/help" className="hover:text-amber-500 transition">Pusat Bantuan</Link></li>
                  <li><Link href="/guide" className="hover:text-amber-500 transition">Cara Pesan</Link></li>
                  <li><Link href="/faq" className="hover:text-amber-500 transition">FAQ</Link></li>
                  <li><Link href="/privacy" className="hover:text-amber-500 transition">Kebijakan Privasi</Link></li>
                  <li><Link href="/terms" className="hover:text-amber-500 transition">Syarat & Ketentuan</Link></li>
                </ul>
              </div>

              {/* Kolom 4: Kontak */}
              <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Hubungi Kami</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Jl. Dipati Ukur No.112-116, Lebakgede, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>+62 22 2504 119</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>cs@skybus.id</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500">&copy; 2026 SkyBus Indonesia. Hak Cipta Dilindungi.</p>
              <div className="flex gap-4">
                 <div className="h-6 w-10 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold tracking-tighter text-slate-500">VISA</div>
                 <div className="h-6 w-10 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold tracking-tighter text-slate-500">MC</div>
                 <div className="h-6 w-10 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold tracking-tighter text-slate-500">BCA</div>
                 <div className="h-6 w-10 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold tracking-tighter text-slate-500">ATM</div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div>
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter flex items-center italic text-white mb-6 hover:opacity-80 transition w-fit"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              SkyBus<span className="text-amber-500 ml-1">.</span>
            </Link>

            <p className="text-sm leading-relaxed mb-6">
              Platform pemesanan tiket bus antarkota #1 di Indonesia. Nikmati perjalanan aman, nyaman, dan terpercaya bersama mitra otobus terbaik kami.
            </p>
            <div className="flex gap-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition"><Facebook className="w-4 h-4" /></a>
              <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-slate-800 rounded-full hover:bg-pink-600 hover:text-white transition"><Instagram className="w-4 h-4" /></a>
              <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-slate-800 rounded-full hover:bg-sky-500 hover:text-white transition"><Twitter className="w-4 h-4" /></a>
              <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-slate-800 rounded-full hover:bg-blue-700 hover:text-white transition"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-amber-500 transition">Tentang Kami</Link></li>
              <li><Link href="/mitra/register" className="hover:text-amber-500 transition">Daftar Jadi Mitra</Link></li>
              <li><Link href="/career" className="hover:text-amber-500 transition">Karir</Link></li>
              <li><Link href="/blog" className="hover:text-amber-500 transition">Blog & Tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Dukungan</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/help" className="hover:text-amber-500 transition">Pusat Bantuan</Link></li>
              <li><Link href="/guide" className="hover:text-amber-500 transition">Cara Pesan</Link></li>
              <li><Link href="/#faq-section" className="hover:text-amber-500 transition">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-500 transition">Kebijakan Privasi</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-amber-500 transition">Kebijakan Kuki</Link></li>
              <li><Link href="/terms" className="hover:text-amber-500 transition">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <span>Jl. Dipati Ukur No.112-116, Bandung, Jawa Barat 40132</span>
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

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-xs text-slate-500">&copy; 2026 SkyBus Indonesia. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

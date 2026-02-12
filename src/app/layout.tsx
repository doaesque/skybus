import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterWrapper from "@/components/FooterWrapper"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- METADATA CONFIGURATION ---
export const metadata: Metadata = {
  title: {
    template: '%s | SkyBus Indonesia',
    default: 'SkyBus - Pesan Tiket Bus Online Termurah',
  },
  description: "Platform pemesanan tiket bus antarkota dan travel terpercaya di Indonesia. Pesan tiket mudah, cepat, dan aman.",
  icons: {
    icon: '/favicon.ico', 
  },
  openGraph: {
    title: 'SkyBus Indonesia',
    description: 'Solusi perjalanan bus antarkota Anda.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100`}
      >
        {/* Konten Utama */}
        {children}
        
        {/* Footer Global (Client Component Wrapper) */}
        <FooterWrapper />
      </body>
    </html>
  );
}

"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Daftar halaman yang tidak menampilkan footer
  const noFooterPages = [
    "/login",
    "/signup",
    "/booking",
    "/payment",
    "/eticket"
  ];

  const hideFooter = noFooterPages.includes(pathname);

  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans`}>
        
        {children}

        {/* Tampilkan Footer hanya jika rute saat ini tidak ada di daftar hideFooter */}
        {!hideFooter && <Footer />}
        
      </body>
    </html>
  );
}

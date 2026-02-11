"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Daftar halaman tanpa footer
  const noFooterPages = [
    "/login",
    "/signup",
    "/booking",
    "/payment",
    "/eticket",
    "/mitra/register",
    "/ticket"
  ];

  // Cek apakah pathname ada di list atau diawali dengan path tertentu (opsional)
  const hideFooter = noFooterPages.includes(pathname);

  if (hideFooter) return null;

  return <Footer />;
}
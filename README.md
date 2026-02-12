# SkyBus - Platform Pemesanan Tiket Bus Online

SkyBus adalah aplikasi web modern untuk layanan pemesanan tiket bus dan travel antar kota di Indonesia. Proyek ini dikembangkan untuk mendemonstrasikan implementasi teknologi web terbaru dengan fokus pada performa tinggi, desain responsif, dan pengalaman pengguna yang intuitif.

Aplikasi ini dibangun menggunakan arsitektur Next.js 16 (App Router) dan gaya antarmuka menggunakan Tailwind CSS v4.

## Fitur Utama

* **Pencarian Tiket Real-time:** Memungkinkan pengguna mencari ketersediaan tiket berdasarkan asal, tujuan, tanggal keberangkatan, dan jumlah penumpang.
* **Filter Pencarian Lanjutan:** Pengguna dapat menyaring hasil berdasarkan lokasi spesifik (Terminal/Pool) dan jenis perjalanan (Sekali Jalan atau Pulang Pergi).
* **Antarmuka Modern & Responsif:** Desain yang sepenuhnya responsif untuk perangkat mobile dan desktop, dilengkapi dengan dukungan Mode Gelap (Dark Mode).
* **Integrasi Data Mitra:** Menampilkan simulasi data dari berbagai operator bus populer dengan detail fasilitas armada (Executive, Sleeper, Shuttle).
* **Sistem Kode Promo:** Fitur interaktif untuk penerapan diskon pada transaksi.
* **Halaman Informasi Lengkap:** Mencakup halaman Bantuan (FAQ), Tentang Kami, Daftar Mitra, dan Panduan Pemesanan.

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi berikut:

* **Framework:** Next.js 16.1 (App Router)
* **Library UI:** React 19
* **Styling:** Tailwind CSS v4
* **Bahasa:** TypeScript
* **Ikon:** Lucide React
* **Animasi:** Framer Motion
* **Utilitas PDF:** jspdf & html2canvas (untuk pembuatan E-Ticket)

## Struktur Proyek

Berikut adalah gambaran umum struktur direktori proyek:

* `src/app`: Berisi halaman aplikasi dan layout (Next.js App Router).
* `src/components`: Komponen UI yang dapat digunakan kembali (reusable).
* `src/constants`: Data statis (mock data) untuk rute, bus, dan promo.
* `src/lib`: Fungsi utilitas dan helper.
* `public`: Aset statis seperti gambar dan logo.

## Instalasi dan Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda:

1. **Clone repositori**

```bash
git clone [https://github.com/username-anda/skybus.git](https://github.com/username-anda/skybus.git)
cd skybus
```

1. **Instal dependensi**

```bash
npm install
```

1. **Jalankan server pengembangan**

```bash
npm run dev
```

1. **Akses aplikasi**
Buka peramban web dan kunjungi `http://localhost:3000`.

## Lisensi

Proyek ini didistribusikan di bawah Lisensi MIT. Lihat file LICENSE untuk informasi lebih lanjut.

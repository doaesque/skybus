# 🚌 SkyBus — Intercity Transit Booking Architecture

[![Next.js](https://img.shields.io/badge/Next.js-16_(App_Router)-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

SkyBus is an engineering showcase modeling the architectural scale and interface complexity of modern Online Travel Agent (OTA) platforms for intercity transit across Indonesia.

---

## ⚡ Architectural Highlights

Instead of treating booking as a single isolated view, SkyBus implements a multi-tenant portal pattern designed around nested App Router structures:

* **Triple-Tier Layout Segregation:** Independent route hierarchies and layout boundaries for End Customers (`/booking`), Bus Operators/Partners (`/admin/partner`), and Platform Operators (`/admin/dashboard`).
* **Interactive Fleet Seat Matrix:** Real-time visual seat selector parsing multi-class layouts (Executive $2+2$, Sleeper $1+1$, Shuttle configs) with state reservation locking.
* **Deterministic Search & Multi-Param Filtering:** High-performance route filtering engine handling origin/destination terminal hubs, departure time windows, operator tiers, and promotional discount application.
* **Client-Side E-Ticket Compilation:** Generates structured printable/downloadable PDF tickets (`jspdf` + `html2canvas`) dynamically upon checkout verification.
* **Production Polish & Compliance:** Complete, production-ready legal and informational scaffolding (`/terms`, `/privacy`, `/cookie-policy`, `/help`).

---

## 🛠️ Stack

* **Framework:** Next.js (App Router, Server & Client Components)
* **Language:** TypeScript
* **Design System & Styling:** Tailwind CSS v4, Lucide React
* **Document Engine:** `jspdf`, `html2canvas`

---

## 📂 Route Architecture

```text
src/app/
├── (public)/
│   ├── booking/        # Search filters, bus selection, seat matrix
│   ├── payment/        # Multi-method transaction simulation
│   └── eticket/        # Rendered client-side ticket artifact
├── mitra/              # Fleet partner landing & registration portal
├── admin/
│   ├── dashboard/      # Platform revenue & fleet metrics
│   ├── partner/fleets/ # Partner fleet schedule & seat allocation
│   └── users/          # Account verification registry
└── (policies)/         # Terms, Privacy, Cookie, and Guide routes

```

---

## 🚀 Setup

```bash
git clone https://github.com/doaesque/skybus.git
cd skybus
npm install
npm run dev

```

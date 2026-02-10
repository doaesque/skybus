"use client";

import React from 'react';
import { ArrowLeft, Briefcase, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CareerPage() {
  const jobs = [
    { title: "Senior Frontend Engineer", dept: "Engineering", loc: "Bandung (Hybrid)" },
    { title: "Product Designer (UI/UX)", dept: "Design", loc: "Remote" },
    { title: "Customer Success Specialist", dept: "Operations", loc: "Jakarta" },
    { title: "Business Development Manager", dept: "Business", loc: "Surabaya" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans pb-20 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm sticky top-0 z-40 flex items-center gap-4 border-b dark:border-slate-800">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <h1 className="font-black text-lg">Karir di SkyBus</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4 text-blue-600 dark:text-blue-400">Bergabung Bersama Kami</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Bantu kami merevolusi transportasi darat di Indonesia. Kami mencari talenta terbaik untuk tumbuh bersama.
            </p>
        </div>

        <div className="grid gap-4">
            {jobs.map((job, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-500 transition cursor-pointer group">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{job.title}</h3>
                        <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> {job.dept}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.loc}</span>
                        </div>
                    </div>
                    <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition">
                        Lamar
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
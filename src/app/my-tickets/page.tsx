"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BUS_DATA } from '@/constants/data';
import { Clock, MapPin, Calendar, ChevronRight, Ticket } from 'lucide-react';

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  // Dummy Data Riwayat
  const myTickets = [
    { id: 'SKY-8821', busId: '1', date: '2026-02-12', status: 'active', seats: '3A, 3B' },
    { id: 'SKY-1029', busId: '4', date: '2026-01-20', status: 'completed', seats: '1A' },
    { id: 'SKY-0092', busId: '3', date: '2025-12-15', status: 'completed', seats: '12C' },
  ];

  const filteredTickets = myTickets.filter(t => activeTab === 'active' ? t.status === 'active' : t.status === 'completed');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20">
      <div className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-black text-slate-800 dark:text-white">Tiket Saya</h1>
          </div>
          {/* Tabs */}
          <div className="flex max-w-3xl mx-auto px-4">
              <button 
                onClick={() => setActiveTab('active')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
              >
                  Tiket Aktif
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
              >
                  Riwayat
              </button>
          </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {filteredTickets.length === 0 ? (
              <div className="text-center py-20">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Ticket className="w-8 h-8"/>
                  </div>
                  <h3 className="font-bold text-lg">Belum ada tiket</h3>
                  <p className="text-slate-500 text-sm mb-6">Yuk rencanakan perjalananmu sekarang!</p>
                  <Link href="/ticket">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition">Cari Tiket Bus</button>
                  </Link>
              </div>
          ) : (
              filteredTickets.map((ticket) => {
                  const bus = BUS_DATA.find(b => b.id === ticket.busId) || BUS_DATA[0];
                  return (
                      <Link href={`/eticket?busId=${ticket.busId}&date=${ticket.date}&seats=${ticket.seats}`} key={ticket.id}>
                          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-300 transition shadow-sm group">
                              <div className="flex justify-between items-start mb-4">
                                  <div>
                                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded mb-2 inline-block uppercase tracking-wider">{ticket.id}</span>
                                      <h3 className="font-bold text-lg">{bus.name}</h3>
                                      <p className="text-xs text-slate-500">{bus.type}</p>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${ticket.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                      {ticket.status === 'active' ? 'Akan Berangkat' : 'Selesai'}
                                  </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm mb-4">
                                  <div className="flex-1">
                                      <p className="text-xs text-slate-400">Jadwal</p>
                                      <p className="font-bold">{new Date(ticket.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})} • {bus.departureTime}</p>
                                  </div>
                                  <div className="flex-1 border-l pl-4 border-slate-100 dark:border-slate-800">
                                      <p className="text-xs text-slate-400">Kursi</p>
                                      <p className="font-bold">{ticket.seats}</p>
                                  </div>
                              </div>

                              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                                  <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                          <span className="text-xs font-medium truncate">{bus.from}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                          <span className="text-xs font-medium truncate">{bus.to}</span>
                                      </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                              </div>
                          </div>
                      </Link>
                  );
              })
          )}
      </div>
    </div>
  );
}

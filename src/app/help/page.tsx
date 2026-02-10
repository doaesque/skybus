import React from 'react';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="bg-slate-700 text-white py-16 px-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Pusat Bantuan</h1>
          <p className="text-slate-300">Apa yang bisa kami bantu hari ini?</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-8">
        <div className="bg-white shadow-lg rounded-lg p-8 grid md:grid-cols-2 gap-6 text-center border">
            <div className="p-4 hover:bg-gray-50 rounded transition cursor-pointer">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-bold">Live Chat</h3>
                <p className="text-xs text-slate-500">Balasan instan 24/7</p>
            </div>
            <div className="p-4 hover:bg-gray-50 rounded transition cursor-pointer">
                <Phone className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-bold">Call Center</h3>
                <p className="text-xs text-slate-500">+62 812-3456-7890</p>
            </div>
        </div>

        <div className="py-12 space-y-4">
            <h2 className="font-bold text-xl mb-6">Pertanyaan Populer</h2>
            {['Cara reschedule tiket?', 'Bagaimana cara refund?', 'Metode pembayaran apa saja?'].map((q, i) => (
                <div key={i} className="border p-4 rounded flex justify-between items-center cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-sm">{q}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
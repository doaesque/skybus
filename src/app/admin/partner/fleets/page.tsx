export default function PartnerFleetsPage() {
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manajemen Armada Bus</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Tambah Bus</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-lg">Bus Executive {i}</h3>
                    <p className="text-sm text-slate-500">Plat: B 7{i}29 XA</p>
                    <div className="mt-4 flex gap-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Siap Operasi</span>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-bold">32 Kursi</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
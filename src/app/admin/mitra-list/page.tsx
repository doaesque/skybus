export default function MitraListPage() {
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Daftar Mitra Operator</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Tambah Mitra Baru</button>
        </div>
        {/* Konten dummy list mitra disini */}
        <div className="p-10 text-center border-2 border-dashed border-slate-300 rounded-xl text-slate-400">
            List seluruh PO Bus yang bekerjasama akan tampil di sini.
        </div>
    </div>
  );
}
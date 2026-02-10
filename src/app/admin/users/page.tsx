export default function UsersPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Data Pengguna Terdaftar</h2>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 font-bold uppercase text-xs">
                <tr>
                    <th className="px-6 py-3">Nama</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-bold">Budi Santoso</td>
                    <td className="px-6 py-4">user@gmail.com</td>
                    <td className="px-6 py-4">User</td>
                    <td className="px-6 py-4 text-green-500 font-bold">Aktif</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-bold">PO Sinar Jaya</td>
                    <td className="px-6 py-4">mitra@sinarjaya.com</td>
                    <td className="px-6 py-4">Partner</td>
                    <td className="px-6 py-4 text-green-500 font-bold">Verified</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
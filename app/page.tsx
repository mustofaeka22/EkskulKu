import { ambilSemuaEkskul } from "../data/ambil";

export default async function Home() {
  // Mengambil data ekstrakurikuler dengan simulasi jeda waktu
  const listEkskul = await ambilSemuaEkskul();

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Header Judul */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2">
            EkskulKu 🎒
          </h1>
          <p className="text-gray-600">
            Sistem Manajemen Ekstrakurikuler Sekolah
          </p>
        </div>

        {/* Daftar Katalog Ekskul */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listEkskul.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-800">{item.nama}</h2>
                  <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                    {item.kategori}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>📅 <span className="font-medium">Jadwal:</span> {item.hari} (Sesi {item.sesi})</p>
                  <p>👨‍🏫 <span className="font-medium">Pembina:</span> {item.pembina}</p>
                  <p>👥 <span className="font-medium">Kuota Maksimal:</span> {item.kuota} Siswa</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-400">ID Ekskul: #{item.id}</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded">
                  Tersedia
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
import { Metadata } from "next";
import { ambilSemuaEkskul } from "../data/ambil";
import { pendaftar } from "../data/ekskul";
import FilterEkskul from "../components/FilterEkskul";
import KartuEkskul from "../components/KartuEkskul";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Daftar Ekskul",
};

interface PageProps {
  searchParams: Promise<{
    kategori?: string;
    hari?: string;
  }>;
}

export default async function HalamanUtama({ searchParams }: PageProps) {
  const params = await searchParams;
  const kategoriFilter = params.kategori || "Semua";
  const hariFilter = params.hari || "Semua";

  const semuaEkskul = await ambilSemuaEkskul();

  const daftarEkskul = semuaEkskul.map((item) => {
    const jumlahPendaftar = pendaftar.filter(
      (p) => p.ekskulId === item.id
    ).length;
    const sisaTempat = item.kuota - jumlahPendaftar;
    const isPenuh = sisaTempat <= 0;

    return {
      ...item,
      jumlahPendaftar,
      sisaTempat: isPenuh ? 0 : sisaTempat,
      isPenuh,
    };
  }).filter((item) => {
    const cocokKategori =
      kategoriFilter === "Semua" || item.kategori === kategoriFilter;
    const cocokHari =
      hariFilter === "Semua" || item.hari.toLowerCase().includes(hariFilter.toLowerCase());
    return cocokKategori && cocokHari;
  });

  const daftarKategori = ["Semua", "Olahraga", "Seni", "Akademik", "Teknologi"];
  const daftarHari = ["Semua", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8fafc",
      color: "#0f172a",
      paddingBottom: "60px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Memanggil Komponen Navbar Terpisah */}
      <Navbar />

      {/* Konten Utama */}
      <div style={{ maxWidth: "900px", margin: "40px auto 0 auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Judul & Keterangan */}
        <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "800", margin: "0 0 6px 0", color: "#0f172a" }}>
            Daftar Ekstrakurikuler Sekolah
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            Pilih dan saring kegiatan ekstrakurikuler sesuai minat serta jadwal luangmu.
          </p>
        </div>

        {/* Filter Komponen */}
        <FilterEkskul
          kategoriFilter={kategoriFilter}
          hariFilter={hariFilter}
          daftarKategori={daftarKategori}
          daftarHari={daftarHari}
        />

        {/* Informasi Hasil */}
        <p style={{ fontSize: "14px", fontWeight: "500", color: "#64748b", margin: 0 }}>
          Menampilkan <strong style={{ color: "#1e293b" }}>{daftarEkskul.length}</strong> ekskul ditemukan
        </p>

        {/* List / Grid Komponen */}
        {daftarEkskul.length === 0 ? (
          <div style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "28px", margin: "0 0 10px 0" }}>🔍</p>
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b", margin: "0 0 6px 0" }}>Tidak ada ekskul yang cocok</h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              Coba ubah filter kategori atau hari untuk mencari pilihan lainnya.
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))"
          }}>
            {daftarEkskul.map((item) => (
              <KartuEkskul key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
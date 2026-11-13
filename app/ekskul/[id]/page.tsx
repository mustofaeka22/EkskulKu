import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { ambilEkskul } from "../../../data/ambil";
import { JAM_SESI } from "../../../data/ekskul";
import DaftarAnggota from "../../../components/DaftarAnggota";
import FormDaftar from "../../../components/FormDaftar";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const ekskul = await ambilEkskul(Number(id));
  if (!ekskul) return { title: "Ekskul Tidak Ditemukan" };
  return { title: `Detail - ${ekskul.nama}` };
}

export default async function HalamanDetail({ params }: PageProps) {
  const { id } = await params;
  const ekskulId = Number(id);
  const ekskul = await ambilEkskul(ekskulId);

  if (!ekskul) {
    notFound();
  }

  // Ambil data dari cookie untuk auto-fill form
  const cookieStore = await cookies();
  const initialNama = cookieStore.get("nama")?.value || "";
  const initialKelas = cookieStore.get("kelas")?.value || "";

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8fafc",
      color: "#0f172a",
      padding: "40px 20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Tombol Kembali */}
        <div>
          <Link
            href="/"
            style={{ fontSize: "13px", fontWeight: "600", color: "#4f46e5", textDecoration: "none" }}
          >
            &larr; Kembali ke Daftar Ekskul
          </Link>
        </div>

        {/* Info Utama Ekskul */}
        <div style={{ background: "#ffffff", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: "700", color: "#4f46e5", background: "#eef2ff", padding: "4px 10px", borderRadius: "8px", marginBottom: "10px" }}>
              {ekskul.kategori}
            </span>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              {ekskul.nama}
            </h1>
          </div>

          <div style={{ display: "grid", gap: "10px", fontSize: "14px", color: "#475569", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
            <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📅</span> 
              <strong style={{ color: "#334155" }}>Jadwal: {ekskul.hari}, Sesi {ekskul.sesi}</strong> 
              <span style={{ color: "#94a3b8", fontSize: "13px" }}>({JAM_SESI[ekskul.sesi]})</span>
            </p>
            <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span>👨‍🏫</span> 
              <span>Pembina: <strong style={{ color: "#334155" }}>{ekskul.pembina}</strong></span>
            </p>
            <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🎯</span> 
              <span>Total Kuota: <strong style={{ color: "#334155" }}>{ekskul.kuota} Siswa</strong></span>
            </p>
          </div>
        </div>

        {/* Formulir Pendaftaran (Langkah 4) */}
        <FormDaftar ekskulId={ekskulId} initialNama={initialNama} initialKelas={initialKelas} />

        {/* Bagian Anggota dengan Suspense */}
        <Suspense fallback={
          <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", textAlign: "center", color: "#64748b", fontSize: "14px", fontStyle: "italic" }}>
            Memuat anggota...
          </div>
        }>
          <DaftarAnggota ekskulId={ekskulId} kuota={ekskul.kuota} />
        </Suspense>

      </div>
    </main>
  );
}
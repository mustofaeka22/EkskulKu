import { cookies } from "next/headers";
import { ambilAnggota } from "../data/ambil";

interface DaftarAnggotaProps {
  ekskulId: number;
  kuota: number;
}

export default async function DaftarAnggota({ ekskulId, kuota }: DaftarAnggotaProps) {
  const anggotaList = await ambilAnggota(ekskulId);
  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value;

  const terisi = anggotaList.length;

  return (
    <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>
        Daftar Anggota Terdaftar
      </h3>
      <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
        {terisi} dari {kuota} tempat terisi
      </p>

      {terisi === 0 ? (
        <p style={{ fontSize: "14px", color: "#94a3b8", fontStyle: "italic", margin: 0 }}>
          Belum ada anggota.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {anggotaList.map((p) => {
            const isKamu = namaCookie && p.nama.toLowerCase() === namaCookie.toLowerCase();
            return (
              <li key={p.nomor} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                background: "#f8fafc",
                borderRadius: "10px",
                border: "1px solid #f1f5f9"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", width: "24px" }}>
                    #{p.nomor}
                  </span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                      {p.nama}
                      {isKamu && (
                        <span style={{
                          background: "#eef2ff",
                          color: "#4f46e5",
                          fontSize: "10px",
                          fontWeight: "700",
                          padding: "2px 8px",
                          borderRadius: "6px"
                        }}>
                          Kamu
                        </span>
                      )}
                    </p>
                    <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>
                      Kelas: {p.kelas}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
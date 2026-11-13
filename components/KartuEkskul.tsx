import Link from "next/link";
import { JAM_SESI } from "../data/ekskul";

interface KartuEkskulProps {
  item: {
    id: number;
    nama: string;
    kategori: string;
    hari: string;
    sesi: number;
    kuota: number;
    pembina: string;
    sisaTempat: number;
    isPenuh: boolean;
  };
}

export default function KartuEkskul({ item }: KartuEkskulProps) {
  return (
    <div style={{
      background: "#ffffff",
      padding: "24px",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "20px"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
          <div>
            <span style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: "700",
              color: "#4f46e5",
              background: "#eef2ff",
              padding: "4px 10px",
              borderRadius: "8px",
              marginBottom: "8px"
            }}>
              {item.kategori}
            </span>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
              {item.nama}
            </h2>
          </div>
          {item.isPenuh ? (
            <span style={{
              background: "#fff1f2",
              color: "#e11d48",
              border: "1px solid #ffe4e6",
              fontSize: "11px",
              fontWeight: "700",
              padding: "4px 12px",
              borderRadius: "20px",
              whiteSpace: "nowrap"
            }}>
              Penuh
            </span>
          ) : (
            <span style={{
              background: "#ecfdf5",
              color: "#047857",
              border: "1px solid #d1fae5",
              fontSize: "11px",
              fontWeight: "600",
              padding: "4px 12px",
              borderRadius: "20px",
              whiteSpace: "nowrap"
            }}>
              Sisa {item.sisaTempat} dari {item.kuota} tempat
            </span>
          )}
        </div>
        
        <div style={{ fontSize: "13px", color: "#475569", display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <span>📅</span> 
            <strong style={{ color: "#334155" }}>{item.hari}, Sesi {item.sesi}</strong> 
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>({JAM_SESI[item.sesi]})</span>
          </p>
          <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <span>👨‍🏫</span> 
            <span>Pembina: <strong style={{ color: "#334155" }}>{item.pembina}</strong></span>
          </p>
        </div>
      </div>

      <div style={{
        paddingTop: "16px",
        borderTop: "1px solid #f1f5f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "monospace" }}>ID: #{item.id}</span>
        <Link
          href={`/ekskul/${item.id}`}
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#4f46e5",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <span>Lihat Detail</span> &rarr;
        </Link>
      </div>
    </div>
  );
}
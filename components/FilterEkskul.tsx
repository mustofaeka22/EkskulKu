interface FilterEkskulProps {
  kategoriFilter: string;
  hariFilter: string;
  daftarKategori: string[];
  daftarHari: string[];
}

export default function FilterEkskul({
  kategoriFilter,
  hariFilter,
  daftarKategori,
  daftarHari,
}: FilterEkskulProps) {
  return (
    <form style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      alignItems: "flex-end"
    }}>
      <div style={{ flex: "1", minWidth: "180px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
          Kategori
        </label>
        <select
          name="kategori"
          defaultValue={kategoriFilter}
          style={{
            width: "100%",
            background: "#f8fafc",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#334155",
            outline: "none"
          }}
        >
          {daftarKategori.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>

      <div style={{ flex: "1", minWidth: "180px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
          Hari
        </label>
        <select
          name="hari"
          defaultValue={hariFilter}
          style={{
            width: "100%",
            background: "#f8fafc",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#334155",
            outline: "none"
          }}
        >
          {daftarHari.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="submit"
          style={{
            background: "#4f46e5",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
          }}
        >
          Cari
        </button>
        {(kategoriFilter !== "Semua" || hariFilter !== "Semua") && (
          <a
            href="/"
            style={{
              background: "#f1f5f9",
              color: "#475569",
              fontSize: "14px",
              fontWeight: "500",
              padding: "10px 16px",
              borderRadius: "10px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center"
            }}
          >
            Reset
          </a>
        )}
      </div>
    </form>
  );
}
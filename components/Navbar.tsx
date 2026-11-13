import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 10,
      boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "20px" }}>🎒</span>
        <span style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em" }}>
          EkskulKu
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link href="/" style={{ fontSize: "14px", fontWeight: "600", color: "#4f46e5", textDecoration: "none" }}>
          Beranda
        </Link>
        <span style={{ fontSize: "13px", color: "#64748b", background: "#f1f5f9", padding: "6px 12px", borderRadius: "8px", fontWeight: "500" }}>
          Sistem Sekolah
        </span>
      </div>
    </nav>
  );
}
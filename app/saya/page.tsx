import { cookies } from "next/headers";
import Link from "next/link";
import { batalkanPendaftaran } from "../actions"; // Sesuaikan jalur Server Action jika ada

export default async function HalamanPesanan() {
  const cookieStore = await cookies();
  const cookieData = cookieStore.get("pendaftaran_event"); // Sesuaikan nama cookie projectmu

  // 1. Kondisi Tanpa Cookie
  if (!cookieData) {
    return (
      <main style={{ minHeight: "100vh", padding: "40px 20px", background: "#f8fafc", fontFamily: "system-ui" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#1e293b" }}>Event Saya</h2>
          <p style={{ color: "#64748b", marginBottom: "24px" }}>Kamu belum mendaftar apa pun.</p>
          <Link href="/" style={{ background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "500" }}>
            Jelajahi Event
          </Link>
        </div>
      </main>
    );
  }

  // Parse data dari cookie
  let dataPendaftar;
  try {
    dataPendaftar = JSON.parse(cookieData.value);
  } catch (e) {
    dataPendaftar = null;
  }

  // 2. Kondisi Cookie ada, tapi belum ada daftar event
  if (!dataPendaftar || !dataPendaftar.listEvent || dataPendaftar.listEvent.length === 0) {
    return (
      <main style={{ minHeight: "100vh", padding: "40px 20px", background: "#f8fafc", fontFamily: "system-ui" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#1e293b" }}>Event Saya</h2>
          <p style={{ color: "#64748b", marginBottom: "24px" }}>Belum ada event yang diikuti.</p>
          <Link href="/" style={{ background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "500" }}>
            Cari Event Lainnya
          </Link>
        </div>
      </main>
    );
  }

  // 3. Kondisi dengan Cookie & Ada Pendaftaran
  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", background: "#f8fafc", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Ringkasan Pendaftar */}
        <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>Event Saya</h2>
          <p style={{ color: "#475569", fontSize: "15px" }}>
            Ringkasan: <strong>{dataPendaftar.nama}</strong> · {dataPendaftar.kelas} · <strong>{dataPendaftar.listEvent.length} event diikuti</strong>
          </p>
        </div>

        {/* Daftar Event yang Diikuti */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {dataPendaftar.listEvent.map((ev: any, index: number) => (
            <div key={index} style={{ background: "#fff", padding: "20px 24px", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Link href={`/event/${ev.id}`} style={{ fontSize: "18px", fontWeight: "bold", color: "#2563eb", textDecoration: "none" }}>
                  {ev.namaEvent}
                </Link>
                <span style={{ fontSize: "14px", color: "#64748b" }}>
                  📅 {ev.tanggal} | ⏰ {ev.sesi}
                </span>
              </div>

              {/* Tombol Batalkan dengan Server Action */}
              <form action={batalkanPendaftaran}>
                <input type="hidden" name="eventId" value={ev.id} />
                <button type="submit" style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
                  Batalkan
                </button>
              </form>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function batalkanPendaftaran(formData: FormData) {
  const ekskulId = formData.get("ekskulId");
  const cookieStore = await cookies();
  const cookieData = cookieStore.get("pendaftaran_ekskul");

  if (!cookieData || !ekskulId) return;

  try {
    let dataPendaftar = JSON.parse(cookieData.value);

    // Filter keluar ekskul yang dibatalkan
    dataPendaftar.listEkskul = dataPendaftar.listEkskul.filter(
      (item: any) => item.id !== ekskulId
    );

    // Perbarui cookie dengan data terbaru
    cookieStore.set("pendaftaran_ekskul", JSON.stringify(dataPendaftar));

    // Revalidate path agar halaman /saya, detail ekskul, dan sisa tempat langsung ter-update otomatis
    revalidatePath("/saya");
    revalidatePath(`/ekskul/${ekskulId}`);
    revalidatePath("/ekskul");
  } catch (error) {
    console.error("Gagal membatalkan pendaftaran:", error);
  }
}
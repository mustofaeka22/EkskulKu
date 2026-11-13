"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { pendaftar, ekskul, JAM_SESI } from "../../../data/ekskul";

export async function daftarEkskulAction(prevState: any, formData: FormData) {
  const ekskulId = Number(formData.get("ekskulId"));
  const nama = String(formData.get("nama") || "").trim();
  const kelas = String(formData.get("kelas") || "").trim();

  const errors: { nama?: string; kelas?: string } = {};

  if (nama.length < 3) {
    errors.nama = "Nama minimal 3 huruf.";
  }
  if (kelas.length < 3) {
    errors.kelas = "Kelas minimal 3 karakter.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Validasi gagal",
      errors,
      inputs: { nama, kelas },
    };
  }

  const targetEkskul = ekskul.find((e) => e.id === ekskulId);
  if (!targetEkskul) {
    return {
      success: false,
      message: "ID ekskul tidak valid atau tidak ditemukan.",
      errors: {},
      inputs: { nama, kelas },
    };
  }

  const pendaftarEkskulIni = pendaftar.filter((p) => p.ekskulId === ekskulId);
  if (pendaftarEkskulIni.length >= targetEkskul.kuota) {
    return {
      success: false,
      message: `Kuota ${targetEkskul.nama} sudah penuh (${targetEkskul.kuota} orang).`,
      errors: {},
      inputs: { nama, kelas },
    };
  }

  const sudahAda = pendaftarEkskulIni.some(
    (p) => p.nama.toLowerCase() === nama.toLowerCase() && p.kelas.toLowerCase() === kelas.toLowerCase()
  );
  if (sudahAda) {
    return {
      success: false,
      message: `${nama} (${kelas}) sudah terdaftar di ${targetEkskul.nama}.`,
      errors: {},
      inputs: { nama, kelas },
    };
  }

  const ekskulDidepanOlehMuridIni = pendaftar.filter(
    (p) => p.nama.toLowerCase() === nama.toLowerCase()
  );

  for (let p of ekskulDidepanOlehMuridIni) {
    const ekskulLain = ekskul.find((e) => e.id === p.ekskulId);
    if (ekskulLain && ekskulLain.hari === targetEkskul.hari && ekskulLain.sesi === targetEkskul.sesi) {
      return {
        success: false,
        message: `Jadwal bentrok dengan ${ekskulLain.nama} (${ekskulLain.hari}, Sesi ${ekskulLain.sesi}).`,
        errors: {},
        inputs: { nama, kelas },
      };
    }
  }

  const nomorBaru = pendaftar.length > 0 ? Math.max(...pendaftar.map((p) => p.nomor)) + 1 : 1;
  pendaftar.push({
    nomor: nomorBaru,
    ekskulId,
    nama,
    kelas,
  });

  const cookieStore = await cookies();
  cookieStore.set("nama", nama, { path: "/" });
  cookieStore.set("kelas", kelas, { path: "/" });

  revalidatePath(`/ekskul/${ekskulId}`);
  revalidatePath("/");

  return {
    success: true,
    message: `Pendaftaran #${nomorBaru} berhasil: ${targetEkskul.nama}, ${targetEkskul.hari}, sesi ${targetEkskul.sesi} (${JAM_SESI[targetEkskul.sesi]}).`,
    errors: {},
    inputs: { nama: "", kelas: "" },
  };
}
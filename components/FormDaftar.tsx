"use client";

import { useActionState } from "react";
import { daftarEkskulAction } from "../app/ekskul/[id]/actions";

interface FormDaftarProps {
  ekskulId: number;
  initialNama?: string;
  initialKelas?: string;
}

interface ActionState {
  success: boolean;
  message: string;
  errors?: { nama?: string; kelas?: string };
  inputs?: { nama: string; kelas: string };
}

const initialState: ActionState = {
  success: false,
  message: "",
  errors: {},
  inputs: { nama: "", kelas: "" },
};

export default function FormDaftar({ ekskulId, initialNama = "", initialKelas = "" }: FormDaftarProps) {
  const [state, formAction, isPending] = useActionState(daftarEkskulAction, {
    ...initialState,
    inputs: { nama: initialNama, kelas: initialKelas },
  });

  return (
    <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>
        Formulir Pendaftaran Ekskul
      </h3>

      {state.success && (
        <div style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #d1fae5", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", marginBottom: "16px", fontWeight: "500" }}>
          {state.message}
        </div>
      )}

      {state.message && !state.success && state.message !== "Validasi gagal" && (
        <div style={{ background: "#fff1f2", color: "#e11d48", border: "1px solid #ffe4e6", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", marginBottom: "16px", fontWeight: "500" }}>
          {state.message}
        </div>
      )}

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input type="hidden" name="ekskulId" value={ekskulId} />

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#64748b" }}>
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama"
            defaultValue={state.inputs?.nama}
            placeholder="Contoh: Budi Santoso"
            style={{
              width: "100%",
              background: "#f8fafc",
              border: `1px solid ${state.errors?.nama ? "#e11d48" : "#cbd5e1"}`,
              borderRadius: "10px",
              padding: "10px 14px",
              fontSize: "14px",
              color: "#334155",
              outline: "none"
            }}
          />
          {state.errors?.nama && (
            <span style={{ fontSize: "12px", color: "#e11d48", fontWeight: "500" }}>
              {state.errors.nama}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#64748b" }}>
            Kelas
          </label>
          <input
            type="text"
            name="kelas"
            defaultValue={state.inputs?.kelas}
            placeholder="Contoh: XII RPL"
            style={{
              width: "100%",
              background: "#f8fafc",
              border: `1px solid ${state.errors?.kelas ? "#e11d48" : "#cbd5e1"}`,
              borderRadius: "10px",
              padding: "10px 14px",
              fontSize: "14px",
              color: "#334155",
              outline: "none"
            }}
          />
          {state.errors?.kelas && (
            <span style={{ fontSize: "12px", color: "#e11d48", fontWeight: "500" }}>
              {state.errors.kelas}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            background: isPending ? "#94a3b8" : "#4f46e5",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Memproses..." : "Daftar Ekskul Ini"}
        </button>
      </form>
    </div>
  );
}
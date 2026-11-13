import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s · EkskulKu",
    default: "EkskulKu",
  },
  description: "Sistem Manajemen Ekstrakurikuler Sekolah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
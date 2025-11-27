"use client";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    // Penambahan key={pathname} adalah kunci agar animasi selalu jalan tiap pindah halaman
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
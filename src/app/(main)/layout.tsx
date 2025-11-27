"use client";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <Loader2 className="animate-spin text-[#ff8c42]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-[#ff8c42] selection:text-white flex flex-col">
      {/* HEADER DESKTOP */}
      <Header />

      {/* KONTEN UTAMA */}
      {/* pt-24: Jarak atas agar tidak tertutup header */}
      {/* px-6: Jarak kiri-kanan agar teks tidak mepet layar */}
      {/* max-w-7xl: Membatasi lebar agar tidak terlalu wide di monitor besar */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 pb-28 md:pb-10 relative z-10">
        {children}
      </main>

      {/* BOTTOM NAV MOBILE */}
      <BottomNav />
    </div>
  );
}

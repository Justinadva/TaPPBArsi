"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  LogOut, 
  Settings, 
  Award, 
  Clock, 
  Loader2, 
  Flame, 
  BookOpen, 
  ChevronRight,
  Edit2,
  MapPin,
  Calendar
} from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Proteksi Halaman
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin text-[#ff8c42]" size={40} />
      </div>
    );
  }

  // Dummy Data untuk Tampilan (Nanti bisa diganti data real)
  const stats = [
    { label: "Materi Selesai", value: "12", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Jam Belajar", value: "48h", icon: Clock, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Streak", value: "5 Hari", icon: Flame, color: "text-red-400", bg: "bg-red-400/10" },
  ];

  const badges = [
    { name: "Early Adopter", icon: "🚀" },
    { name: "Design Master", icon: "🎨" },
    { name: "Fast Learner", icon: "⚡" },
  ];

  return (
    <><div className="relative w-full h-48 rounded-[32px] overflow-hidden bg-gradient-to-r from-gray-800 to-[#1a1a1a] border border-white/10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-[#ff8c42]/20 rounded-full blur-[100px]"></div>
    </div><div className="grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-24 px-4">

        {/* === KOLOM KIRI: Profil User === */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-[32px] flex flex-col items-center text-center relative bg-[#121212]/80 backdrop-blur-xl">
            {/* Avatar & Edit */}
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-[#121212] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl font-bold text-white shadow-2xl relative z-10">
                {user?.email?.[0].toUpperCase()}
              </div>
              <button className="absolute bottom-2 right-0 p-2 rounded-full bg-[#ff8c42] text-black hover:bg-white transition shadow-lg z-20 border-4 border-[#121212]">
                <Edit2 size={14} />
              </button>
            </div>

            {/* Info Dasar */}
            <h2 className="text-2xl font-bold text-white">{user?.user_metadata?.full_name || "Arsitek Muda"}</h2>
            <p className="text-gray-400 text-sm mb-4">{user?.email}</p>

            {/* Level Bar */}
            <div className="w-full bg-gray-800 h-2 rounded-full mb-2 overflow-hidden">
              <div className="bg-[#ff8c42] h-full w-[75%] rounded-full shadow-[0_0_10px_#ff8c42]"></div>
            </div>
            <div className="flex justify-between w-full text-xs text-gray-500 font-mono mb-6">
              <span>Lvl. 5 Architect</span>
              <span>750/1000 XP</span>
            </div>

            {/* Detail Tambahan */}
            <div className="w-full space-y-3 text-sm border-t border-white/5 pt-6">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={16} />
                <span>Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Calendar size={16} />
                <span>Bergabung Mar 2024</span>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="grid grid-cols-2 gap-3 w-full mt-8">
              <button className="py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium transition flex items-center justify-center gap-2 text-sm border border-white/5">
                <Settings size={16} /> Setting
              </button>
              <button
                onClick={handleLogout}
                className="py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium transition flex items-center justify-center gap-2 text-sm border border-red-500/10"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* === KOLOM KANAN: Dashboard & Stats === */}
        <div className="lg:col-span-8 space-y-6">

          {/* 1. Baris Statistik */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((item, idx) => (
              <div key={idx} className="glass-card p-5 rounded-3xl flex flex-col items-center justify-center gap-2 border border-white/5 bg-[#1a1a1a]/50">
                <div className={`p-3 rounded-full ${item.bg} ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{item.value}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>

          {/* 2. Banner "Lanjutkan Belajar" */}
          <div className="glass-card p-6 rounded-[32px] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#ff8c42]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="flex justify-between items-center relative z-10">
              <div>
                <p className="text-[#ff8c42] text-xs font-bold uppercase tracking-widest mb-2">Terakhir Dilihat</p>
                <h3 className="text-2xl font-bold text-white mb-1">Modern Apartment Design</h3>
                <p className="text-gray-400 text-sm">Modul 4: Teknik Pencahayaan Alami</p>
              </div>
              <Link href="/courses/1/modules/4" className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition shadow-lg shadow-white/10">
                <ChevronRight size={24} />
              </Link>
            </div>

            {/* Progress Bar Kecil */}
            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-6 overflow-hidden">
              <div className="bg-[#ff8c42] h-full w-[45%]"></div>
            </div>
          </div>

          {/* 3. Grid Achievements & Saved */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Achievements Card */}
            <div className="glass-card p-6 rounded-[32px] border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Award className="text-yellow-500" size={20} /> Pencapaian
                </h3>
                <span className="text-xs text-gray-500 hover:text-white cursor-pointer">Lihat Semua</span>
              </div>
              <div className="flex gap-4">
                {badges.map((badge, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 group-hover:bg-[#ff8c42]/10 group-hover:border-[#ff8c42]/30 transition-all cursor-pointer">
                      {badge.icon}
                    </div>
                    <span className="text-[10px] text-gray-500 group-hover:text-white transition">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sertifikat Card */}
            <div className="glass-card p-6 rounded-[32px] border border-white/5 flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-1">
                <Award size={32} />
              </div>
              <div>
                <h3 className="font-bold text-white">3 Sertifikat</h3>
                <p className="text-xs text-gray-500 mt-1 px-4">
                  Kamu telah menyelesaikan 3 kursus. Unduh sertifikatmu sekarang.
                </p>
              </div>
              <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-xs font-bold transition">
                Lihat Sertifikat
              </button>
            </div>
          </div>
        </div>
      </div></>
  );
}
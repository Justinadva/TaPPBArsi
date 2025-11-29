"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LogOut, Settings, Award, Clock, Loader2, Flame, 
  BookOpen, ChevronRight, Edit2, MapPin, Calendar 
} from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

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

  // Dummy Data
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
    // PERBAIKAN: pb-40 agar konten paling bawah tidak tertutup Bottom Nav
    <div className="max-w-6xl mx-auto space-y-6 pb-40 md:pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Header Banner (Bagian yang kamu tanya tadi) */}
      <div className="relative w-full h-48 md:h-64 rounded-b-[32px] md:rounded-[32px] overflow-hidden bg-gradient-to-r from-gray-900 to-[#1a1a1a] border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-[#ff8c42]/20 rounded-full blur-[100px]"></div>
      </div>

      {/* 2. Grid Utama */}
      {/* PERBAIKAN UTAMA: Ganti -mt-24 jadi -mt-8 agar tidak terlalu naik/nabrak */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 relative z-10 -mt-8">
        
        {/* === KOLOM KIRI: KARTU PROFIL === */}
        <div className="lg:col-span-4">
          <div className="glass-card p-6 rounded-[32px] bg-[#121212]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center text-center">
            
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <div className="w-28 h-28 rounded-full border-[6px] border-[#121212] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {user?.email?.[0].toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-[#ff8c42] text-black border-4 border-[#121212] hover:scale-110 transition shadow-lg">
                <Edit2 size={12} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-white">{user?.user_metadata?.full_name || "Arsitek Muda"}</h2>
            <p className="text-gray-400 text-xs mb-6">{user?.email}</p>

            {/* Level Bar */}
            <div className="w-full space-y-2 mb-6">
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>Lvl. 5 Architect</span>
                    <span>750/1000 XP</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#ff8c42] h-full w-[75%] rounded-full shadow-[0_0_10px_#ff8c42]"></div>
                </div>
            </div>

            <div className="w-full space-y-3 text-sm border-t border-white/5 pt-5 pb-5">
                <div className="flex items-center gap-3 text-gray-400">
                    <MapPin size={16} /> <span>Indonesia</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <Calendar size={16} /> <span>Bergabung Mar 2024</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
                <button className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/5 transition flex items-center justify-center gap-2">
                    <Settings size={14} /> Setting
                </button>
                <button onClick={handleLogout} className="py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/10 transition flex items-center justify-center gap-2">
                    <LogOut size={14} /> Logout
                </button>
            </div>
          </div>
        </div>

        {/* === KOLOM KANAN: STATS === */}
        <div className="lg:col-span-8 space-y-6 lg:mt-10">
            
            <div className="grid grid-cols-3 gap-3">
                {stats.map((item, idx) => (
                    <div key={idx} className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/5 bg-[#1a1a1a]/80">
                        <div className={`p-2 rounded-full ${item.bg} ${item.color}`}>
                            <item.icon size={18} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-white">{item.value}</h3>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card p-5 rounded-[24px] border border-white/10 bg-gradient-to-r from-[#1a1a1a] to-black relative overflow-hidden group">
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <p className="text-[#ff8c42] text-[10px] font-bold uppercase tracking-widest mb-1">Lanjutkan</p>
                        <h3 className="text-lg font-bold text-white">Modern Apartment</h3>
                        <p className="text-gray-400 text-xs">Modul 4: Pencahayaan</p>
                    </div>
                    <Link href="/courses/1/modules/4" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition">
                        <ChevronRight size={20} />
                    </Link>
                </div>
                <div className="w-full bg-gray-800 h-1 rounded-full mt-4">
                    <div className="bg-[#ff8c42] h-full w-[45%]"></div>
                </div>
            </div>

            <div className="glass-card p-5 rounded-[24px] border border-white/5">
                <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                    <Award className="text-yellow-500" size={16}/> Lencana Saya
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {badges.map((badge, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-xl">
                                {badge.icon}
                            </div>
                            <span className="text-[10px] text-gray-500 text-center leading-tight">{badge.name}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
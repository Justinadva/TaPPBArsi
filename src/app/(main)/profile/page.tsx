"use client";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut, Settings, Award, Clock } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Kartu Profil Utama */}
      <div className="glass-card p-8 rounded-[40px] flex flex-col items-center text-center relative overflow-hidden">
        {/* Background Hiasan */}
        <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-[#ff8c42]/20 to-transparent pointer-events-none"></div>
        
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full border-4 border-[#0f0f0f] bg-gray-700 flex items-center justify-center text-3xl font-bold text-white relative z-10 mb-4 shadow-xl">
          {user?.email?.[0].toUpperCase()}
        </div>
        
        <h2 className="text-2xl font-bold text-white">{user?.user_metadata?.full_name || "Arsitek Muda"}</h2>
        <p className="text-gray-400 text-sm mb-6">{user?.email}</p>

        <div className="flex gap-3">
          <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/10 transition text-sm">
            Edit Profile
          </button>
          <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5">
          <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-3">
            <Clock size={20} />
          </div>
          <h3 className="text-2xl font-bold text-white">12h</h3>
          <p className="text-sm text-gray-500">Waktu Belajar</p>
        </div>
        <div className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5">
          <div className="w-10 h-10 bg-[#ff8c42]/20 text-[#ff8c42] rounded-full flex items-center justify-center mb-3">
            <Award size={20} />
          </div>
          <h3 className="text-2xl font-bold text-white">3</h3>
          <p className="text-sm text-gray-500">Sertifikat</p>
        </div>
      </div>

      {/* Tombol Logout */}
      <button 
        onClick={handleLogout}
        className="w-full py-4 rounded-2xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition flex items-center justify-center gap-2 font-bold"
      >
        <LogOut size={20} />
        Sign Out
      </button>
    </div>
  );
}
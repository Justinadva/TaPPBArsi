"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, ArrowRight, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Daftar ke Supabase Auth
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Simpan nama lengkap di metadata user
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Akun berhasil dibuat! Silakan cek email untuk verifikasi.");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor (Sama dengan Login agar konsisten) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff8c42] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
           <h1 className="text-4xl font-bold text-white mb-2">Buat Akun</h1>
           <p className="text-gray-400">Bergabunglah dengan komunitas ArchSmart</p>
        </div>

        <form onSubmit={handleRegister} className="glass-card p-8 rounded-[32px] space-y-5 backdrop-blur-xl bg-white/5 border border-white/10">
          
          {/* Input Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
            <div className="relative">
                <input
                type="text"
                placeholder="John Doe"
                className="w-full p-4 pl-12 bg-[#0f0f0f]/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#ff8c42] focus:ring-1 focus:ring-[#ff8c42] transition-all placeholder:text-gray-600"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>

          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full p-4 bg-[#0f0f0f]/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#ff8c42] focus:ring-1 focus:ring-[#ff8c42] transition-all placeholder:text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-[#0f0f0f]/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#ff8c42] focus:ring-1 focus:ring-[#ff8c42] transition-all placeholder:text-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#ff8c42] text-black rounded-2xl font-bold hover:bg-[#ff7b1a] transition flex items-center justify-center gap-2 disabled:opacity-70 mt-4 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Daftar Sekarang <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-white hover:underline cursor-pointer font-medium">
            Masuk disini
          </Link>
        </p>
      </div>
    </div>
  );
}
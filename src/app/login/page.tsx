"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff8c42] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
           <h1 className="text-4xl font-bold text-white mb-2">ArchSmart</h1>
           <p className="text-gray-400">Log in to continue your journey</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 rounded-[32px] space-y-6 backdrop-blur-xl bg-white/5">
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
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-[#0f0f0f]/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#ff8c42] focus:ring-1 focus:ring-[#ff8c42] transition-all placeholder:text-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Masuk Sekarang <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Belum punya akun? <span className="text-[#ff8c42] hover:underline cursor-pointer">Daftar disini</span>
        </p>
      </div>
    </div>
  );
}
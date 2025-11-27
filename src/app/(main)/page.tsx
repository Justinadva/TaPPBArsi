"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    // min-h diganti agar pas di tengah layar tanpa scroll berlebih
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[calc(100vh-150px)] gap-10 lg:gap-0">
      
      {/* BAGIAN KIRI: TEKS & CTA */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-in slide-in-from-left duration-700">
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
          Architecture <br />
          Support <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 font-light italic">
            Made Easy
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed mx-auto lg:mx-0">
          Akses ribuan materi arsitektur, tutorial, dan komunitas dalam satu genggaman. Belajar kapan saja, di mana saja.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href={user ? "/courses" : "/login"}
            className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.15)] text-center"
          >
            {user ? "Mulai Belajar" : "Gabung Sekarang"}
          </Link>
          <Link 
            href="/courses" 
            className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition text-center"
          >
            Lihat Materi
          </Link>
        </div>

        {/* Statistik User */}
        <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f0f0f] bg-gray-800 overflow-hidden relative">
                 <Image 
                   src={`https://i.pravatar.cc/150?img=${i + 15}`} 
                   alt="User" 
                   fill 
                   className="object-cover" 
                 />
              </div>
            ))}
          </div>
          <div className="text-left">
            <p className="text-xl font-bold text-white leading-none">1,300+</p>
            <p className="text-xs text-gray-500">Mahasiswa Aktif</p>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN: KARTU GLASS (Mobile: Di Bawah, Desktop: Di Kanan) */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 relative">
        
        {/* Hiasan Blur Oranye */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff8c42] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        {/* Kartu Utama */}
        <div className="glass-card w-full max-w-md p-6 rounded-[32px] border border-white/10 bg-[#1a1a1a]/40 backdrop-blur-xl relative z-10 hover:border-[#ff8c42]/30 transition-all duration-500">
          
          <div className="flex justify-between items-start mb-6">
            <div className="text-left">
              <h3 className="text-3xl font-light italic text-gray-400">Modern</h3>
              <h3 className="text-3xl font-bold text-white">Apartment</h3>
            </div>
            <Link href="/courses/modern-apartment" className="w-12 h-12 rounded-full bg-[#ff8c42] flex items-center justify-center text-black hover:scale-110 transition shadow-lg">
              <ArrowUpRight size={24} />
            </Link>
          </div>

          <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-gray-800 group">
            {/* Ganti src dengan gambar asli jika ada */}
            <Image 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop" 
              alt="Course Preview" 
              fill 
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
               <p className="text-white font-bold">$24.00</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col text-left">
               <span className="text-xl font-bold text-white">19k+</span>
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">Total Booking</span>
            </div>
            <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition">
              See Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
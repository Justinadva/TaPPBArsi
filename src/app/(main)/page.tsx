"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

// Interface untuk data dari DB
interface CourseDB {
  id: string;
  title: string;
  category: string;
  image_url: string;
  price: string;
  rating?: number;
}

export default function HomePage() {
  const { user } = useAuth();
  
  // State untuk menyimpan data kursus unggulan (Featured)
  const [featuredCourse, setFeaturedCourse] = useState<CourseDB | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch 1 Kursus Terbaru sebagai "Featured"
  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order('created_at', { ascending: false }) // Ambil yang paling baru
          .limit(1)
          .single();

        if (error) throw error;
        setFeaturedCourse(data);
      } catch (error) {
        console.error("Gagal memuat featured course:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return (
    // Container utama
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[calc(100vh-150px)] gap-10 lg:gap-0 py-6">
      
      {/* === BAGIAN KIRI: TEKS & CTA (Tetap Statis / Marketing Copy) === */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-in slide-in-from-left duration-700">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight text-white">
          Architecture <br />
          Support <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 font-light italic">
            Made Easy
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed mx-auto lg:mx-0">
          Akses ribuan materi arsitektur, tutorial, dan komunitas dalam satu
          genggaman. Belajar kapan saja, di mana saja.
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

        {/* Statistik User (Bisa tetap statis atau fetch count user jika mau) */}
        <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-[#0f0f0f] bg-gray-800 overflow-hidden relative"
              >
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

      {/* === BAGIAN KANAN: KARTU GLASS (DINAMIS) === */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 relative">
        {/* Hiasan Blur Oranye */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff8c42] rounded-full blur-[100px] opacity-30 pointer-events-none animate-pulse"></div>

        {/* Cek Loading */}
        {isLoading ? (
           <div className="w-full max-w-md h-80 flex items-center justify-center rounded-[32px] bg-white/5 border border-white/10">
              <Loader2 className="animate-spin text-[#ff8c42]" size={32} />
           </div>
        ) : featuredCourse ? (
          /* Kartu Utama (Data dari DB) */
          <div className="w-full max-w-md p-6 rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl relative z-10 hover:border-[#ff8c42]/40 transition-all duration-500 hover:scale-[1.02]">
            {/* Header Kartu */}
            <div className="flex justify-between items-start mb-6">
              <div className="text-left">
                <h3 className="text-3xl font-light italic text-gray-400">
                  Featured
                </h3>
                {/* Judul dari DB */}
                <h3 className="text-3xl font-bold text-white line-clamp-1">
                    {featuredCourse.title}
                </h3>
              </div>
              {/* Link ke ID yang benar */}
              <Link
                href={`/courses/${featuredCourse.id}`}
                className="w-12 h-12 rounded-full bg-[#ff8c42] flex items-center justify-center text-black hover:rotate-45 transition-transform duration-300 shadow-[0_0_15px_rgba(255,140,66,0.5)]"
              >
                <ArrowUpRight size={24} />
              </Link>
            </div>

            {/* Gambar dari DB */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-gray-800 group border border-white/5">
              <Image
                src={featuredCourse.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"}
                alt={featuredCourse.title}
                fill
                priority={true}
                className="object-cover group-hover:scale-110 transition duration-700"
              />
              {/* Harga Badge */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <p className="text-white font-bold text-lg">{featuredCourse.price}</p>
                <p className="text-white/70 text-[10px] uppercase tracking-wide">
                  {featuredCourse.category || "Course"}
                </p>
              </div>
            </div>

            {/* Footer Kartu */}
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="flex flex-col text-left">
                {/* Rating (atau data lain dari DB) */}
                <span className="text-xl font-bold text-white">4.9/5</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Rating
                </span>
              </div>
              
              <Link href={`/courses/${featuredCourse.id}`}>
                <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition shadow-lg">
                    Lihat Detail
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Fallback jika database kosong */
          <div className="w-full max-w-md p-6 rounded-[32px] bg-white/5 border border-white/10 text-center text-gray-400">
             Belum ada kursus yang tersedia.
          </div>
        )}
      </div>
    </div>
  );
}
// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowUpRight, Loader2 } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { supabase } from "@/lib/supabase";

// // Interface untuk data dari DB
// interface CourseDB {
//   id: string;
//   title: string;
//   category: string;
//   image_url: string;
//   price: string;
//   rating?: number;
// }

// export default function HomePage() {
//   const { user } = useAuth();
  
//   // State untuk menyimpan data kursus unggulan (Featured)
//   const [featuredCourse, setFeaturedCourse] = useState<CourseDB | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch 1 Kursus Terbaru sebagai "Featured"
//   useEffect(() => {
//     async function fetchFeatured() {
//       try {
//         const { data, error } = await supabase
//           .from("courses")
//           .select("*")
//           .order('created_at', { ascending: false }) // Ambil yang paling baru
//           .limit(1)
//           .single();

//         if (error) throw error;
//         setFeaturedCourse(data);
//       } catch (error) {
//         console.error("Gagal memuat featured course:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchFeatured();
//   }, []);

//   return (
//     // Container utama
//     <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[calc(100vh-150px)] gap-10 lg:gap-0 py-6">
      
//       {/* === BAGIAN KIRI: TEKS & CTA (Tetap Statis / Marketing Copy) === */}
//       <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-in slide-in-from-left duration-700">
//         <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight text-white">
//           Architecture <br />
//           Support <br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 font-light italic">
//             Made Easy
//           </span>
//         </h1>

//         <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed mx-auto lg:mx-0">
//           Akses ribuan materi arsitektur, tutorial, dan komunitas dalam satu
//           genggaman. Belajar kapan saja, di mana saja.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//           <Link
//             href={user ? "/courses" : "/login"}
//             className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.15)] text-center"
//           >
//             {user ? "Mulai Belajar" : "Gabung Sekarang"}
//           </Link>
//           <Link
//             href="/courses"
//             className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition text-center"
//           >
//             Lihat Materi
//           </Link>
//         </div>

//         {/* Statistik User (Bisa tetap statis atau fetch count user jika mau) */}
//         <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
//           <div className="flex -space-x-3">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="w-10 h-10 rounded-full border-2 border-[#0f0f0f] bg-gray-800 overflow-hidden relative"
//               >
//                 <Image
//                   src={`https://i.pravatar.cc/150?img=${i + 15}`}
//                   alt="User"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="text-left">
//             <p className="text-xl font-bold text-white leading-none">1,300+</p>
//             <p className="text-xs text-gray-500">Mahasiswa Aktif</p>
//           </div>
//         </div>
//       </div>

//       {/* === BAGIAN KANAN: KARTU GLASS (DINAMIS) === */}
//       <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 relative">
//         {/* Hiasan Blur Oranye */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff8c42] rounded-full blur-[100px] opacity-30 pointer-events-none animate-pulse"></div>

//         {/* Cek Loading */}
//         {isLoading ? (
//            <div className="w-full max-w-md h-80 flex items-center justify-center rounded-[32px] bg-white/5 border border-white/10">
//               <Loader2 className="animate-spin text-[#ff8c42]" size={32} />
//            </div>
//         ) : featuredCourse ? (
//           /* Kartu Utama (Data dari DB) */
//           <div className="w-full max-w-md p-6 rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl relative z-10 hover:border-[#ff8c42]/40 transition-all duration-500 hover:scale-[1.02]">
//             {/* Header Kartu */}
//             <div className="flex justify-between items-start mb-6">
//               <div className="text-left">
//                 <h3 className="text-3xl font-light italic text-gray-400">
//                   Featured
//                 </h3>
//                 {/* Judul dari DB */}
//                 <h3 className="text-3xl font-bold text-white line-clamp-1">
//                     {featuredCourse.title}
//                 </h3>
//               </div>
//               {/* Link ke ID yang benar */}
//               <Link
//                 href={`/courses/${featuredCourse.id}`}
//                 className="w-12 h-12 rounded-full bg-[#ff8c42] flex items-center justify-center text-black hover:rotate-45 transition-transform duration-300 shadow-[0_0_15px_rgba(255,140,66,0.5)]"
//               >
//                 <ArrowUpRight size={24} />
//               </Link>
//             </div>

//             {/* Gambar dari DB */}
//             <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-gray-800 group border border-white/5">
//               <Image
//                 src={featuredCourse.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"}
//                 alt={featuredCourse.title}
//                 fill
//                 priority={true}
//                 className="object-cover group-hover:scale-110 transition duration-700"
//               />
//               {/* Harga Badge */}
//               <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
//                 <p className="text-white font-bold text-lg">{featuredCourse.price}</p>
//                 <p className="text-white/70 text-[10px] uppercase tracking-wide">
//                   {featuredCourse.category || "Course"}
//                 </p>
//               </div>
//             </div>

//             {/* Footer Kartu */}
//             <div className="flex justify-between items-center border-t border-white/10 pt-4">
//               <div className="flex flex-col text-left">
//                 {/* Rating (atau data lain dari DB) */}
//                 <span className="text-xl font-bold text-white">4.9/5</span>
//                 <span className="text-[10px] text-gray-400 uppercase tracking-widest">
//                   Rating
//                 </span>
//               </div>
              
//               <Link href={`/courses/${featuredCourse.id}`}>
//                 <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition shadow-lg">
//                     Lihat Detail
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           /* Fallback jika database kosong */
//           <div className="w-full max-w-md p-6 rounded-[32px] bg-white/5 border border-white/10 text-center text-gray-400">
//              Belum ada kursus yang tersedia.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2, Sparkles, ServerCrash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

// Interface untuk data dari Service A (Database Utama/Supabase)
interface CourseDB {
  id: string;
  title: string;
  category: string;
  image_url: string;
  price: string;
  rating?: number;
}

// Interface untuk data dari Service B (Python Microservice)
interface Recommendation {
  id: string;
  title: string;
  reason: string;
}

export default function HomePage() {
  const { user } = useAuth();
  
  // State untuk Service A (Featured Course)
  const [featuredCourse, setFeaturedCourse] = useState<CourseDB | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk Service B (AI Recommendations)
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [serviceBStatus, setServiceBStatus] = useState<"online" | "offline">("offline");

  // 1. Fetch Data dari Service A (Supabase)
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

  // 2. Fetch Data dari Service B (Python FastAPI)
  useEffect(() => {
    async function fetchFromServiceB() {
      try {
        // Pastikan backend Python berjalan di port 8000 saat demo
        const res = await fetch('http://localhost:8000/api/recommendations', {
            cache: 'no-store', // Pastikan data selalu fresh untuk demo
            mode: 'cors'
        });
        
        if (!res.ok) throw new Error("Service B unavailable");
        
        const data = await res.json();
        if(data.data) {
            setRecs(data.data);
            setServiceBStatus("online");
        }
      } catch (err) {
        console.error("Gagal connect ke Service B:", err);
        setServiceBStatus("offline");
      } finally {
        setLoadingRecs(false);
      }
    }
    fetchFromServiceB();
  }, []);

  return (
    <div className="flex flex-col gap-16 py-6">
        
      {/* === BAGIAN ATAS: HERO SECTION (Service A) === */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[calc(100vh-150px)] gap-10 lg:gap-0">
        
        {/* KIRI: TEKS & CTA */}
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

        {/* KANAN: KARTU GLASS FEATURED (Data Service A) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff8c42] rounded-full blur-[100px] opacity-30 pointer-events-none animate-pulse"></div>

          {isLoading ? (
             <div className="w-full max-w-md h-80 flex items-center justify-center rounded-[32px] bg-white/5 border border-white/10">
                <Loader2 className="animate-spin text-[#ff8c42]" size={32} />
             </div>
          ) : featuredCourse ? (
            <div className="w-full max-w-md p-6 rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl relative z-10 hover:border-[#ff8c42]/40 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-6">
                <div className="text-left">
                  <h3 className="text-3xl font-light italic text-gray-400">
                    Featured
                  </h3>
                  <h3 className="text-3xl font-bold text-white line-clamp-1">
                      {featuredCourse.title}
                  </h3>
                </div>
                <Link
                  href={`/courses/${featuredCourse.id}`}
                  className="w-12 h-12 rounded-full bg-[#ff8c42] flex items-center justify-center text-black hover:rotate-45 transition-transform duration-300 shadow-[0_0_15px_rgba(255,140,66,0.5)]"
                >
                  <ArrowUpRight size={24} />
                </Link>
              </div>

              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-gray-800 group border border-white/5">
                <Image
                  src={featuredCourse.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"}
                  alt={featuredCourse.title}
                  fill
                  priority={true}
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-white font-bold text-lg">{featuredCourse.price}</p>
                  <p className="text-white/70 text-[10px] uppercase tracking-wide">
                    {featuredCourse.category || "Course"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <div className="flex flex-col text-left">
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
            <div className="w-full max-w-md p-6 rounded-[32px] bg-white/5 border border-white/10 text-center text-gray-400">
               Belum ada kursus yang tersedia.
            </div>
          )}
        </div>
      </div>

      {/* === BAGIAN BAWAH: INTEGRASI SERVICE B (Microservice Python) === */}
      {/* Ini adalah bagian kunci untuk nilai tugas besar Anda */}
      <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-10">
        <div className="glass-card p-8 rounded-[32px] border border-white/10 relative overflow-hidden">
            {/* Background Glow Biru untuk membedakan dari Service A */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10 gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10">
                        <Sparkles size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">AI Recommendations</h3>
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                            Powered by Microservice Python
                            <span className={`inline-block w-2 h-2 rounded-full ${serviceBStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                        </p>
                    </div>
                </div>
                
                {/* Indikator Status Service */}
                <div className={`px-4 py-1.5 rounded-full border text-xs font-mono ${
                    serviceBStatus === 'online' 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                    SERVICE STATUS: {serviceBStatus.toUpperCase()}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                {loadingRecs ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-10 gap-3">
                        <Loader2 className="animate-spin text-blue-400" />
                        <p className="text-gray-500 text-sm">Menghubungkan ke http://localhost:8000...</p>
                    </div>
                ) : recs.length > 0 ? (
                    recs.map((rec) => (
                        <div key={rec.id} className="p-6 bg-[#0f0f0f]/60 hover:bg-[#0f0f0f]/80 border border-white/5 hover:border-blue-500/30 rounded-2xl transition-all cursor-default group hover:-translate-y-1">
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                                {rec.title}
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                <span className="text-[10px] uppercase tracking-wider text-gray-600 block mb-1 font-bold">Why recommended?</span>
                                {rec.reason}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 border border-dashed border-white/10 rounded-2xl bg-black/20">
                        <ServerCrash className="text-gray-600 mb-3" size={32} />
                        <p className="text-gray-400 font-medium">Service B Tidak Terhubung</p>
                        <p className="text-xs text-gray-600 mt-1 max-w-md text-center px-4">
                            Untuk demo: Pastikan script Python (FastAPI) berjalan di 
                            <code className="bg-white/10 px-1 py-0.5 rounded mx-1 text-gray-300">localhost:8000</code> 
                            seperti yang dijelaskan pada laporan tugas besar.
                        </p>
                    </div>
                )}
            </div>
        </div>
      </div>

    </div>
  );
}
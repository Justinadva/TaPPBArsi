"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import CourseCard from "@/components/CourseCard";
// HAPUS IMPORT INI: import { ALL_COURSES } from "@/data/courses"; 
// import { Course } from "@/types"; // Opsional: Kita definisikan interface lokal agar lebih aman

const ITEMS_PER_PAGE = 6;

// Definisi Tipe Data Sesuai Database Supabase
interface CourseFromDB {
  id: string;
  title: string;
  category: string;
  image_url: string;   // Nama kolom di DB Supabase
  price: string;
  duration: string;
  modules_count: number; // Nama kolom di DB Supabase
  rating?: number;       // Opsional karena tidak ada di schema DB awal
}

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  
  // State untuk data dari API
  const [fetchedCourses, setFetchedCourses] = useState<CourseFromDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // --- 1. Ambil Data dari API Supabase ---
  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/courses"); 
        
        if (!response.ok) {
          throw new Error("Gagal mengambil data kursus dari API.");
        }
        
        const data: CourseFromDB[] = await response.json();
        setFetchedCourses(data || []);

      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCourses();
  }, []);

  // --- 2. Handler Pencarian ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  // --- 3. Filter Data ---
  const filteredCourses = useMemo(() => {
    return fetchedCourses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, fetchedCourses]);

  // --- 4. Pagination ---
  const visibleCourses = filteredCourses.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = visibleCourses.length < filteredCourses.length;

  // --- 5. Fungsi Load More ---
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 500);
  };

  // --- Tampilan Loading Awal ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader2 className="animate-spin text-[#ff8c42]" size={40} />
        <p className="mt-4 text-white">Memuat data kursus dari Supabase...</p>
      </div>
    );
  }

  // --- Tampilan Utama ---
  return (
    <div className="space-y-10 min-h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Explore <span className="text-[#ff8c42]">Courses</span>
          </h1>
          <p className="text-gray-400 max-w-md text-sm md:text-base">
            Temukan materi terbaik untuk meningkatkan skill arsitekturmu hari ini.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-500 group-focus-within:text-[#ff8c42] transition-colors" size={20}/>
            </div>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange} 
              className="w-full pl-11 pr-4 py-3.5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8c42] focus:ring-1 focus:ring-[#ff8c42] transition-all text-sm"
              placeholder="Cari materi..."
            />
          </div>
          <button className="p-3.5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/30 transition flex-shrink-0">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {visibleCourses.length > 0 ? (
        <div className="space-y-12 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleCourses.map((course) => (
                    // PERBAIKAN: Mapping manual properti DB ke Props CourseCard
                    <CourseCard 
                        key={course.id} 
                        id={course.id}
                        title={course.title}
                        category={course.category}
                        // Mapping: image_url (DB) -> image (Prop)
                        // Gunakan placeholder jika gambar kosong
                        image={course.image_url || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"} 
                        price={course.price}
                        duration={course.duration}
                        // Mapping: modules_count (DB) -> modules (Prop)
                        modules={course.modules_count || 0}
                        // Default rating karena tidak ada di tabel DB
                        rating={course.rating || 4.8}
                    />
                ))}
            </div>
            {hasMore && (
                <div className="flex justify-center">
                    <button 
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="group relative px-8 py-3 rounded-full bg-[#1a1a1a] border border-white/10 text-white font-medium hover:border-[#ff8c42]/50 hover:text-[#ff8c42] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isLoadingMore ? <><Loader2 className="animate-spin" size={18}/> Memuat...</> : "Muat Lebih Banyak"}
                        </span>
                        <div className="absolute inset-0 bg-[#ff8c42]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>
            )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
          <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-white/5">
            <Search size={32} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-white">Tidak ditemukan</h3>
          <p className="text-gray-400 text-sm">Coba kata kunci lain atau periksa koneksi Supabase Anda.</p>
        </div>
      )}
    </div>
  );
}
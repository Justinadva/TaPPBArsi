"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { ALL_COURSES } from "@/data/courses"; 

const ITEMS_PER_PAGE = 6; // Batas item per halaman agar ringan

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 1. Filter Data (Gunakan useMemo agar tidak berat menghitung ulang)
  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 2. Reset ke halaman 1 jika user mengetik di search bar
  useEffect(() => {
    setPage(1);
  }, [search]);

  // 3. Teknik Slicing: Hanya ambil data sesuai halaman yang aktif
  const visibleCourses = filteredCourses.slice(0, page * ITEMS_PER_PAGE);
  
  // 4. Cek apakah masih ada sisa data untuk dimuat
  const hasMore = visibleCourses.length < filteredCourses.length;

  // Fungsi untuk memuat data berikutnya
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulasi delay kecil (0.5s) agar interaksi terasa lebih natural (UX)
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <div className="space-y-10 min-h-[80vh]">
      
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Explore <span className="text-[#ff8c42]">Courses</span>
          </h1>
          <p className="text-gray-400 max-w-md text-sm md:text-base">
            Temukan materi terbaik untuk meningkatkan skill arsitekturmu hari ini.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search
                className="text-gray-500 group-focus-within:text-[#ff8c42] transition-colors"
                size={20}
              />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8c42] focus:ring-1 focus:ring-[#ff8c42] transition-all text-sm"
              placeholder="Cari materi..."
            />
          </div>

          {/* Tombol Filter */}
          <button className="p-3.5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/30 transition flex-shrink-0">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Grid Courses */}
      {visibleCourses.length > 0 ? (
        <div className="space-y-12 pb-10">
            {/* Grid Item */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleCourses.map((course) => (
                    <CourseCard 
                        key={course.id} 
                        {...course} 
                        modules={course.modules_count || 0} 
                    />
                ))}
            </div>

            {/* Tombol Load More (Hanya muncul jika ada sisa data) */}
            {hasMore && (
                <div className="flex justify-center">
                    <button 
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="group relative px-8 py-3 rounded-full bg-[#1a1a1a] border border-white/10 text-white font-medium hover:border-[#ff8c42]/50 hover:text-[#ff8c42] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isLoadingMore ? (
                                <>
                                    <Loader2 className="animate-spin" size={18}/> Memuat...
                                </>
                            ) : (
                                "Muat Lebih Banyak"
                            )}
                        </span>
                        {/* Efek Hover Background */}
                        <div className="absolute inset-0 bg-[#ff8c42]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>
            )}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
          <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-white/5">
            <Search size={32} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-white">Tidak ditemukan</h3>
          <p className="text-gray-400 text-sm">Coba kata kunci lain.</p>
        </div>
      )}
    </div>
  );
}
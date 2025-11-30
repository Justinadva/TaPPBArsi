"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { supabase } from "@/lib/supabase"; 

const ITEMS_PER_PAGE = 6;

interface CourseDB {
  id: string;
  title: string;
  category: string;
  image_url: string; 
  price: string;
  duration: string;
  modules_count: number;
  rating?: number;
}

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  
  const [fetchedCourses, setFetchedCourses] = useState<CourseDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      setErrorMsg("");
      
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order('created_at', { ascending: false });

        if (error) throw error;

        setFetchedCourses(data || []);
      } catch (err) { // HAPUS ': any'
        console.error("Error fetching courses:", err);
        setErrorMsg("Gagal memuat data kursus. Periksa koneksi internet Anda.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return fetchedCourses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, fetchedCourses]);

  const visibleCourses = filteredCourses.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = visibleCourses.length < filteredCourses.length;

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader2 className="animate-spin text-[#ff8c42]" size={40} />
        <p className="mt-4 text-white">Memuat data kursus...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-red-400">
        <p>{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 min-h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Explore <span className="text-[#ff8c42]">Courses</span>
          </h1>
          <p className="text-gray-400 max-w-md text-sm md:text-base">
            Temukan materi terbaik untuk meningkatkan skill arsitekturmu.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-500" size={20}/>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3.5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#ff8c42] text-sm"
              placeholder="Cari materi..."
            />
          </div>
          <button className="p-3.5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-gray-400 hover:text-white transition">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {visibleCourses.length > 0 ? (
        <div className="space-y-12 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleCourses.map((course) => (
                    <CourseCard 
                        key={course.id} 
                        id={course.id}
                        title={course.title}
                        category={course.category || "General"}
                        image={course.image_url} 
                        price={course.price}
                        duration={course.duration}
                        modules={course.modules_count || 0}
                        rating={course.rating || 4.8}
                    />
                ))}
            </div>
            {hasMore && (
                <div className="flex justify-center">
                    <button 
                        onClick={handleLoadMore}
                        className="px-8 py-3 rounded-full bg-[#1a1a1a] border border-white/10 text-white hover:text-[#ff8c42] transition-all"
                    >
                        Muat Lebih Banyak
                    </button>
                </div>
            )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
          <Search size={32} className="text-gray-500 mb-4" />
          <h3 className="text-lg font-bold text-white">Tidak ditemukan</h3>
        </div>
      )}
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import { Bookmark, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { ALL_COURSES } from "@/data/courses"; // Gunakan data sentral
import CourseCard from "@/components/CourseCard";

export default function BookmarksPage() {
  const { user, loading: authLoading } = useAuth();
  const [savedCourses, setSavedCourses] = useState<typeof ALL_COURSES>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookmarks() {
      if (!user) {
        setLoading(false);
        return;
      }

      // 1. Ambil ID course dari tabel bookmarks di Supabase
      const { data, error } = await supabase
        .from("bookmarks")
        .select("course_id")
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      // 2. Filter data lokal ALL_COURSES berdasarkan ID yang didapat
      const savedIds = data.map((item) => item.course_id);
      const filtered = ALL_COURSES.filter((course) => savedIds.includes(course.id));
      
      setSavedCourses(filtered);
      setLoading(false);
    }

    if (!authLoading) {
      fetchBookmarks();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#ff8c42]" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-gray-400 mb-4">Silakan login untuk melihat materi tersimpan.</p>
        <Link href="/login" className="px-6 py-2 bg-white text-black rounded-full font-bold">
          Login Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Saved Courses</h1>

      {savedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Bookmark size={32} className="text-gray-400" />
          </div>
          <p className="text-lg text-gray-300">Belum ada materi disimpan.</p>
          <Link href="/courses" className="mt-4 text-[#ff8c42] hover:underline">
            Cari materi sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {savedCourses.map((course) => (
            // Mapping CourseCard dengan data asli
            <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                category={course.category}
                image={course.image}
                price={course.price}
                duration={course.duration}
                modules={course.modules_count || 0} // Fallback karena data dummy beda struktur sedikit
                rating={course.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
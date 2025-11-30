"use client";

import { useEffect, useState } from "react";
import { Bookmark, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import CourseCard from "@/components/CourseCard";
// HAPUS IMPORT INI: import { ALL_COURSES } from "@/data/courses"; 

// Definisikan tipe data sesuai struktur tabel 'courses' di Supabase Anda
interface CourseData {
  id: string;
  title: string;
  category: string;
  image_url: string; // Sesuaikan dengan nama kolom di DB (image_url)
  price: string;
  duration: string;
  modules_count: number; // Sesuaikan dengan nama kolom di DB (modules_count)
  rating?: number; // Optional jika belum ada di DB
}

export default function BookmarksPage() {
  const { user, loading: authLoading } = useAuth();
  const [savedCourses, setSavedCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookmarks() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Ambil daftar course_id dari tabel bookmarks milik user
        const { data: bookmarkData, error: bookmarkError } = await supabase
          .from("bookmarks")
          .select("course_id")
          .eq("user_id", user.id);

        if (bookmarkError) throw bookmarkError;

        if (!bookmarkData || bookmarkData.length === 0) {
          setSavedCourses([]);
          setLoading(false);
          return;
        }

        // Ambil array ID
        const courseIds = bookmarkData.map((item) => item.course_id);

        // 2. Ambil detail kursus dari tabel courses berdasarkan ID tersebut
        const { data: coursesData, error: coursesError } = await supabase
          .from("courses")
          .select("*")
          .in("id", courseIds);

        if (coursesError) throw coursesError;

        setSavedCourses(coursesData || []);

      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchBookmarks();
    }
  }, [user, authLoading]);

  // Loading State
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#ff8c42]" size={32} />
      </div>
    );
  }

  // Not Logged In State
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

  // Render Utama
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Saved Courses</h1>

      {savedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
          <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-white/5">
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
            <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                category={course.category}
                // Mapping properti DB (image_url) ke prop Component (image)
                image={course.image_url || "/placeholder-image.jpg"} 
                price={course.price}
                duration={course.duration}
                // Mapping properti DB (modules_count) ke prop Component (modules)
                modules={course.modules_count || 0} 
                // Default rating jika tidak ada di DB
                rating={course.rating || 5.0} 
            />
          ))}
        </div>
      )}
    </div>
  );
}